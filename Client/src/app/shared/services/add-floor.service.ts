import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ConfigFile } from '../../Config'
import { Floor } from '../model/floor';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs'

@Injectable()
export class AddFloorService {
  token = localStorage.getItem("token");
  headers = new Headers({ 'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) { }

  private floorUrl = ConfigFile.Url.floorUrl;

  //will get all the floors from the floor table
  getAll() {
    return this.http
      .get(this.floorUrl, this.options)
      .map((Response) => Response.json());
  }

  //will add floor
  addFloor(floor) {
    return this.http
      .post(this.floorUrl, floor, this.options)
      .map((Response) => Response.json())
      .catch((error: any) => {//if there is an error in code
        return Observable.throw(error);//throwing the error, caller should handle this
      });

  }

  //will get floor by its buildingCode
  getFloors(buildingCode: any) {
    return this.http
      .get(this.floorUrl + 'GetByBuildingCode/' + buildingCode, this.options)

      .map((Response) => Response.json()
      );
  }

  //getting floor by floorCode
  getFloorsByFloorId(floorCode) {
    return this.http
      .get(this.floorUrl + 'Get/' + floorCode, this.options)
      .map((Response) => Response.json());
  }

  //will update floor 
  updateFloors(floorCode, floor) {
    return this.http.put(this.floorUrl + floorCode, floor, this.options);
  }
}