import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { MessageService } from '../../services/api/message.service';
import { User } from '../../models/user';
import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
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
  private friends: User[] = [];
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
    for (let key in this.user.friends_ref)
      if (this.user.friends_ref[key] === e.item._id) {
        alreadyIn = true;
        break;
      }
    
    // Adds the friend if it's not already in the list.
    if (!alreadyIn) {
      this.user.friends_ref.push(e.item._id);
      this.friends.push(e.item.email);
      this._userService.update(this.userId, this.user);
    }
    
    // Empties the autocomplete field.
    this.asyncSelected = '';
  }

  ngOnInit() {
    this.userId = window.localStorage.getItem('userId');

    if (this.userId) {
      this._userService.get(this.userId).then(user => {
        this.user = user;

          // Construction of the local list of friends with emails instead of IDs.
          for (var i = 0; i < this.user.friends_ref.length; i++)
            this._userService.get(this.user.friends_ref[i]).then(user => {
              this.friends.push(user.email);
            });
      });
    }
  }

  // Updates the user in the database.
  onSubmit(event) {
    console.log("onSubmit")
    console.log(this.user);
    this._userService.update(this.userId, this.user);
    return false;
  }

  // Called when a user wants to delete a friend from the list.
  onRemove(user) {
    // Deletes the selected friend by iterating through the list
    // of friends and checking if the friend to remove is in it.
    for (var i = 0; i < this.user.friends_ref.length; i++)
      if (this.friends[i] === user) {
        this.user.friends_ref.splice(i, 1);
        this.friends.splice(i, 1);
      }
    
    this._userService.update(this.userId, this.user);
    return false;
  }
}