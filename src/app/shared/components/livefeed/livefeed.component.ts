import { Component, OnInit } from '@angular/core';
import { MessageService } from './../../services/api/message.service';

interface TinyMessage {
  title: string;
  description?: string;
  image?: any;
}

@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.component.html',
  styleUrls: ['./livefeed.component.scss'],
  providers: [ MessageService ]
})
export class LivefeedComponent implements OnInit {
  public messages: Array<Object> = [];

  constructor(
    private _messageService: MessageService,
  ) { }

  ngOnInit() {
    this._messageService.on('created', message => {
      console.info('> New Message (LivefeedComponent) [socket]'); // DEV TODO
      console.log(message);

      this.messages.push(<TinyMessage>{
        title: message.message
      })
    });
  }

  onPingButton() {
    this._messageService.create({
      message: "PING !"
    });
  }
}
