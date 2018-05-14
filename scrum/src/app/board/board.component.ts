import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  user_id: any;
  user: any;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _http: HttpService
  ) {}

  ngOnInit() {
    this.user = {};
    this.getUserId();
  }

  logOut() {
    let obs = this._http.logOut();
    obs.subscribe();
    this._router.navigate(['']);
  }

  getUserId() {
    let obs = this._http.getUserId();

    obs.subscribe(data => {
        this.user_id = data['id'];
        this.getUser();
    })
  }
  
  getUser() {
    let obs = this._http.getUserById(this.user_id);
    
    obs.subscribe(data => {
      this.user = data;
      this._router.navigate([`board/list`]);
    })
    
  }

  toAdmin() {
    this._router.navigate(['admin/dashboard']);
  }

}
