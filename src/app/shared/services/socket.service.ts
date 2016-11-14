import { Injectable } from '@angular/core';
// import { FeathersService } from './feathers.service';

// const feathers = require('feathers');
// const socketio = require('feathers-socketio/client');
// const io = require('socket.io-client');
// const localstorage = require('feathers-localstorage');
// const hooks = require('feathers-hooks');
// const rest = require('feathers-rest/client');
// const authentication = require('feathers-authentication');

const io = require('socket.io-client');
const feathers = require('feathers/client');
const hooks = require('feathers-hooks');
const socketio = require('feathers-socketio/client');
const localstorage = require('feathers-localstorage');
const authentication = require('feathers-authentication/client');

const HOST = 'http://localhost:3030';

@Injectable()
export class SocketService {
  public socket: any; // SocketIOClient.Socket;
  private _app: any;

  constructor(
  ) {
    this.socket = io(HOST);
    this._app = feathers()
      .configure(socketio(this.socket))
      .configure(hooks())
      .configure(authentication({ storage: window.localStorage }));
  }

  getService(service: string) {
    return this._app.service(service);
  }

  getApp() {
    return this._app;
  }
}
