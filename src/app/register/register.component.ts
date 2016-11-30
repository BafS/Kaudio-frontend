import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/api/user.service';

import { MessageService } from '../shared/services/api/message.service';
import { User } from '../shared/models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ UserService, MessageService ]
})
export class RegisterComponent implements OnInit {
  private _messages: any[] = [];
  // private _messageService: MessageService;
  user = new User('', '', '', ['']);

  constructor(private _messageService: MessageService,
    private _userService: UserService
    ) {
    this._messageService = _messageService;
    this._userService = _userService;
  }

  ngOnInit() {
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
    })

    // TODO
    // If logged, redirection
    // if not, alert message

    return false;
  }
}
