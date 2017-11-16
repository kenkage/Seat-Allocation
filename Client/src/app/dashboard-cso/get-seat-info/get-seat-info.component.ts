import { Component, OnInit } from '@angular/core';
import { Request } from '../../shared/model/request';
import { RequestService } from "../../shared/services/request.service";
import { AddFloorService } from '../../shared/services/add-floor.service';
import { MOCKREQUESTS } from '../../../testing/mock-data';
import { ActivatedRoute } from "@angular/router";
import { ConfigFile } from '../../config';
//importing third party libraries and Services

@Component({
  selector: 'seat-info',
  templateUrl: './get-seat-info.component.html',
  styleUrls: ['./get-seat-info.component.css']
})
export class GetSeatInfo {
  title = 'app';
  floorDetails: any[];
  floors: any;
  request: any = {};
  requestId: any;
  reqFloorTrans: any = {};


  constructor(private addFloorService: AddFloorService, private requestService: RequestService, private route: ActivatedRoute) { };
  ngOnInit() {
    this.route.paramMap.subscribe(f => {
      this.requestService.getById(f.has('requestId') && f.get('requestId')).subscribe(request => {
        //Fetching All  Floor Request.
        this.request = request;
        this.addFloorService.getFloors(request.buildingCode).subscribe(floorDetails => {
          this.floorDetails = floorDetails //Calling GetFloors Method Of Addfloorservice

        });
      }

      );

    });



  }
  
  getFloor(floor: any)   //Fetching Floor Details
  {
    this.floors = floor;
  }
  onCloseAllocation() {      //Posting Approve details over server
    this.reqFloorTrans = this.floors.floorCode;
    this.reqFloorTrans.transactor = '1';
    this.reqFloorTrans.requestId = this.request.requestId;
    this.reqFloorTrans.typeOfTransaction = ConfigFile.keys.approved;
    // this.reqFloorTrans.noOfseats = 
  }

  onOpenAllocation() {

  }
}



