import { Component, Input, OnInit } from '@angular/core';
import { Track } from '../../models';

import { PlaylistService } from '../../services/api/playlist.service';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  providers: [ PlaylistService ]
})
export class PlaylistComponent implements OnInit {
  @Input() title: string;
  @Input() tracks?: Track[]; // songs

  rows = [];

  columns = [
    { prop: 'title', comparator: false },
    { name: 'Album', prop: 'album.title', sortable: false },
    { name: 'Artist', prop: 'album.artist.name', sortable: false }
  ];

  constructor(private _playlistService: PlaylistService) {
    this._playlistService = _playlistService;
  }

  ngOnInit() {
  }

  onSort(event) {
    // event was triggered, start sort sequence
    console.log('Sort Event', event);
  }

  //TODO recuperer l'id de la playlist selectionner et remove ça
  deletePlaylist(){
    /*this._playlistService.remove('582c2e80860b26649e67bea3', '').then((result) => {
      console.log('Playlist : ' + 'test' + ' delete', result);

    }).catch((error) => {
      console.error('Error Delete Playlist : ' , error);
    });*/

    this._playlistService.find('_id : 582c2e80860b26649e67bea3').then((result) => {
      console.log('Playlist : ', result);

    }).catch((error) => {
      console.error('Error Delete Playlist : ' , error);
    });

  }
}
