import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from './../shared/services/api/message.service'
import { AuthenticationService } from './../shared/services/api/authentication.service'

class User {
  constructor(
    // public id: number,
    public email: string,
    public password: string,
    // public username?: string
  ) {  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthenticationService, MessageService ]
})
export class LoginComponent implements OnInit {
  private _messages: any[] = [];
  // private _messageService: MessageService;

  constructor (
    private _messageService: MessageService,
    private _authService: AuthenticationService
    ) {
    this._messageService = _messageService;
    this._authService = _authService;
  }

  user = new User('test@test.com', 'test')

  // constructor(fb: FormBuilder) {
    // this.loginForm = fb.group({
    //   email: ["", Validators.required],
    //   password: ["", Validators.required]
    // });
  // }

  onSubmit(event) {
    console.log(`do login (${this.user.email})`);
    this._authService.auth(this.user.email, this.user.password);
    this._messageService.create({
      message: `User ${this.user.email} is logged (or try to...)`
    });

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
