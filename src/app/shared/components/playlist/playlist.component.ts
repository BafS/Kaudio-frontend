import { Component, Input, OnInit } from '@angular/core';
import { Piece } from '../../models/piece'

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  @Input() title: string;
  @Input() pieces?: Piece[]; // songs

  constructor() { }

  ngOnInit() {
  }

}
