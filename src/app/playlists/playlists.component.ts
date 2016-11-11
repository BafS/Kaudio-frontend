import { Component, OnInit } from '@angular/core';
import { Playlist, Piece } from '../shared/models';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  private playlists: Playlist[];
  private currentPlaylist: Playlist;

  constructor() {
    this.currentPlaylist = <Playlist>{
      id: -1,
      name: '',
      isPrivate: false,
      pieces: []
    }
  }

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

    // TODO get playlist from API

    this.currentPlaylist = <Playlist>{
      id: id,
      name: this.playlists[id-1].name,
      isPrivate: this.playlists[id-1].isPrivate,
      pieces: [
        <Piece>
        {
          title: 'My super song',
          artist: 'Debussy',
          album: 'Kaudioz'
        },
        {
          title: 'My Selene',
          artist: 'Sonata Arctica',
          album: 'Reckoning Night'
        },
        {
          title: 'The Way You Look Tonight (alt take)',
          artist: 'Wes Montgomery',
          album: 'Trio	Guitar On The Go'
        }
      ]
    };
  }
}
