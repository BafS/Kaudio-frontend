import { Component, Input, OnInit } from '@angular/core';
import { Track } from '../../models';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  @Input() title: string;
  @Input() tracks?: Track[]; // songs

  rows = [];

  columns = [
    { prop: 'title', comparator: false },
    { prop: 'album', sortable: false },
    { prop: 'artist', sortable: false }
  ];

  constructor() { }

  ngOnInit() {
  }

  onSort(event) {
    // event was triggered, start sort sequence
    console.log('Sort Event', event);
  }
}
