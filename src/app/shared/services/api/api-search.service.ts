import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Track } from './../../models/track';

import {Injectable} from '@angular/core';
import { RestService } from './../rest.service';

@Injectable()
export class ApiSearchService {
  private _rest;

  constructor(
    private _restService: RestService, private http: Http
  ) {
    this._rest = _restService.getService('tracks');
  }

  find(query?: any) {
    return this._rest.find(query);
  }
  search(term :string):Observable<Track[]>{
    return this.http
               .get(`http://localhost:3030/tracks?title[$search]=${term}`)
               .map((r: Response) => r.json().data as Track[]);
  }
}
