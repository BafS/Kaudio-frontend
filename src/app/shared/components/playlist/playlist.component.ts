import { Component, Input, OnInit } from '@angular/core';
import { Track } from '../../models';

import { MdDialogRef, MdDialog } from '@angular/material';
import { Playlist } from '../../models/playlist';
import { PlaylistService } from '../../services/api/playlist.service';
import { PlaylistDialogComponent} from '../playlist-dialog/playlist-dialog.component';



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
  @Input() public: boolean

  rows = [];

  columns = [
    { prop: 'title', comparator: false },
    { name: 'Album', prop: 'album.title', sortable: false },
    { name: 'Artist', prop: 'album.artist.name', sortable: false }
  ];

  private dialogRef: MdDialogRef<PlaylistDialogComponent>;

   /*private playlist = <Playlist>{
    name: this.title,
    description: this.description,
    public: this.public
  };*/

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
    this.dialogRef = this.dialog.open(PlaylistDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.new = false;
    this.dialogRef.componentInstance.title = this.title;
    this.dialogRef.componentInstance.description = this.description;
    this.dialogRef.componentInstance.public = this.public;
    this.dialogRef.componentInstance.id = this.id;
    console.log('Update for : ' + this.title + ':' + this.description);
  }

  deletePlaylist(){
    this._playlistService.remove(this.id, '').then((result) => {
      console.log('Playlist : ' + this.title + ' delete', result);

    }).catch((error) => {
      console.error('Error Delete Playlist : ' + this.title , error);
    });
  }
}
