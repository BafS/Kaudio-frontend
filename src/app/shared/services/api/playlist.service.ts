import { Injectable } from '@angular/core';
import { RestService } from './../rest.service';
import { SocketService } from './../socket.service';
import { Piece } from '../../models';

@Injectable()
export class PlaylistService {
  private _socket;
  private _rest;

  constructor(
    private _socketService: SocketService,
    private _restService: RestService
  ) {

    this._rest = _restService.getService('user');
    this._socket = _socketService.getService('user');
  }
  find(query?: any) {
    return this._rest.find(query);
  }

  // TODO Get by name or id ?
  get(name: string, query: any) {
    return this._rest.get(name, query);
  }

  create(name: string, pieces: Piece[], isPrivate: boolean) {
    // app.get('token')
    return this._socket.create(name, pieces, isPrivate);
  }

  remove(name: string, query: any) {
    return this._socket.remove(name, query);
  }
}
