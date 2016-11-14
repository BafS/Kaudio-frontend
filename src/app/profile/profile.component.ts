import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/api/user.service'

import {MessageService} from '../shared/services/api/message.service'
import { User } from '../shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ UserService, MessageService ]})
export class ProfileComponent implements OnInit {
    private _messages: any[] = [];
    user = new User('', '', '')

  constructor(
    ) {
  }

    onSubmit(event) {
    console.log(`do register (${this.user.email})`);

    console.log(this.user.email);
    console.log(this.user.password);
    console.log(this.user.picture);

    // TODO
    // If logged, redirection
    // if not, alert message

    return false;
  }


  ngOnInit() {
  }

}
