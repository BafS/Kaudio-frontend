import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Playlist } from '../../models/playlist';

//import for dialog
import { MdDialogRef, MdDialog } from '@angular/material';
import { AddPlaylistDialogComponent} from '../add-playlist-dialog/add-playlist-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input('playlists') playlistsList: Playlist[];
  @Output('selectPlaylist') selectedPlaylist = new EventEmitter<number>();
  private currentPlaylistKey: number = -1;

  //for add playlist dialog
  private dialogRef: MdDialogRef<AddPlaylistDialogComponent>;

  constructor(public dialog: MdDialog) { }

  selectPlaylist(key: number) {
    this.currentPlaylistKey = key;
    this.selectedPlaylist.emit(key);
  }

  /**
   * Call add playlist dialog
   */
  addPlaylist() {
    this.dialogRef = this.dialog.open(AddPlaylistDialogComponent, {
      disableClose: false
    });
  }
}

