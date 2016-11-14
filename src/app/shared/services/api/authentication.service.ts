import { Injectable } from '@angular/core';
import { RestService } from './../rest.service';
// import { SocketService } from './../socket.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private _rest: RestService
  ) { }

  auth(email: string, password: string): Promise<any> {
    return this._rest.getApp().authenticate({
        type: 'local',
        email: email,
        password: password
      });
  }

  getUser() {
    return this._rest.getApp().get('user');
  }

  getToken() {
    return this._rest.getApp().get('token');
  }

  logout() {
    window.localStorage.setItem('userId', null); // tmp
    return this._rest.getApp().logout();
  }
}

