import { Track } from './../../models/track';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent {
  @Input() tracks: Track[];
  @Output()('SelectTrack') trackToAdd = new EventEmitter<Track>();

  constructor() {}

  selectTrack(track: Track) {
    console.log("track: " + track._id);
    //this.trackToAdd.emit(track);
  }
}