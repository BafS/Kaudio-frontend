import { Injectable } from '@angular/core';
import { RestService } from './../rest.service';
import { SocketService } from './../socket.service';
import { Track, Playlist } from '../../models';

@Injectable()
export class PlaylistService {
  //private _socket;
  private _rest;

  constructor(
    //private _socketService: SocketService,
    private _restService: RestService
  ) {
    this._rest = _restService.getService('playlists');
    //this._socket = _socketService.getService('playlists');
  }

  find(query?: any) {
    return this._rest.find(query);
  }

  // TODO Get by name or id ?
  get(name: string, query?: any) {
    return this._rest.get(name, query);
  }

  create(playlist: Playlist) {
    // app.get('token')
    return this._rest.create(playlist);
  }

  remove(name: string, query: any) {
    return this._rest.remove(name, query);
  }
}
