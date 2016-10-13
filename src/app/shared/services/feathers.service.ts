import { Injectable } from '@angular/core';
const feathers = require('feathers');

@Injectable()
export class FeathersService {
  private _app: any;

  constructor() {
    this._app = feathers()
  }

  getApp() {
    return this._app;
  }
}
