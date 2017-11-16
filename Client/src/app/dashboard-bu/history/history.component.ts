import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../shared/services/request.service';
import { Request } from '../../shared/model/request';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryBusinessUserComponent implements OnInit {

  //injecting requestService
  constructor(private requestService: RequestService) { }
  userCode = 12345;
  history:any=[];
  requestvariable: Request;
  requests: Request[];
  locations: Location[];
  //this will get all the history logs for that particular Employee
  ngOnInit() {
    this.requestService.getHistoryLogs(this.userCode)
      .subscribe(requests => {
      this.requests = requests;
      });
  }

  //business user can view transaction
  onViewTransaction(requestId:any){
    this.requestService.getRequestTransaction(requestId)
    .subscribe(history=>{
      this.history=history;
    });
    
  }
}