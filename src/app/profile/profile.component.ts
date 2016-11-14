import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/api/user.service';
import { AuthenticationService } from '../shared/services/api/authentication.service';

import { MessageService } from '../shared/services/api/message.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ AuthenticationService, UserService, MessageService ]
})
export class ProfileComponent implements OnInit {
    private _messages: any[] = [];
    private userId: string;
    user: User;

  constructor(
    private _userService: UserService,
    private _authService: AuthenticationService,
  ) { }

  ngOnInit() {
    //let token = this._authService.getToken();
    //let user = this._authService.getUser();
    // console.log(user);
    // console.log(token);

    this.userId = window.localStorage.getItem('userId');
    if (this.userId) {
      this._userService.get(this.userId).then(user => {
        // console.info(user);
        this.user = <User>{
          email: user.email,
          //picture: '',
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

}
