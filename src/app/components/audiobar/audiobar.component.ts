import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AudioFile } from './../../models';

declare let plyr: any;
// declare let Hls: any;

@Component({
  selector: 'app-audiobar',
  templateUrl: './audiobar.component.html',
  styleUrls: ['./audiobar.component.scss']
})
export class AudiobarComponent implements OnInit {

  // private _player;
  player: Observable<AudioFile>;

  constructor(
    private _store: Store<any>
  ) {
    this.player = _store.select(s => s.player);
  }

  ngOnInit() {
    let inst = plyr.setup({
      volume: 9
    })[0];

    this.player.take(1).subscribe(r => {
      console.log(inst);

      inst.source({
        type: 'audio',
        sources: [{
          src: 'http://localhost:3030/audios/585142ef3e7d5324e8f61b78',
          type: 'audio/mp3'
        }]
      })
    })

// let config = {
//   xhrSetup: function(xhr, url) {
//     xhr.withCredentials = true; // do send cookies
//   }
// }
//let hlsc = new Hls(config);

//   if(Hls.isSupported()) {
//     var video = document.getElementById('video');
//     var hlsc = new Hls();
//     hlsc.loadSource('http://www.streambox.fr/playlists/test_001/stream.m3u8');
//     hlsc.attachMedia(video);
//     hlsc.on(Hls.Events.MANIFEST_PARSED, function() {
      
      
//   });
//  }

// a.on('ready', function(event) {
//   console.log('asdsffsdfdfs');
// });

    // this._player.source({
    //   type:       'audio',
    //   title:      'Example title',
    //   sources: [{
    //     src:      'http://localhost:3030/audios/585119cbdda1611abee6a21d',
    //     type:     'audio/mp3'
    //   }]
    // //   {
    // //     src:      '/path/to/audio.ogg',
    // //     type:     'audio/ogg'
    // //   }]
    // });
  }
}
