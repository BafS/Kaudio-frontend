import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Playlist } from '../../models/playlist';

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

  selectPlaylist(id: string) {
    this.currentPlaylistId = id;
    this.selectedPlaylist.emit(id);
  }
}

