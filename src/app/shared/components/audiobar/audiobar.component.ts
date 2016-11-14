import { Component, OnInit } from '@angular/core';

declare let plyr: any;

@Component({
  selector: 'app-audiobar',
  templateUrl: './audiobar.component.html',
  styleUrls: ['./audiobar.component.scss']
})
export class AudiobarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    plyr.setup({
      volume: 8
    });
  }

}
