import { Injectable } from '@angular/core';
import { RestService } from './../rest.service';
import { SocketService } from './../socket.service';

@Injectable()
export class MessageService {
  private _socket;
  private _rest;

  constructor(
    private _socketService: SocketService,
    private _restService: RestService
  ) {
    // TODO use socket only for feed ?
    this._rest = _restService.getService('messages');
    this._socket = _socketService.getService('messages');

    // TODO add observer
    // this._socket.on('created', function (message) {
      // console.log('-- New Message [socket mesg] --'); // DEV TODO
      // console.log(message);
    // });
  }

  public on(trigger: string, callback: Function) {
    this._socket.on(trigger, callback);
  }

  find(query?: any) {
    return this._rest.find(query);
  }

  get(id: string, query: any) {
    return this._rest.get(id, query);
  }

  create(message: any) {
    // app.get('token')
    return this._socket.create(message);
  }

  remove(id: string, query: any) {
    return this._socket.remove(id, query);
  }
}
