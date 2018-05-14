import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any;
  errors: any;
  passconf: any;

  constructor(
    private _router: Router,
    private _http: HttpService
  ) { }

  ngOnInit() {
    this.user = {name: '', email: '', password: ''};
    this.passconf = '';
    this.errors = [];
  }

  registerUser() {
    let obs = this._http.registerUser(this.user);
    obs.subscribe(data => {
      if(data['errors']) {
        this.errors = data['errors'];
      }
      else {
        this._router.navigate(['board/list']);
      }
    })
  }

}
