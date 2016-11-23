import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Playlist } from '../../models/playlist';

//import pour l'ajout de playlist
import { PlaylistService } from '../../services/api/playlist.service';
import { MessageService } from '../../services/api/message.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [ PlaylistService, MessageService ]
})
export class SidebarComponent {
  @Input('playlists') playlistsList: Playlist[];
  @Output('selectPlaylist') selectedPlaylist = new EventEmitter<number>();
  private currentPlaylistKey: number = -1;


  //pour l'ajour de playlist
  private _messages: any[] = [];
  private playlist;

  constructor(private _messageService: MessageService,
    private _playlistService: PlaylistService
    ) {
    this._messageService = _messageService;
    this._playlistService = _playlistService;
  }

  selectPlaylist(key: number) {
    this.currentPlaylistKey = key;
    this.selectedPlaylist.emit(key);
  }

  /**
   * Methode pour ajouter une playlist
   */
  addPlaylist(event) {
    console.log(`add playlist `);


    this.playlist = <Playlist>{
      _id: '0',
      name: 'test',
      tracks: [],
      isPrivate: false
    };

    this._playlistService.create(this.playlist).then((result) => {
      console.log('add Playlist!', result);

      /*this._messageService.create({
        //message: `playlist ${this.playlist.name} is registered (or try to...)`
        //message: `playlist Test is added (or try to...)`
      });*/
    }).catch((error) => {
      console.error('Error add playlist!', error);
    })

    return false;
  }



  
}
