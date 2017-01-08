import * as Playlist from './../reducers/playlists';
import { Playlist as PlaylistModel } from './../models';
import { PlaylistService } from './../services/api/playlist.service';
import { ActionTypes as PlaylistsActionTypes } from '../reducers/playlists';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PlaylistEffects {

  // Create a new playlist
  @Effect()
  newPlaylistsAction$: Observable<Action> = this._actions$
    .ofType(PlaylistsActionTypes.ADD_PLAYLIST)
    .map(action => action.payload)
    .switchMap((playlist: PlaylistModel) => {
      return new Observable(observer => {
        // Create new playlist in DB
        this._playlistService.create(playlist).then(result => {
          console.log('Added Playlist : ' + playlist.name, result);
          observer.next(<Action>{
            type: PlaylistsActionTypes.ADD_PLAYLIST_SUCCESS
          });
        }).catch(error => {
          console.error('Error Add Playlist : ' + playlist.name + error);
          observer.next(<Action>{
            type: PlaylistsActionTypes.ADD_PLAYLIST_FAIL
          });
        });
      });
    });

  // Update a playlist
  @Effect()
  addPlaylistsAction$: Observable<Action> = this._actions$
    .ofType(PlaylistsActionTypes.UPDATE_PLAYLIST)
    .map(action => action.payload)
    .switchMap(payload => {
      return new Observable(observer => {
        // let track = payload.track;
        // let playlistID = payload.playlistID;

        // // Create new playlist in DB
        // this._playlistService.update(playlistID, playlist).then(result => {
        //   console.log('Added Playlist : ' + playlist.name, result);
        //   observer.next(<Action>{
        //     type: PlaylistsActionTypes.UPDATE_PLAYLIST_SUCCESS
        //   });
        // }).catch(error => {
        //   console.error('Error Add Playlist : ' + playlist.name + error);
        //   observer.next(<Action>{
        //     type: PlaylistsActionTypes.UPDATE_PLAYLIST_FAIL
        //   });
        // });
      });
    });

  // Remove a playlist
  @Effect()
  removePlaylistsAction$: Observable<Action> = this._actions$
    .ofType(PlaylistsActionTypes.REMOVE_PLAYLIST)
    .map(action => action.payload)
    .switchMap(id => {
      return new Observable(observer => {
        this._playlistService.remove(id).then(result => {
          observer.next(<Action>{
            type: PlaylistsActionTypes.REMOVE_PLAYLIST_SUCCESS
          });
        }).catch(error => {
          observer.next(<Action>{
            type: PlaylistsActionTypes.REMOVE_PLAYLIST_FAIL
          });
        });
      });
    });

  constructor(
    private _actions$: Actions,
    private _playlistService: PlaylistService
  ) { }

      // .mergeMap(playlist =>
      //   console.log(playlist)
      //     // this.db.insert('books', [ book ])
      //     // .map(() => new collection.AddBookSuccessAction(book))
      //     // .catch(() => of(new collection.AddBookFailAction(book)))
      // )
        /*
      .do(() => {
        // Create in DB
        console.info('TRY TO CREATE IN DB');
        this._playlistService.create(this.playlist).then(result => {
          console.log('Added Playlist : ' + this.playlist.name, result);

        }).catch((error) => {
          console.error('Error Add Playlist : ' + this.playlist.name + error);
        });
      })
      */
  // @Effect()
  // search$: Observable<Action> = this._actions$
  //   .ofType(Playlist.ActionTypes.UPDATE_PLAYLIST)
  //   .map(action => action.payload)
  //   .switchMap(playlist => {
  //     return this._playlistService.update(playlist.id, playlist)
  //       .map(updatePlaylist => {
  //         return {type: Playlist.ActionTypes.UPDATE_PLAYLIST_SUCCESS, payload: updatePlaylist};
  //       })
  //       .catch(() => of({type: Playlist.ActionTypes.UPDATE_PLAYLIST_FAIL}));
  //   });
}
