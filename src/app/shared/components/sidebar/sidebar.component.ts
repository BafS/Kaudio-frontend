import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input('playlists') playlistsList: Playlist[];
  @Output('selectPlaylist') selectedPlaylist = new EventEmitter<number>();
  private currentPlaylistKey: number = -1;

  selectPlaylist(key: number) {
    this.currentPlaylistKey = key;
    this.selectedPlaylist.emit(key);
  }
}
