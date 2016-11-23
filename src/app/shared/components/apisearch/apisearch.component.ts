import { MessageService } from './../../services/api/message.service';
import { ApiSearchService } from './../../services/api/api-search.service';
import { Track } from './../../models/track';
import { Component, OnInit} from '@angular/core';
import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-search',
  templateUrl: './apisearch.component.html',
  styleUrls: ['./apisearch.component.scss'],
  providers: [ ApiSearchService, MessageService ]
})
export class ApiSearchComponent implements OnInit {
  public stateCtrl: FormControl = new FormControl();

  public track: Track;
  public myForm: FormGroup = new FormGroup({
    state: this.stateCtrl
  });
  public selected: string = '';
  public dataSource: Observable<any>;
  public asyncSelected: string = '';
  public typeaheadLoading: boolean = false;
  public typeaheadNoResults: boolean = false;

  constructor(
    private _apiSearchService: ApiSearchService,
  ) {
    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      if (this.asyncSelected.length > 0) {
        this._apiSearchService.find({
          query: {
            title: {
              $search: this.asyncSelected
            }
          }
        }).then(res => {
          observer.next(res.data);
        });
      }
      //observer.next(this.asyncSelected);
    }).mergeMap((res: any) => Observable.of(res));
  }


  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  public typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
  }

  ngOnInit() {

  }

  onSubmit(event) {

  }
}
