import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    items: any;
    users: any;
    owner: any;

  constructor(
      private _httpService: HttpService,
      private _router: Router
  ) { }

  ngOnInit() {
    this.items = [];
    this.users = [];
    this.owner = '';
    this.getItems();
    this.getUsers();
  }
  getItems() {
    let obs = this._httpService.getItems();
    obs.subscribe(data => {
        this.items = data;
      });
  }

  getUsers() {
    let obs = this._httpService.getUsers();
    obs.subscribe(data => {
        this.users = data;
    })
  }

  assignItem(item_id) {
    let obs = this._httpService.assignItem(this.owner, item_id);
    obs.subscribe();
    this.owner = '';
    this.getItems();
  }

  toInfo(user) {
    this._router.navigate([`admin/memberinfo/${user._id}`]);
  }

  toEditor(id) {
    this._router.navigate([`admin/edit/${id}`]);
  }

 }