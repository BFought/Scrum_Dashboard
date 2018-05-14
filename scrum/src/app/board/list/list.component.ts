import { Component, OnInit } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listedList: any;
  workingList: any;
  testingList: any;
  completedList: any;
  specific: any;
  bug: any;

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.specific = {};
    this.bug = '';
    this.getItems();
  }

  getItems() {
    this.listedList = [];
    this.workingList = [];
    this.testingList = [];
    this.completedList = [];
    
    let obs = this._http.getUsersItems();

    obs.subscribe(data => {
      for(let item in data['items']) {
        switch(data['items'][item]['status']) {
          case 'Listed':
            this.listedList.push(data['items'][item]);
            break;
          case 'Listed(test-failed)':
            this.listedList.push(data['items'][item]);
            break;
          case 'Working':
            this.workingList.push(data['items'][item]);
            break;
          case 'Working(test-failed)':
            this.workingList.push(data['items'][item]);
            break;
          case 'Testing':
            this.testingList.push(data['items'][item]);
            break;
          case 'Completed':
            this.completedList.push(data['items'][item]);
            break;
          default:
            break;
        }
      }
    })
  }

  showDetails(id) {
    let obs = this._http.getItemById(id);
    obs.subscribe(data => {
      this.specific = data;
    })
  }

  updateStatus(status) {
    if(status == 'Listed(test-failed)') {
      status = 'Listed';
      this.specific.danger = true;
    }
    else if (status == 'Working(test-failed)') {
      status = 'Working';
      this.specific.danger = true;
    }
    let obs = this._http.updateStatus(this.specific._id, status, this.specific.danger);
    obs.subscribe();
    this.specific = {};
    this.getItems();
  }

  addBug(id) {
    let obs = this._http.addBug(id, this.bug);
    obs.subscribe();
    this.bug = '';
    this.getItems();
  }

  deleteItem(id) {
    if(confirm("Are you sure you want to remove?")) { 
      let obs = this._http.deleteItem(id);
      obs.subscribe();
      this.specific = {};
      this.getItems();
    }
  }

}
