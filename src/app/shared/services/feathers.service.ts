import { Injectable } from '@angular/core';
// const feathers = require('feathers');

@Injectable()
export class FeathersService {
  protected _app: any;

  constructor() {
    // this._app = feathers();
  }

  getService(service: string) {
    return this.getApp().service(service);
  }

  getApp() {
    return this._app;
  }
}
