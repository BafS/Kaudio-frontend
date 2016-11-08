import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from './../shared/services/api/message.service'
import { AuthenticationService } from './../shared/services/api/authentication.service'
import {User} from '../models/user'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthenticationService, MessageService ]
})
export class LoginComponent implements OnInit {
  private _messages: any[] = [];
  // private _messageService: MessageService;
  user = new User('test@test.com', 'test')
  token = this._authService.getToken()

  constructor (
    private _messageService: MessageService,
    private _authService: AuthenticationService
    ) {
    this._messageService = _messageService;
    this._authService = _authService;
  }


  // constructor(fb: FormBuilder) {
    // this.loginForm = fb.group({
    //   email: ["", Validators.required],
    //   password: ["", Validators.required]
    // });
  // }

  onSubmit(event) {
    console.log(`do login (${this.user.email})`);

    this._authService.auth(this.user.email, this.user.password).then((result) => {
      console.log('Authenticated!', result);

      this.token = this._authService.getToken();

      this._messageService.create({
        message: `User ${this.user.email} is logged (or try to...)`
      });
    }).catch((error) => {
      console.error('Error authenticating!', error);
    })

    // TODO
    // If logged, redirection
    // if not, alert message

    return false;
  }



  // @DEV
  sendMessage() {
    console.log('send a message....')
    this._messageService.create({
      message: `User ${this.user.email} send a message`
    });
  }

  ngOnInit() {
    // this._messageService.find().then(messages => {
      //  this._messages = messages;
    // });
  }
}
