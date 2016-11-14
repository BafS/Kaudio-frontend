import { Injectable } from '@angular/core';
// import { FeathersService } from './feathers.service';
const superagent = require('superagent');

const feathers = require('feathers/client');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest/client');
const authentication = require('feathers-authentication/client');

const HOST = 'http://localhost:3030';
@Injectable()
export class RestService {
  private _app: any;

  constructor(
  ) {
    this._app = feathers()
      .configure(rest(HOST).superagent(superagent)) // Fire up rest
      .configure(hooks())
      .configure(authentication({ storage: window.localStorage }));

    // TODO workaround
    if (window.localStorage.getItem('feathers-jwt')) {
      this._app.set('token', window.localStorage.getItem('feathers-jwt'));
    }
  }

  getService(service: string) {
    return this.getApp().service(service);
  }

  getApp() {
    return this._app;
  }
}
