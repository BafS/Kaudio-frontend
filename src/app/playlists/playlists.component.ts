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
      name: '',
      public: true,
    };
  }

  ngOnInit() {
    this._playlistService.find().then(playlists => {
      console.info(playlists);
      if (playlists.data) {
        this.playlists = playlists.data;

        // Reload previous playlist if possible
        let key = Number(window.localStorage.getItem('playlist-key'));
        if (key >= 0) {
          this.loadPlaylist(key);
        }
      }
    });
  }

  loadPlaylist(key: number) {
    if (!this.playlists[key]) {
      return;
    }

    window.localStorage.setItem('playlist-key', key + '');
    let uid = this.playlists[key]._id;

    console.log(`Playlist key:${key}, _id:${uid}`);

    this._playlistService.get(uid).then(playlist => {
      console.info(playlist);
      this.currentPlaylist = playlist
    });
  }
}
