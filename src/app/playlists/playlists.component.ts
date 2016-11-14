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
    this._playlistService.find().then(playlists => {
      console.info(playlists);
      if (playlists.data) {
        this.playlists = playlists.data;
      }
    });
  }

  loadPlaylist(key: number) {
    console.log(`Playlist id(${key}) will be loaded !`)

    let tmpPlaylist = this.playlists[key];
    tmpPlaylist.tracks = [
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
      ];

    this.currentPlaylist = tmpPlaylist;
  }
}
