import { Injectable } from '@angular/core';
import { RestService } from './../rest.service';
import { SocketService } from './../socket.service';
import { Track } from '../../models';

@Injectable()
export class PlaylistService {
  private _socket;
  private _rest;

  constructor(
    private _socketService: SocketService,
    private _restService: RestService
  ) {
    this._rest = _restService.getService('playlists');
    this._socket = _socketService.getService('playlists');
  }

  find(query?: any) {
    return this._rest.find(query);
  }

  // TODO Get by name or id ?
  get(name: string, query?: any) {
    return this._rest.get(name, query);
  }

  create(name: string, tracks: Track[], isPrivate: boolean) {
    // app.get('token')
    return this._socket.create(name, tracks, isPrivate);
  }

  remove(name: string, query: any) {
    return this._socket.remove(name, query);
  }
}
