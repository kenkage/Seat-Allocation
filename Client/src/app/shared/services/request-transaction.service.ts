import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs'

import { Location } from '../model/location-structure';

@Injectable()
export class RequestTransactionService {
  token  = localStorage.getItem("token");
  headers =  new Headers({ 'Authorization': 'Bearer ' + this.token,'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  private url = 'http://localhost:59360/api/RequestTransaction';


  onRejection(requestTransaction) {
    return this.http
      .post(this.url, requestTransaction, this.options)
      .map((Response) => {
        Response.json()

      })
      .catch((error: any) => {//if there is an error in code
        if (error.status === 500)
          return Observable.throw(error);//throwing the error, caller should handle this
      });
  }


  post(request: Request) {
    return this.http.post(this.url, request,this.options)
      .map((Response) => {
        Response.json()
      })
      .catch((error: any) => {//if there is an error in code
        return Observable.throw(error);//throwing the error, caller should handle this
      });
  }

  release(request) {
    return this.http.post(this.url+'/release', request,this.options)
      .map((Response) => {
        Response.json()
      })
      .catch((error: any) => {//if there is an error in code
        return Observable.throw(error);//throwing the error, caller should handle this
      });
  }

}
