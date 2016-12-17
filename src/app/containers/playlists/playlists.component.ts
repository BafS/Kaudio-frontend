import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { createSelector } from 'reselect';

import { PlaylistService } from './../../services/api/playlist.service';
import { State } from './../../reducers';

import {
  Playlist,
  Track,
  App
} from '../../models';

import {
  State as PlaylistState,
  ActionTypes as PlaylistsActionTypes
} from '../../reducers/playlists';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  providers: [ PlaylistService ]
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlist$: Observable<Playlist>;

  public playlistsStore: Observable<PlaylistState>;
  public playlistsEntitiesStore: Observable<Playlist[]>;

  private _playlistSelectSubscription: Subscription;

  constructor(
    private _playlistService: PlaylistService,
    private _store: Store<any>
  ) {
    this.playlistsStore = _store.select(s => s.playlists);
    this.playlistsEntitiesStore = _store.select(s => s.playlists.entities);

    const getEntities = (state: PlaylistState) => state.entities;
    const getSelectedId = (state: PlaylistState) => state.selectedPlaylistId;

    const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
      return entities[selectedId];
    });
    const getPlaylistState = (state: State) => state.playlists;
    const getSelectedPlaylist = createSelector(getPlaylistState, getSelected);

    this.playlist$ = _store.select(getSelectedPlaylist);
  }

  ngOnInit() {
    this._playlistSelectSubscription = this._store.select(s => s.playlists.selectedPlaylistId).subscribe((id: string) => {
        if (id) {
          this._playlistService.get(id).then(playlist => {
            console.log(playlist);

            this._store.dispatch({
              type: PlaylistsActionTypes.LOAD_PLAYLIST,
              payload: playlist
            });
          });
        }
    });

    this._playlistService.find().then(playlists => {
      console.info(playlists);
      
      // If a playslist exists
      if (playlists.data) {
        this._store.dispatch({
          type: PlaylistsActionTypes.INDEX_PLAYLISTS,
          payload: playlists.data
        });

        // Reload previous playlist if possible
        let id = window.localStorage.getItem('playlist-key');
        if (id) {
          this.selectPlaylist(id);
        }
      }
    });
  }

  ngOnDestroy() {
    this._playlistSelectSubscription.unsubscribe();
    // this._appSubscription.unsubscribe();
  }

  selectPlaylist(id: string) {
    console.log('SELECT ', id);
    window.localStorage.setItem('playlist-key', '' + id);
    this._store.dispatch({
      type: PlaylistsActionTypes.SELECT_PLAYLIST,
      payload: id
    });
  }
}
