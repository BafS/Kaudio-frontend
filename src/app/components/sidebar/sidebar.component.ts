import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Playlist } from '../../models/playlist';
import { MdDialogRef, MdDialog } from '@angular/material';
import { PlaylistDialogComponent} from '../playlist-dialog/playlist-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

// TODO Verifier si après 5 ou plus playlists elles s'affichent dans le sidebar...
export class SidebarComponent {
  @Input('playlists') playlistsList: Observable<Playlist[]>;
  @Output('selectPlaylist') selectedPlaylist = new EventEmitter<string>();
  currentPlaylistId: string = '';

  // for add playlist dialog
  private dialogRef: MdDialogRef<PlaylistDialogComponent>;

  constructor(public dialog: MdDialog) {
  }

  selectPlaylist(id: string) {
    this.currentPlaylistId = id;
    this.selectedPlaylist.emit(id);
  }

  /**
   * Call add playlist dialog
   */
  addPlaylist() {
    this.dialogRef = this.dialog.open(PlaylistDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.new = true;
  }
}

