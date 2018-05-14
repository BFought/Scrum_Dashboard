import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  item: any;
  errors: any;
  id: any;
  values: any;

  constructor(
    private _http: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.item = {title: '', description: ''}
    this.errors = [];
    this.id = '';
    this.values = [1,2,3,4,5];
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    this.getItemById();
  }

  getItemById() {
    let obs = this._http.getItemById(this.id);
    obs.subscribe(data => {
      this.item = data;
    })
  }

  editItem(id) {
    let obs = this._http.editItem(this.id, this.item);
    obs.subscribe();
    this._router.navigate(['admin/dashboard']);
  }

  toAdmin() {
    this._router.navigate(['admin/dashboard'])
  }

}
