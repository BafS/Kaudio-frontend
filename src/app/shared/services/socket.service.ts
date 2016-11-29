import { Injectable } from '@angular/core';
import { FeathersService } from './feathers.service';

const io = require('socket.io-client');
const feathers = require('feathers/client');
const hooks = require('feathers-hooks');
const socketio = require('feathers-socketio/client');
// const localstorage = require('feathers-localstorage');
const authentication = require('feathers-authentication/client');

const HOST = 'http://localhost:3030';

@Injectable()
export class SocketService extends FeathersService {
  public socket: any; // SocketIOClient.Socket;

  constructor(
  ) {
    super();
    this.socket = io(HOST);
    this._app = feathers()
      .configure(socketio(this.socket))
      .configure(hooks())
      .configure(authentication({ storage: window.localStorage }));

    // TODO workaround
    if (window.localStorage.getItem('feathers-jwt')) {
      // this._app.set('token', window.localStorage.getItem('feathers-jwt'));
    }
  }

  // WIP
  public on(trigger: string, callback: Function) {
    this.socket.on(trigger, callback);
  }
}
