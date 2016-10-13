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
      .configure(authentication())
  }

  getService(service: string) {
    return this._app.service(service);
  }

  getApp() {
    return this._app;
  }
}
