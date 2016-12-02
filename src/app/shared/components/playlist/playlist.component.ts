import { Component, Input, OnInit } from '@angular/core';
import { Track } from '../../models';

import { MdDialogRef, MdDialog } from '@angular/material';
import { PlaylistService } from '../../services/api/playlist.service';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  providers: [ PlaylistService ]
})
export class PlaylistComponent implements OnInit {
  @Input() title: string;
  @Input() description?: string;
  @Input() tracks?: Track[]; // songs
  @Input() id: string;

  rows = [];

  columns = [
    { prop: 'title', comparator: false },
    { name: 'Album', prop: 'album.title', sortable: false },
    { name: 'Artist', prop: 'album.artist.name', sortable: false }
  ];

//  private dialogRef: MdDialogRef<EditPlaylistDialogComponent>;

  constructor(
    private _playlistService: PlaylistService, 
    public dialog: MdDialog) {
      this._playlistService = _playlistService;
  }

  ngOnInit() {
  }

  onSort(event) {
    // event was triggered, start sort sequence
    console.log('Sort Event', event);
  }

  updatePlaylist(){
    
  }

  deletePlaylist(){
    this._playlistService.remove(this.id, '').then((result) => {
      console.log('Playlist : ' + this.title + ' delete', result);

    }).catch((error) => {
      console.error('Error Delete Playlist : ' + this.title , error);
    });
  }
}
