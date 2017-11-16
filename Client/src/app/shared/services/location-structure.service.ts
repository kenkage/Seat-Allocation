import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { Location,AddLocation } from '../model/location-structure' ;
import {ConfigFile } from '../../config'
@Injectable()
export class LocationStructureService {
  token  = localStorage.getItem("token");
  headers =  new Headers({ 'Authorization': 'Bearer ' + this.token,'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers });
  constructor(private http:Http) { }

  private backUrl = ConfigFile.Url.locationUrl;
  

  getLocationName()
  {
    return this.http
    .get(this.backUrl,this.options)
    .map((response)=>response.json());
  }
  
  getLocationNamebyId(id:any)
  {
    return this.http
    .get(this.backUrl+'/'+id,this.options)
    .map((response)=>response.json());
  }
  add(location:AddLocation)  {
    return this.http
    .post(this.backUrl, location,this.options)
    .toPromise()
    .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  update(id:any,location:any)  {
    console.log(location);
    return this.http
    .put(this.backUrl+'/'+id, JSON.stringify(location),this.options)
 .toPromise()
    .catch(this.handleError);
 }
 

}
