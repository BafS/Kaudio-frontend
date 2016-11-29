import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import {Playlist} from '../../models/playlist';
import { PlaylistService } from '../../services/api/playlist.service';

@Component({
  selector: 'app-add-playlist-dialog',
  templateUrl: './add-playlist-dialog.component.html',
  styleUrls: ['./add-playlist-dialog.component.scss'],
  providers: [ PlaylistService ]
})
export class AddPlaylistDialogComponent implements OnInit {

  //playlist pour tester l'ajout a la db
  private playlist = <Playlist>{
    name: '',
    private: false
  };

  constructor(public dialogRef: MdDialogRef<AddPlaylistDialogComponent>, private _playlistService: PlaylistService) { 
    this._playlistService = _playlistService;
  }

  ngOnInit() {
  }

//TODO change to 
  addPlaylist(){
    this._playlistService.create({
      name: this.playlist.name,
      public: this.playlist.private
    }).then((result) => {
      console.log('Added Playlist : ' + this.playlist.name, result);

    }).catch((error) => {
      console.error('Error Add Playlist : ' + this.playlist.name, error);
    });
  }
}
