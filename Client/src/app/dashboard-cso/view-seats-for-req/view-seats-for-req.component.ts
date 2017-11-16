import { Component, OnInit } from '@angular/core';
import { Request } from '../../shared/model/request';
import { AddFloorService } from '../../shared/services/add-floor.service';
import { RequestService } from "../../shared/services/request.service";
import { AddBuildingService } from "../../shared/services/add-building.service";
import { Router } from "@angular/router";
//importing third party libraries and Services


@Component({
  selector: 'view-seats-for-req',
  templateUrl: './view-seats-for-req.component.html'
  //   styleUrls: ['./view-seats-for-req.component.css']
})
export class ViewSeatsForReq implements OnInit {

  constructor(private floorService: AddFloorService, private requestService: RequestService,
    private router: Router,
    private addBuildingService: AddBuildingService
  ) {
  }
  token: any;
  requests: any[];
  bar: any;
  requestedFloor: any;
  selectedRequest: any;
  item: any;

  ngOnInit() {

  }
}