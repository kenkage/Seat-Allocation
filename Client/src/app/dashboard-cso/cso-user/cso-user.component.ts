import { Component, OnInit } from '@angular/core';
import { Request } from '../../shared/model/request';
import { AddFloorService } from '../../shared/services/add-floor.service';
import { RequestService } from "../../shared/services/request.service";
import { AddBuildingService } from "../../shared/services/add-building.service";
import { RequestTransactionService } from "../../shared/services/request-transaction.service";
import { Router } from "@angular/router";
//importing third party libraries and Services


@Component({
  selector: 'app-cso-user',
  templateUrl: './cso-user.component.html',
  styleUrls: ['./cso-user.component.css']
})
export class CsoUserComponent implements OnInit {

  constructor(private floorService: AddFloorService, private requestService: RequestService,
    private router: Router, private requestTransactionService: RequestTransactionService,
    private addBuildingService: AddBuildingService, private route: Router
  ) { }//declaring variables for dependency injection
  requests: any[];
  requestTransaction: any = {};
  error: any;

  ngOnInit() { //fetch all the approved for a cso user by cso emp code requests.
    this.requestService.getPendingRequests(54707).subscribe(requests => {
      if (requests.length == 0) {
        this.error = 'yes';
      }
      else
        this.requests = requests

    },
      error => {
        this.error = 'yes';//if some error occur error msg should display
      }
    );
  }

  onReject(request) {
    //setting the requestTransaction properties for transaction management
    this.requestTransaction.transactor = "1";
    this.requestTransaction.typeOfTransaction = "rejection";
    this.requestTransaction.requestId = request.requestId;
    this.requestTransaction.status = "rejected";
    this.requestTransaction.noOfseats = 0;
    this.requestTransaction.buildingCode = request.buildingCode;

    this.requestTransactionService.onRejection(this.requestTransaction).subscribe((result) => {
      alert("Request Is Rejected");
      this.requests.splice((this.requests.indexOf(request)), 1);
      this.router.navigate(['/app-dashboard-cso/app-cso-user']);
    }
      ,
      error => {
        alert("Something Went Wrong. Please Try Again Later");
      });
  }

}