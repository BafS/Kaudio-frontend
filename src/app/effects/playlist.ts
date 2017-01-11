import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as Playlist from './../reducers/playlists';
import {
  Playlist as PlaylistModel,
  Track as TrackModel
} from './../models';
import { PlaylistService } from './../services/api/playlist.service';
import { ActionTypes as PlaylistsActionTypes } from '../reducers/playlists';

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
          observer.next(<Action> {
            type: PlaylistsActionTypes.ADD_PLAYLIST_SUCCESS,
            payload: result
          });
        }).catch(error => {
          console.error('Error Add Playlist : ' + playlist.name + error);
          observer.next(<Action> {
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
      console.log(payload);

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

  // Update a playlist
  @Effect()
  addPlaylistSongAction$: Observable<Action> = this._actions$
    .ofType(PlaylistsActionTypes.ADD_SONG_PLAYLIST)
    .map(action => action.payload)
    .switchMap(payload => {
      return new Observable(observer => {
        let trackId: string = payload.track._id;
        let playlistID: string = payload.selectedPlaylist;

        // Patch the DB to add a new song
        this._playlistService.patch(playlistID, {
          op: 'add',
          path: '/tracks_ref',
          value: trackId,
        }).then((result: PlaylistModel) => {
          console.log('PATCH OK ', result);

          observer.next(<Action> {
            type: PlaylistsActionTypes.ADD_SONG_PLAYLIST_SUCCESS,
            payload: {
              playlistID,
              track: <TrackModel> payload.track,
            }
          });
        }).catch(error => {
          console.error(error);
          observer.next(<Action> {
            type: PlaylistsActionTypes.ADD_SONG_PLAYLIST_FAIL
          });
        });
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
            type: PlaylistsActionTypes.REMOVE_PLAYLIST_SUCCESS,
            payload: id
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
