import {Injectable} from '@angular/core'
import {ConfigFile } from '../../config'
import { Http,Headers,Response,RequestOptions } from '@angular/http' ;

@Injectable() 
export class EntityService {
    token  = localStorage.getItem("token");
    headers =  new Headers({ 'Authorization': 'Bearer ' + this.token,'Content-Type': 'application/json'});
    options = new RequestOptions({ headers: this.headers });
     constructor(private http:Http) { }
     url=ConfigFile.Url.entityUrl;

     get(){
        return this.http
        .get(this.url,this.options)
        .map((Response)=>Response.json());
     }
}