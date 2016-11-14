import { Component, OnInit } from '@angular/core';
import { Playlist, Track } from '../shared/models';
import { PlaylistService } from './../shared/services/api/playlist.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  providers: [ PlaylistService ]
})
export class PlaylistsComponent implements OnInit {
  private playlists: Playlist[];
  private currentPlaylist: Playlist;

  constructor(
    private _playlistService: PlaylistService,
  ) {
    this.currentPlaylist = <Playlist>{
      id: -1,
      name: '',
      isPrivate: false,
      tracks: []
    };
  }

  ngOnInit() {
    let all = this._playlistService.find();
    console.info(all.data);

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
      tracks: [
        <Track>
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
