import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ChatService {

  messages: Subject<any>;

  constructor(
    private ws: WebsocketService 
  ) { 
    this.messages = <Subject<any>>ws
      .connect()
      .map((response: any): any => {
        return response;
      })
  }

  sendMsg(msg) {
    this.messages.next(msg);
  }

}
