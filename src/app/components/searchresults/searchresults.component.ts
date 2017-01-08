import { Store } from '@ngrx/store';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Track } from './../../models';
import { ActionTypes as PlaylistsActionTypes } from './../../reducers/playlists';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent {
  @Input() tracks: Track[];
  @Output()('SelectTrack') trackToAdd = new EventEmitter<Track>();

  constructor(
    private _store: Store<any>
  ) {
  }

  addTrack(track: Track) {
    console.info('track', track);

    // TODO
    // this._store.dispatch({
    //   type: PlaylistsActionTypes.UPDATE_PLAYLIST,
    //   payload: track
    // });
  }
}
