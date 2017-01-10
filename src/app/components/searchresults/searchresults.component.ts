import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Track } from './../../models';
import { ActionTypes as PlaylistsActionTypes } from './../../reducers/playlists';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent implements OnInit, OnDestroy {
  @Input() tracks: Track[];
  @Output()('SelectTrack') trackToAdd = new EventEmitter<Track>();
  private _playlists: Observable<any>;
  private _selectedPlaylist: string;
  private _subscriber: Subscription;

  constructor(
    private _store: Store<any>
  ) {
    this._playlists = _store.select(s => s.playlists);
  }

  ngOnInit() {
    this._subscriber = this._playlists.subscribe(v => {
      this._selectedPlaylist = v.selectedPlaylistId;
      this.hideTable = false;
    });
  }

  ngOnDestroy() {
    this._subscriber.unsubscribe();
  }

  /**
   * Add the selected track to the selected playlist
   */
  addTrack(track: Track): void {
    this._store.dispatch({
      type: PlaylistsActionTypes.ADD_SONG_PLAYLIST,
      payload: {
        track,
        selectedPlaylist: this._selectedPlaylist,
      }
    });
  }
  private hideTable: boolean = false;

    closeTable(){

            this.hideTable = true;
            //this.tracks = [];
            //this.hideTable =false;

    }
}

