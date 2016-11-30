import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import {Playlist} from '../../models/playlist';
import { PlaylistService } from '../../services/api/playlist.service';

@Component({
  selector: 'app-add-playlist-dialog',
  templateUrl: './add-playlist-dialog.component.html',
  styleUrls: ['./add-playlist-dialog.component.scss'],
  providers: [ PlaylistService ]
})
export class AddPlaylistDialogComponent {

  private playlist = <Playlist>{
    name: '',
    description: '',
    public: true
  };

  constructor(
    public dialogRef: MdDialogRef<AddPlaylistDialogComponent>,
    private _playlistService: PlaylistService
  ) {
  }

  addPlaylist() {
    this._playlistService.create(this.playlist
      /*name: this.playlist.name,
      description: this.playlist.description,
      public: this.playlist.public*/
    ).then((result) => {
      console.log('Added Playlist : ' + this.playlist.name, result);

    }).catch((error) => {
      console.error('Error Add Playlist : ' + this.playlist.name, error);
    });
  }

  editPlaylist() { //TODO change for update
    this._playlistService.update('', {name: ''})
    .then((result) => {
      //console.log('Added Playlist : ' + this.playlist.name, result);

    }).catch((error) => {
      //console.error('Error Add Playlist : ' + this.playlist.name, error);
    });
  }  
}
