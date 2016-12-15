import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Playlist, Track, App } from '../shared/models';
import { PlaylistService } from './../shared/services/api/playlist.service';

import {
  INDEX_PLAYLISTS,
  ADD_PLAYLIST,
  UPDATE_PLAYLIST
} from '../shared/reducers/playlists';

import {
  SET_CURRENT_PLAYLIST
} from '../shared/reducers/app';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  providers: [ PlaylistService ]
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  currentPlaylist: Playlist;

  public playlistsStore: Observable<Playlist[]>;
  public appStore: Observable<App>;
  private _appSubscription: Subscription;
  private _playlistsSubscription: Subscription;

  constructor(
    private _playlistService: PlaylistService,
    private _store: Store<any>
  ) {
    this.playlistsStore = _store.select(s => s.playlists);
    this.appStore = _store.select(s => s.app);
  }

  ngOnInit() {
    this._appSubscription = this.appStore.subscribe(app => {
      console.log('SUB1');
      
      this.fetchPlaylist(app.currentPlaylist);
    });

    this._playlistService.find().then(playlists => {
      console.info(playlists);
      
      // If a playslist exists
      if (playlists.data) {
        this._store.dispatch({
          type: INDEX_PLAYLISTS,
          payload: playlists.data
        });

        // Reload previous playlist if possible
        let key = Number(window.localStorage.getItem('playlist-key'));
        if (key >= 0) {
          // this.loadPlaylist(key);
          this._store.dispatch({
            type: SET_CURRENT_PLAYLIST,
            payload: key
          });
        }
      }
    });
  }

  ngOnDestroy() {
    this._appSubscription.unsubscribe();
    // this._playlistsSubscription.unsubscribe();
  }

  loadPlaylist(index: number) {
    console.log("RELOAD", index);
    this._store.dispatch({
      type: SET_CURRENT_PLAYLIST,
      payload: index
    });
  }

  fetchPlaylist(index) {
    this.playlistsStore.take(1).subscribe(r => {
      // console.log(r.toString());
      this.currentPlaylist = r[index];
      console.log('->', this.currentPlaylist);

      if (this.currentPlaylist && this.currentPlaylist._id) {
        this._playlistService.get(this.currentPlaylist._id).then(playlist => {
          this.currentPlaylist = playlist

      //     // this._store.dispatch({
      //     //   type: UPDATE_PLAYLIST,
      //     //   payload: {
      //     //     index,
      //     //     playlist
      //     //   }
      //     // });
        });
      }
    })
  }
}
