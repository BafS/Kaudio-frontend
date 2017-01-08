import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { RestService } from './../rest.service';
import { SocketService } from './../socket.service';
import { Message } from './../../models';
import { ActionTypes as MessagesActionTypes } from './../../reducers/messages';

@Injectable()
export class MessageService {
  private _socket;
  private _rest;

  public messages$: Observable<Message>;
  private messagesObserver: Observer<Message[]>;

  private _subscription;

  private _messages$: Observable<Message[]>;

  constructor(
    private _socketService: SocketService,
    private _restService: RestService,
    private _store: Store<any>
  ) {
    // TODO use socket only for feed ?
    this._rest = _restService.getService('messages');
    this._socket = _socketService.getService('messages');

    this._messages$ = _store.select(s => s.messages);

    // this.messages$ = new Observable(observer => this.messagesObserver = observer).share();
    // this._socket.on('created', message => this.dispatch(message.message));
    // this._subscription = this.observe('created').subscribe(); // TODO
  }

  find(query?: any) {
    return this._rest.find(query);
  }

  get(id: string, query: any) {
    return this._rest.get(id, query);
  }

  create(message: any) {
    // console.log('Create a new message ', message);
    // app.get('token')
    return this._socket.create(message);
  }

  remove(id: string, query: any) {
    return this._socket.remove(id, query);
  }

  public observe(trigger: string): Observable<any> {
    return new Observable(observer => {
      this._socket.on(trigger, data => {
        console.log('(message service) Got new message');
        observer.next(data);
      });
      return () => {
        console.log('(message service) Disconnect');
        // this._socket.disconnect();
      };
    });
  }
}
