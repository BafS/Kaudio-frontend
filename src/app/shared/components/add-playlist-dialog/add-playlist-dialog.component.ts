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
  public id: string;
  public new: boolean;  //To know if the dialog is for add or update playlist
  public title: string;
  public description?: string;
  public public?: boolean;
  private playlist: Playlist;

  constructor(
    public dialogRef: MdDialogRef<AddPlaylistDialogComponent>,
    private _playlistService: PlaylistService
  ) {
  }

  addPlaylist() {
    this.playlist = <Playlist>{
      name: this.title,
      description: this.description,
      public: this.public
    };
    this._playlistService.create(this.playlist
    ).then((result) => {
      console.log('Added Playlist : ' + this.playlist.name, result);

    }).catch((error) => {
      console.error('Error Add Playlist : ' + this.playlist.name + error);
    });
  }

  editPlaylist() { //TODO change for a real update
    this.playlist = <Playlist>{
      _id: this.id,
      name: this.title,
      description: this.description,
      public: this.public
    }

    console.log('Edit in Dialog : ' + this.title + ':' + this.playlist.description);

    this._playlistService.update(this.playlist._id, {
      name: this.playlist.name,
      description: this.playlist.description,
      public: this.playlist.public
    })
    .then((result) => {
      console.log('update Playlist : ' + this.playlist, result);

    }).catch((error) => {
      console.error('Error Add Playlist : ' + this.playlist.name, error);
    });
  }
}
