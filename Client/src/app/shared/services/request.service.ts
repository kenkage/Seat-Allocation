import { Injectable } from '@angular/core'
import { } from "module";
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Request } from "../model/request";
import { Observable } from "rxjs";
import {ConfigFile } from '../../config'

@Injectable()
export class RequestService {
  token  = localStorage.getItem("token");
  headers =  new Headers({ 'Authorization': 'Bearer ' + this.token,'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) { }
  url = ConfigFile.Url.requestUrl;
  turl =ConfigFile.Url.transactionUrl ;
  

  //get all requests
  get() {
    return this.http
      .get(this.url,this.options)
      .map((Response) => Response.json());
  }
 getById(requestId){
  return this.http
  .get(this.url+'GetByID/'+requestId,this.options)
  .map((Response) => Response.json());
 }
  //get all request for particular employee code
  getByUserCode(userEmpCode) {
    return this.http
      .get(this.url + 'GetByRequestedBy/' + userEmpCode,this.options)
      .map((Response) => Response.json());
  }

  //it will get all the pending requests
  getPendingRequests(id) {
    return this.http.get(this.url + 'get/'+id,this.options).map((Response) => 
        Response.json()
      )
      .catch((error: any) => {//if there is an error in code
        return Observable.throw(error);//throwing the error, caller should handle this
      });
  }

  //request will be approved by cso
  onApprove(requestId, request: any) {
    return this.http.put(this.url + requestId, request, this.options)
      .map(response => response.json());
  }

  //it will reject the request.
  onRejection(requestId, request) {
    return this.http.put(this.url + requestId, request,this.options).map(response => response.json());
  }

  //get all requests for particular CC Code
  getRequestByCcCode(ccCode: any) {
    return this.http.get(this.url + 'GetByCcCode/' + ccCode,this.options)
      .map((Response) => Response.json());
  }

  //update the alloted seats.
  releaseSeats(ccCode, request) {
    this.http.put(this.url + ccCode, request,this.options);
  }

  //Showing History for all the requests
  getHistoryLogs(userCode: any) {
    return this.http.get(this.url + 'GetByUserCode/' + userCode,this.options)
      .map((Response) => Response.json());
  }

  //get transaction regarding the particular request
  getRequestTransaction(requestId: any) {
    return this.http.get(this.turl + requestId,this.options)
      .map((Response) => Response.json());
  }

  //add request of seats required by Business User
  post(request: Request) {
    return this.http.post(this.url, request, this.options)
      .map((Response) => {
        Response.json()
      })
      .catch((error: any) => {//if there is an error in code
        return Observable.throw(error);//throwing the error, caller should handle this
      });
  }
}

