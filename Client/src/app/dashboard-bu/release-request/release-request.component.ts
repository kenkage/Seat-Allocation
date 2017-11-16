//importing third party libraries and Services
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../shared/services/request.service'
import { RequestTransactionService } from "../../shared/services/request-transaction.service";

@Component({
  selector: 'app-release-request',
  templateUrl: './release-request.component.html',
  styleUrls: ['./release-request.component.css']
})
export class ReleaseRequestComponent implements OnInit {
  requests: any[];
  showModal: boolean = false;
  releaseRequest: any = {};
  ccCode = 100;
  model: any;
  noOfseats: any;
  seats: any;

  //injecting service from shared folder
  constructor(private requestService: RequestService, private requestTransactionService: RequestTransactionService) { }

  ngOnInit() {
    this.requestService.getRequestByCcCode(this.ccCode)
      .subscribe(requests => {
      this.requests = requests

      });
  }

  //This function will release the requested seats
  releaseSeats(request) {
    delete request.buildingStructures;
    delete request.locationStructures;
    console.log(request);
    this.releaseRequest.requestId = request.requestId;
    this.releaseRequest.buildingCode = request.buildingCode;
    this.releaseRequest.transactor = request.requestedBy;
    this.releaseRequest.currentAllocatedSeats = request.currentAllocatedseats - this.seats;
    this.releaseRequest.NoOfseats = this.seats;
    this.releaseRequest.typeOfTransaction = 'release';

    this.requestTransactionService.release(this.releaseRequest).subscribe(result => {
      alert("Seats Released Successfully");
      this.requests.splice((this.requests.indexOf(request),1));
    },
      error => {
        alert("Sorry Something Went Wrong!");

      }
    )

  }


}

