import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  errors: any;

  constructor(
    private _router: Router,
    private _http: HttpService
  ) { }

  ngOnInit() {
    this.user = {email: '', password: ''};
    this.errors = '';
  }

  loginUser() {
    let obs = this._http.loginUser(this.user.email, this.user.password)
    obs.subscribe(data => {
      if(data['errors']) {
        this.errors = data['errors'];
      }
      else {
        if(data['status'] == "Admin") {
          this._router.navigate([`admin/dashboard`]);
        }
        else {
          this._router.navigate([`board/list`]);
        }
      }
    })
  }

}
