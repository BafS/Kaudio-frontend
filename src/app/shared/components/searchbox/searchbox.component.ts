import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Track } from './../../models/track';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {

@Input() term = new Subject<string>();
  constructor() { }

  ngOnInit() {
  }
  search(term : string): void {
  this.term.next(term);
}

}
