import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from './../../services/api/message.service';
import { AuthenticationService } from './../../services/api/authentication.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthenticationService, MessageService ]
})
export class LoginComponent implements OnInit {
  private _messages: any[] = [];
  private error: string;
  // private _messageService: MessageService;
  user = new User('super@admin.com', 'adminPwd');
  token: string;

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

  ngOnInit() {
    this.token = this._authService.getToken();
    // this._messageService.find().then(messages => {
      //  this._messages = messages;
    // });
  }

  onSubmit(event) {
    console.log(`do login (${this.user.email})`);

    this._authService.auth(this.user.email, this.user.password).then((result) => {
      console.log('Authenticated!', result);

      this.token = this._authService.getToken();

      window.localStorage.setItem('userId', result.data._id);

      this.error = '';

      this._messageService.create({
        message: `User ${this.user.email} is logged (or try to...)`
      });
    }).catch((error) => {
      console.error('Error authenticating!', error);
      this.error = 'Invalid login or password.';
    });

    // TODO
    // If logged, redirection
    // if not, alert message

    return false;
  }

  onLogout() {
    this._authService.logout();
    this.token = null;
  }

  // @DEV
  sendMessage() {
    console.log('send a message....');
    this._messageService.create({
      message: `User ${this.user.email} send a message`
    });
  }
}
