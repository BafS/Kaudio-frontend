import { MessageService } from './../../shared/services/api/message.service';
import { ApiSearchService } from './../../shared/services/api/api-search.service';
import { Track } from './../../shared/models/track';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-search',
  templateUrl: './apisearch.component.html',
  styleUrls: ['./apisearch.component.scss'],
  providers: [ ApiSearchService, MessageService ]
})
export class ApiSearchComponent implements OnInit {

  public selected: string = '';
  tracks: Observable<Track[]>;
  searchTerm = new Subject<string>();

  constructor(
    private _apiSearchService: ApiSearchService,
  ) {}

  ngOnInit() {
    this.tracks = this.searchTerm
      .debounceTime(100)        // wait for 100ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this._apiSearchService.search(term)
        : Observable.of<Track[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(this.tracks);
        return Observable.of<Track[]>([]);
      });
  }
}
