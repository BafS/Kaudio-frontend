import { Injectable } from '@angular/core';
// import { RestService } from './../rest.service';
import { SocketService } from './../socket.service';

@Injectable()
export class AuthenticationService {
  private _socket;
  // private _app;
  // private _rest;

  constructor(
    private _socketService: SocketService,
  ) {
    // Let's get both the socket.io and REST feathers services for messages!
    this._socket = _socketService;
  }

  auth(email: string, password: string): Promise<any> {
    return this._socket.getApp().authenticate({
        type: 'local',
        email: email,
        password: password
      }).then((result) => {
        console.log('Authenticated!', result);
      }).catch((error) => {
        console.error('Error authenticating!', error);
      })
  }

  logout() {
    return this._socket.getApp().logout();
  }
}

