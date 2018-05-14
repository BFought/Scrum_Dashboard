import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memberinfo',
  templateUrl: './memberinfo.component.html',
  styleUrls: ['./memberinfo.component.css']
})
export class MemberinfoComponent implements OnInit {
  user: any;
  id: any;

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.user = {};
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    this.getUser();
  }

  getUser() {
    let obs = this._http.getUserById(this.id);
    obs.subscribe(data => this.user = data);
  }
}
