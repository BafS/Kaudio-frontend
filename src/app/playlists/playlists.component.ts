import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  private playlists: playlist[];
  // private currentPlaylist: playlist;

  constructor() { }

  ngOnInit() {
  }

}
