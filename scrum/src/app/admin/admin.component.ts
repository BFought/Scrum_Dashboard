import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    online: any;
    offline: any;
    message: any;
    messages: any;
    user_id: any;

  constructor(
      private _httpService: HttpService,
      private _router: Router,
      private _route: ActivatedRoute,
      private _chat: ChatService
  ) { }

  ngOnInit() {
      this.message = "";
      this.user_id = "";
    //   this.subToChat();
  }
  getUsers(){
      this.online = [];
      this.offline = [];
      let obs = this._httpService.getUsers();
      obs.subscribe(data => {
          for(let x in data) {
              if(data[x]['online'] == "true") {
                  this.online.push(data[x]);
              }
              else{
                  this.offline.push(data[x]);
              }
          }
      });
  }

  logOut() {
    this._httpService.logOut().subscribe;
    this._router.navigate(['']);
  }

  sendMessage() {
      this._chat.sendMsg(this.message);
      this.message = "";
    //   this.subToChat();
  }

//   subToChat() {
//       this._chat.messages.subscribe(msg => {
//           this.messages = msg;
//       })
//   }

}
