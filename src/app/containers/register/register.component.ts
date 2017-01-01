import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { Router } from '@angular/router';

import { MessageService } from '../../services/api/message.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ UserService, MessageService ]
})
export class RegisterComponent implements OnInit {
  private _messages: any[] = [];
  // private _messageService: MessageService;
  user = new User('');
  private connected: boolean = false;

  constructor(
    private _messageService: MessageService,
    private _userService: UserService,
    private router: Router
  ) {
    this._messageService = _messageService;
    this._userService = _userService;
  }
  
  ngOnInit() {
    console.log(window.localStorage.getItem('userId'));

    if (window.localStorage.getItem('userId') != 'null')
      this.connected = true;
  }

  onSubmit(event) {
    console.log(`do register (${this.user.email})`);

    this._userService.create(this.user).then((result) => {
      console.log('Registered!', result);


      this._messageService.create({
        message: `User ${this.user.email} is registered (or try to...)`
      });
    }).catch((error) => {
      console.error('Error registration!', error);
    });

    // TODO
    // If logged, redirection
    // if not, alert message

    return false;
  }
}
