import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MessageService } from './../../services/api/message.service';
import { Message, AppState } from './../../models';
import { ADD_MESSAGE, REMOVE_MESSAGE, RESET } from './../../reducers/messages';

@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.component.html',
  styleUrls: ['./livefeed.component.scss'],
  providers: [ MessageService ]
})
export class LivefeedComponent implements OnInit {
  public messages: Observable<Message[]>;

  constructor(
    private _messageService: MessageService,
    private store: Store<any>
  ) {
    this.messages = store.select(s => s.messages);
  }

  ngOnInit() {
    this._messageService.on('created', message => {
      console.info('> New Message (LivefeedComponent) [socket]'); // DEV TODO
      console.log(message);

      this.store.dispatch({
        type: ADD_MESSAGE,
        payload: <Message> {
          title: message.message + (Math.random() * 1000).toFixed(0)
        }
      });
    });
  }

  onPingButton() {
    this._messageService.create({
      message: "PING !"
    });
  }
}
