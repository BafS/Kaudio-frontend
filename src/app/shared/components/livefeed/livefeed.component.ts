import { Component, OnInit } from '@angular/core';
import { MessageService } from './../../services/api/message.service';

@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.component.html',
  styleUrls: ['./livefeed.component.scss'],
  providers: [ MessageService ]
})
export class LivefeedComponent implements OnInit {

  constructor(
    private _messageService: MessageService,
  ) { }

  ngOnInit() {
    this._messageService.on('created', function (message) {
      console.log('-- New Message 2 [socket] --'); // DEV TODO
      console.log(message);
    });
  }

  onPingButton() {
    this._messageService.create({
      message: "PING !"
    });
  }
}
