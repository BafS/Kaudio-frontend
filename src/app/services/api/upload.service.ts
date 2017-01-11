import { Injectable } from '@angular/core';
// import { SocketService } from './../socket.service';
import { RestService } from './../rest.service';
import { Track, Playlist } from '../../models';

@Injectable()
export class Uploadervice {
  private _service;

  constructor(
    private _restService: RestService
  ) {
    this._service = _restService.getService('/localuploads');
  }

  find(query?: any) {
    return this._service.find(query);
  }

  // TODO Get by name or id ?
  get(name: string, query?: any) {
    return this._service.get(name, query);
  }

  create(playlist: Playlist) {
    // app.get('token')
    return this._service.create(playlist);
  }

  // TODO change object to playlist... marche dans app playlist comme ça mais si on change Object ne marche plus
  update(id: string, playlist: Object) {
    // app.get('token')
    return this._service.update(id, playlist);
  }

  remove(name: string, query?: any) {
    return this._service.remove(name, query);
  }

  patch(name: string, data: Object, query?: any) {
    return this._service.patch(name, data, query);
  }
}
