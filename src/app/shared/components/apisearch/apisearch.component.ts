import { Component, OnInit } from '@angular/core';
import { Track } from '../../models/track';
import { ApiSearchService } from '../../services/api/api-search.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-search',
  templateUrl: './apisearch.component.html',
  styleUrls: ['./apisearch.component.scss'],
  providers: [ ApiSearchService ]
})
export class ApiSearchComponent implements OnInit {
  tracks: Track[];
  term$ = new Subject<string>();

  constructor(
    private _apiSearchService: ApiSearchService,
  ) {
  }

  ngOnInit() {
    this.term$.subscribe(term => this.search(term));
  }

  search(term: string) {
    this._apiSearchService.find(term).then(result => {
      if (result.data) {
        this.tracks = result.data;
      }
    });
  }
}
