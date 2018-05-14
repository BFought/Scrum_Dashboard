import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  item: any;
  errors: any;

  constructor(
    private _http: HttpService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.item = {title: '', description: '', value: 0};
    this.errors = [];
  }

  createItem(value) {
    this.item.value = value
    let obs = this._http.createItem(this.item);
    obs.subscribe(data => {
      if(data['errors']) {
        this.errors = data['errors'];
      }
      else {
        this.item = {title: '', description: '', value: 0};
        this._router.navigate(['admin/dashboard']);
      }
    })
  }

  toAccess() {
    this._router.navigate(['admin/dashboard']);
  }

}
