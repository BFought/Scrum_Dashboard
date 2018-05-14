import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {}


// ---------------Users----------------------
  registerUser(user) {
    return this._http.post('/users/reg', user);
  }

  createUser(user) {
    return this._http.post('/users/create', user);
  }

  loginUser(email, password) {
    return this._http.post('/users/login', {email, password});
  }

  getUsers() {
    return this._http.get('/users');
  }

  getUserById(id) {
    return this._http.get(`/user/${id}`);
  }

  logOut() {
    return this._http.get('/users/logout');
  }

  changerUserStatus(id, status) {
    return this._http.put(`/users/status/${id}`, status)
  }

  getUserId() {
    return this._http.get('/users/getid');
  }


// ---------------Items----------------------
  getItems() {
    return this._http.get('/items');
  }

  getUsersItems() {
    return this._http.get(`/items/users`);
  }

  getItemById(id) {
    return this._http.get(`/items/${id}`);
  }

  editItem(id, item) {
    return this._http.put(`/items/${id}`, item);
  }

  createItem(item) {
    return this._http.post('/items', item);
  }

  addBug(id, bug) {
    return this._http.put(`/items/bug/${id}`, {bug});
  }

  assignItem(user_id, item_id) {
    return this._http.put(`/users/${user_id}`, {item: item_id});
  }

  updateStatus(id, status, danger) {
    return this._http.put(`/items/${id}`, {status, danger});
  }

  deleteItem(id) {
    return this._http.delete(`/items/${id}`);
  }

}
