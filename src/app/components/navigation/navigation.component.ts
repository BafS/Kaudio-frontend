import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action, Store } from '@ngrx/store';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public login$: Observable<boolean>;

  constructor(
    private _store: Store<any>
  ) {
    this.login$ = _store.select(s => s.login);
    console.log(this.login$);
   }

  ngOnInit() {
  }

}
