import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Playlist } from '../../models/playlist';
import { PlaylistService } from '../../services/api/playlist.service';
import { Store } from '@ngrx/store';
import { ActionTypes as PlaylistActionTypes } from './../../reducers/playlists';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-playlist-dialog',
  templateUrl: './playlist-dialog.component.html',
  styleUrls: ['./playlist-dialog.component.scss'],
  providers: [ PlaylistService ]
})
export class PlaylistDialogComponent {
  public id: string;
  public new: boolean;  //To know if the dialog is for add or update playlist
  public title: string;
  public description?: string;
  public public?: boolean;
  private playlist: Playlist;
  public player: Observable<any>;

  constructor(
    public dialogRef: MdDialogRef<PlaylistDialogComponent>,
    private _playlistService: PlaylistService,
    private _store: Store<any>
  ) {
    this.player = _store.select(s => s.player);
    //By default the playlist is public
    if (true === !this.new) {
      this.public = true;
    }
  }

  addPlaylist() {
    // New playlist
    this.playlist = <Playlist>{
      name: this.title,
      description: this.description,
      public: this.public
    };

    this._store.dispatch({
        type: PlaylistActionTypes.ADD_PLAYLIST,
        payload: this.playlist
    });

    this.dialogRef.close();
  }

  editPlaylist() {
    //playlist to edit
    this.playlist = <Playlist>{
      _id: this.id,
      name: this.title,
      description: this.description,
      public: this.public
    };

    //update in DB
    this._playlistService.update(this.playlist._id, this.playlist)
    .then((result) => {
      console.log('Update Playlist : ' + this.playlist, result);

    }).catch((error) => {
      console.error('Error Add Playlist : ' + this.playlist.name, error);
    });
  }
}
