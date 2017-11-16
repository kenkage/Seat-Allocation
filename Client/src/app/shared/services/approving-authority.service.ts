import { Injectable } from '@angular/core';
import {HttpModule,Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import{ConfigFile} from '../../Config'
import { Observable } from "rxjs/Observable";
@Injectable()
export class ApprovingAuthorityService {
  token  = localStorage.getItem("token");
  headers =  new Headers({ 'Authorization': 'Bearer ' + this.token,'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers });
    
  getRequestUrl:string=ConfigFile.Url.requestByUrl;
  getHistoryUrl:string=ConfigFile.Url.historyAuthorityUrl;
  postRequestUrl:string=ConfigFile.Url.requestUrl;
  authUrl:string=ConfigFile.Url.authorityUrl;
  data:any;
  data1:Array<any>;
  
  constructor(private http:Http) { }

//get request by authority code
getRequest(id)
{
return this.http.get(this.getRequestUrl + "/" +id,this.options).map((res:Response)=>res.json()).catch((error:any)=>{
 
    return Observable.throw(error);
  
} );
}

//will get of the requests by authority code
getHistory(id)
{
return this.http.get(this.getHistoryUrl + "/" +id,this.options).map((res:Response)=>res.json()).catch((error:any)=>{
  
     return Observable.throw(error);})
}

//will fire put request to the api for update
postRequest(id:any,item:any){
  return this.http.put(this.postRequestUrl+id ,item,this.options);
}

//get all authorities
getAuthority(){ 
  return this.http.get(this.authUrl,this.options).map((res:Response)=>res.json());
  }
}