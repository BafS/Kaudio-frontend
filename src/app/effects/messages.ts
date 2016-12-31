import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';

import { MessageService } from '../services/api/message.service';
import { SocketService } from '../services/socket.service';
import { ActionTypes } from '../reducers/messages';

@Injectable()
export class MessageEffects {
//   private

  constructor(
    // private _messageService: MessageService,
    // private _socketService: SocketService,
    private actions$: Actions
  ) {
    // this._socket.on('created', message => this.dispatch(message.message));
  }

//   this._socket.on('created', message => this.dispatch(message.message));

  // @Effect({ dispatch: false })
  // messages$: Observable<any> = this._messageService.observe('created');
  // Observable<any> = defer(() => {
  //   console.log('---->');
  //   return this._socketService.observe('created');
  // });

  // @Effect() message$ = this.actions$
  //     // Listen for the 'ADD_MESSAGE' action
  //     .ofType(ActionTypes.ADD_MESSAGE)
  //     // Map the payload into JSON to use as the request body
  //     .map(action => JSON.stringify(action.payload))
  //     .switchMap(payload => this.http.post('/auth', payload)
  //       // If successful, dispatch success action with result
  //       .map(res => ({ type: MessagesActionTypes.ADD_MESSAGE_SUCCESS, payload: res.json() }))
  //       // If request fails, dispatch failed action
  //       .catch(() => Observable.of({ type: 'LOGIN_FAILED' }))
  //     );
}
