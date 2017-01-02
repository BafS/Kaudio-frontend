import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MessageService } from './../../services/api/message.service';
import { Message } from './../../models';
import { ActionTypes as MessagesActionTypes } from './../../reducers/messages';

@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.component.html',
  styleUrls: ['./livefeed.component.scss'],
  providers: [ MessageService ]
})
export class LivefeedComponent {
  public messages$: Observable<Message[]>;

  constructor(
    private _messageService: MessageService,
    private _store: Store<any>
  ) {
    this.messages$ = _store.select(s => s.messages);
  }

  onPingButton() {
    this._messageService.create({
      message: 'PING !'  + (Math.random() * 1000).toFixed(0)
    });
  }
}
