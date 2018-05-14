import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-newmember',
  templateUrl: './newmember.component.html',
  styleUrls: ['./newmember.component.css']
})
export class NewmemberComponent implements OnInit {
  user: any;
  errors: any;

  constructor(
    private _router: Router,
    private _http: HttpService
  ) { }

  ngOnInit() {
    this.user = { name: "", email: "", password: ""};
    this.errors = [];
  }

  toHome() {
    this._router.navigate(['admin/dashboard']);
  }

  createUser() {
    let obs = this._http.createUser(this.user);
    obs.subscribe(data => {
      if(data['errors']) {
        this.errors = data['errors'];
      }
      else {
        this.user = { name: "", email: "", password: ""};
        this._router.navigate(['admin/dashboard']);
      }
    })
  }
}
