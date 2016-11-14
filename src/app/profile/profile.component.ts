import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/api/user.service'

import {MessageService} from '../shared/services/api/message.service'

// TODO factorisee 'User' (ds login et ds profile)
class User {
  constructor(
    // public id: number,
    public email: string,
    public password: string,
    // public username?: string
  ) {  }
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ UserService, MessageService ]})
export class ProfileComponent implements OnInit {
    private _messages: any[] = [];
    user = new User('', '')

  constructor(
    ) {
  }

    onSubmit(event) {
    console.log(`do register (${this.user.email})`);

    console.log(this.user.email);

    // TODO
    // If logged, redirection
    // if not, alert message

    return false;
  }


  ngOnInit() {
  }

}
