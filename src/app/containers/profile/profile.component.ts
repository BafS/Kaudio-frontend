import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UserService } from '../../shared/services/api/user.service';
import { MessageService } from '../../shared/services/api/message.service';
import { User } from '../../shared/models/user';
import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

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
    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      if (this.asyncSelected.length > 0) {
        this._userService.find({
          query: {
            email: {
              $search: this.asyncSelected
            }
          }
        }).then(res => {
          /*for (let entry of res.data)
            if (entry.email in this.user.friends)
              console.log("To delete: " + entry);*/

          observer.next(res.data);
        });
      }
      //observer.next(this.asyncSelected);
    }).mergeMap((res: any) => Observable.of(res));
  }

  /*
  public getStatesAsObservable(token: string): Observable<any> {
    let query = new RegExp(token, 'ig');
    // console.log(query);
    return Observable.of(
      [{id: 49, name: 'West Virginia', region: 'South'}]
    );
  }*/

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
 
  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }
 
  public typeaheadOnSelect(e: TypeaheadMatch): void {
    let already_in = false;

    for (let key in this.user.friends)
      if (this.user.friends[key] == e.value) {
        already_in = true;
        break;
      }
    
    if (!already_in)
      this.user.friends.push(e.value);
    
    this.asyncSelected = null;
  }

  ngOnInit() {
    this.userId = window.localStorage.getItem('userId');
    if (this.userId) {
      this._userService.get(this.userId).then(user => {
        // console.info(user);
        this.user = <User>{
          email: user.email,
          // picture: '',
          friends: user.friends_ref
        };
      });
    }
  }

  onSubmit(event) {
    console.log(this.user);

    this._userService.update(this.userId, this.user);

    return false;
  }

  onRemove(user) {
    console.log("Remove: " + user);

    for (var i = 0; i < this.user.friends.length; i++)
      if (this.user.friends[i] == user) {
        this.user.friends.splice(i, 1);
        // TODO: Implement persistance here
      }
    
    return false;
  }
}
