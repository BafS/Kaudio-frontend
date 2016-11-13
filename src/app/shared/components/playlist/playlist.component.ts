import { Component, Input, OnInit } from '@angular/core';
import { Piece } from '../../models';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: [
    //'./../../../../../node_modules/angular2-data-table/release/datatable.css',
    //'./../../../../../node_modules/angular2-data-table/release/material.css',
    './playlist.component.scss'
  ]
})
export class PlaylistComponent implements OnInit {
  @Input() title: string;
  @Input() pieces?: Piece[]; // songs

  rows = [];

  columns = [
    { prop: 'title' },
    { prop: 'album' },
    { prop: 'artist' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
