
/*This module is for approving authority.We have to import and inject  the ApprovingAuthorityService*/
import { Component, OnInit, Output, OnChanges } from '@angular/core';
import { ApprovingAuthorityService } from '../../shared/services/approving-authority.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
  constructor(private approvingAuthorityService: ApprovingAuthorityService, private router: Router) { }
  BuildingName: string
  data2: Array<any>;
  id: string = '50042937'

  ngOnInit() {

    this.getData();
  }

  //getting all pending request from service
  getData() {
    this.approvingAuthorityService.getRequest(this.id).subscribe(data2 => {
      this.BuildingName = data2[0].buildingStructures.buildingName
      this.data2 = data2;
    }, ((error) => {//if error occur
      if (error.status == 0 || error.status == 404 || error.status == 500) {
        this.router.navigate(['/app-dashboard-authority/app-error-page']);
      }

    }))
  }
  //for approving the request and the status of request got  changed from pending to forwarded  
  acceptRequest(item: any) {
    item.status = "forwarded";
    item.justification = "accepted";

    this.data2.splice((this.data2.indexOf(item)), 1);
    this.approvingAuthorityService.postRequest(item.requestId, item).subscribe(data => { }
      , error => {
        if (error.status == 404 || error.status == 500 || error.status == 0)   //if error occurs  it will redirect to error page 
        {

          this.router.navigate(['app-dashboard-authority/app-error-page'])
        }
      });
  }
  //for rejecting the request and  the status of request got changed from pending to rejected
  rejectRequest(item: any, temp: any) {
    this.sendReason(item, temp);
    item.status = "rejected";
    this.data2.splice((this.data2.indexOf(item)), 1);
    this.approvingAuthorityService.postRequest(item.requestId, item).subscribe(data => { }
      , error => {
        if (error.status == 404 || error.status == 500 || error.status == 0) //if error occurs  it will redirect to error page 
        {
          this.router.navigate(['app-dashboard-authority/app-error-page'])
        }
      });
  }
  //for changing the justification field of request from blank to the temp value.
  sendReason(item: any, temp: any) {
    item.justification = temp;
  }

}