import { Injectable } from '@angular/core';
import { FeathersService } from './feathers.service';

const io = require('socket.io-client');
const feathers = require('feathers/client');
const hooks = require('feathers-hooks');
const socketio = require('feathers-socketio/client');
// const localstorage = require('feathers-localstorage');
const authentication = require('feathers-authentication/client');

const HOST = 'http://127.0.0.1:3030';

@Injectable()
export class SocketService extends FeathersService {
  public socket: any; // SocketIOClient.Socket;

  constructor(
  ) {
    super();
    this.socket = io(HOST, {
      // transports: ['websocket']
    });
    this._app = feathers()
      .configure(hooks())
      .configure(socketio(this.socket))
      .configure(authentication({ storage: window.localStorage }));

    this.authenticateIfPossible()

    this.socket.io.engine.on('reconnect', () => {
      console.log('--> reconnect');
      // this._app.authenticate();
    });

    // If the transport changes, you have to authenticate again.
    this.socket.io.engine.on('upgrade', transport => {
      console.log('>> transport changed [socket.service]');
      this.authenticateIfPossible()
    });
  }

  // TODO clean this class and this method
  private authenticateIfPossible() {
    console.log('-> authenticateIfPossible');

    // TODO workaround
    if (window.localStorage.getItem('feathers-jwt')) {
      this._app.set('token', window.localStorage.getItem('feathers-jwt'));
      console.log(
        window.localStorage.getItem('feathers-jwt')
      );
      console.log(
        this._app.get('token')
      );

      // If we have a token, we can authenticate
      this._app.authenticate();

      console.log('Authenticated done')
    }
    // TODO If no token -> redirection to login
  }

  // TODO WIP -> use observer
  public on(trigger: string, callback: Function) {
    this.socket.on(trigger, callback);
  }
}
