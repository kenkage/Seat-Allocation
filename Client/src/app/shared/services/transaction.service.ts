import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs'
import {ConfigFile } from '../../config'

@Injectable()
export class TransactionService {
  token  = localStorage.getItem("token");
  headers =  new Headers({ 'Authorization': 'Bearer ' + this.token,'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers });
  private url =ConfigFile.Url.transactionUrl ;
  constructor(private http:Http) { }
  get(){
    return this.http
    .get(this.url,this.options)
    .map((Response)=>Response.json());
 }

}