import { Component, OnInit } from '@angular/core';
import { Playlist } from '../shared/models/playlist';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  private playlists: Playlist[];
  // private currentPlaylist: playlist;

  constructor() { }

  ngOnInit() {
    this.playlists = [
      <Playlist>
      {
        id: 1,
        name: 'Jazz',
        isPrivate: false
      },
      {
        id: 2,
        name: 'Classical',
        isPrivate: true
      }
    ];
  }

  loadPlaylist(id: number) {
    console.log(`Playlist id(${id}) will be loaded !`)
  }

}
