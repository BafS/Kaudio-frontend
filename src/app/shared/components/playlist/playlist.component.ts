import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Track, AudioFile } from '../../models';
import { LOAD_SONG } from './../../reducers/player';

import { MdDialogRef, MdDialogConfig, MdDialog } from '@angular/material';
import { Playlist } from '../../models/playlist';
import { PlaylistService } from '../../services/api/playlist.service';
import { PlaylistDialogComponent} from '../playlist-dialog/playlist-dialog.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  providers: [ PlaylistService ]
})
export class PlaylistComponent {
  @Input() title: string;
  @Input() description?: string;
  @Input() tracks?: Track[]; // songs
  @Input() id: string;
  @Input() public: boolean;

  private rows = [];

  private selected = [];

  private columns = [
    { name: 'Song', prop: 'title', comparator: false },
    { name: 'Album', prop: 'album.title' },
    { name: 'Artist', prop: 'album.artist.name' }
  ];

  private dialogRef: MdDialogRef<PlaylistDialogComponent>;

  public player: Observable<any>;

  constructor(
    public dialog: MdDialog,
    private _playlistService: PlaylistService,
    private _store: Store<any>
  ) {
    this.player = _store.select(s => s.player);
  }

  onSort(event) {
    // event was triggered, start sort sequence
    console.log('Sort Event', event);
  }

  updatePlaylist() {  //TODO Can change to send a playlist and not 5 single element
    this.dialogRef = this.dialog.open(PlaylistDialogComponent, <MdDialogConfig>{
      // width: '500px',
      disableClose: false
    });
    this.dialogRef.componentInstance.new = false;
    this.dialogRef.componentInstance.title = this.title;
    this.dialogRef.componentInstance.description = this.description;
    this.dialogRef.componentInstance.public = this.public;
    this.dialogRef.componentInstance.id = this.id;
  }

  deletePlaylist() {
    this._playlistService.remove(this.id, '').then((result) => {
      console.log('Playlist : ' + this.title + ' delete', result);

    }).catch((error) => {
      console.error('Error Delete Playlist : ' + this.title , error);
    });
  }

  onActivate(event) {
    if (event.type === 'dblclick') {
      let row = event.row;
      console.log('This id will be played', row._id);

      this._store.dispatch({
        type: LOAD_SONG,
        payload: <AudioFile> {
          filepath: 'test.mp3'
        }
      });
    }
  }
}
