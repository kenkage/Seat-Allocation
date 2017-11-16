/*this File get all the rejected anf forwarded request from service .We have to import and 
inject ApprovingAuthority Service
*/
import { Component, OnInit } from '@angular/core';
import { ApprovingAuthorityService } from "../../shared/services/approving-authority.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-authority-history',
  templateUrl: './authority-history.component.html',
  styleUrls: ['./authority-history.component.css']
})
export class AuthorityHistoryComponent implements OnInit {

  constructor(private approvingAuthorityService: ApprovingAuthorityService, private router: Router) { }
  BuildingName: string
  data2: Array<any>;
  id: string = '50042937'
  ngOnInit() {
    this.getData();
  }

  // for getting all forwarded and rejected request from service
  getData() {
    this.approvingAuthorityService.getHistory(this.id).subscribe(data2 => {
      this.BuildingName = data2[0].buildingStructures.buildingName;
      this.data2 = data2;
    },
      ((error) => {
        if (error.status == 500 || error.status == 0 || error.status == 404) //if error occurs it will redirect to the error page
        {
          this.router.navigate(['/app-dashboard-authority/app-error-page']);
        }
      }
      ));
  }
}
