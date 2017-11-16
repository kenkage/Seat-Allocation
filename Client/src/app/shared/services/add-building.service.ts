import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import{ConfigFile} from '../../Config'
import 'rxjs/add/operator/toPromise'
import { Building } from '../model/building';

@Injectable()
export class AddBuildingService {
  token  = localStorage.getItem("token");
  headers =  new Headers({ 'Authorization': 'Bearer ' + this.token,'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers });
  constructor(private http:Http) { }
  
    private backUrl = ConfigFile.Url.backUrl;
    private addUrl = ConfigFile.Url.addUrl;
    private buildUrl = ConfigFile.Url.buildUrl;
    

    //get all the buildings
    getAll()
    {
      return this.http
      .get(this.addUrl,this.options)
      .map((response)=>response.json());
    }
  
    //get building by its location Code
    getBuildingName(locationCode)
    {
      return this.http
      .get(this.buildUrl+locationCode,this.options)
      .map((response)=>response.json());
    }
   
//get building by building Code
    getBuildingByBuildingCode(buildingCode){
      return this.http
      .get(this.buildUrl+"/get/"+buildingCode,this.options)
      .map((response)=>response.json());
    }
  
    //add building 
    addBuild(building:Building)  {
      return this.http
      .post(this.addUrl, building,this.options)
      .toPromise()
      .catch(this.handleError);
    }
   
    //get building by cso ownercode
    getByCsoOwner(csoOwnerCode){
      return this.http
      .get(this.addUrl+"/getbycsoowner/"+csoOwnerCode,this.options)
      .map((response)=>response.json());
    }

    //get building by buildingCode
    getBuilding(buildingCode){
      return this.http
      .get(this.addUrl+"/get/"+buildingCode,this.options)
      .map((response)=>response.json());
    }

    //update building data 
    updateBuildingData(id:any,building:Building){
      return this.http
      .put(this.addUrl+'/'+id, building,this.options)
      .toPromise()
      .catch(this.handleError);
    }

    //error handler
    private handleError(error: any): Promise<any> {
      return Promise.reject(error.message || error);
    }
}
