import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { MessageService } from '../../services/api/message.service';
import { User } from '../../models/user';
import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'dropzone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ UserService, MessageService ]
})
export class ProfileComponent implements OnInit {

  public stateCtrl: FormControl = new FormControl();
  private _messages: any[] = [];
  private userId: string;
  private connected: boolean = false;
  public user: User;
  public myForm: FormGroup = new FormGroup({
    state: this.stateCtrl
  });
  public selected: string = '';
  public dataSource: Observable<any>;
  public asyncSelected: string = '';
  public typeaheadLoading: boolean = false;
  public typeaheadNoResults: boolean = false;

  constructor(
    private _userService: UserService,
    private router: Router,
  ) {
    this.dataSource = Observable.create(observer => {
      // Updates autocomplete of friends list.
      // Is executed everytime a new letter is typed.
      if (this.asyncSelected.length > 0) {
        this._userService.find({
          query: {
            email: {
              $search: this.asyncSelected
            }
          }
        }).then(res => {
          observer.next(res.data);
        });
      }
    }).mergeMap((res: Object) => Observable.of(res));
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
 
  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  // Called when the user clicks on an entry of the autocomplete list.
  public typeaheadOnSelect(e: TypeaheadMatch): void {
    let alreadyIn = false;

    // Determines if the selected friend is already part
    // of the users friends list.
    for (var i = 0; i < this.user.friends.length; i++)
      if (this.user.friends[i]["_id"] === e.item["_id"]) {
        alreadyIn = true;
        break;
      }
    
    // Adds the friend if it's not already in the list.
    if (!alreadyIn) {
      this.user.friends.push(e.item);
    }
    
    // Empties the autocomplete field.
    this.asyncSelected = '';
  }

  ngOnInit() {
    this.userId = window.localStorage.getItem('userId');

    if (this.userId != 'null') {
      this.connected = true;
      this._userService.get(this.userId).then(user => {
        this.user = user;
        //this.user.password = "123";
        
        if (!this.user.hasOwnProperty("friends"))
          this.user.friends = [];
      });
    }
    else {
      console.log("ERROR");
    }
  }

  // If thes user cancels, he is redirect to his public profile view.
  onLogout() {
    this.router.navigateByUrl('profile/' + this.userId);
  }

  // Updates the user in the database.
  onSubmit(event) {
    console.log("User updated: ")
    console.log(this.user);
    this.user.friends_ref = [];

    
    for (var i = 0; i < this.user.friends.length; i++)
      this.user.friends_ref[i] = this.user.friends[i]["_id"];

    // Saves the user and redirects to public profile view.
    this._userService.update(this.userId, this.user);
    this.router.navigateByUrl('profile/' + this.userId);
  }

  // Called when a user wants to delete a friend from the list.
  onRemove(user) {
    // Deletes the selected friend by iterating through the list
    // of friends and checking if the friend to remove is in it.
    for (var i = 0; i < this.user.friends.length; i++)
      if (this.user.friends[i] === user)
        this.user.friends.splice(i, 1);
        
    return false;
  }
}
