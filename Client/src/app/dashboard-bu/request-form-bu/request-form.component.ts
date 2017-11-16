//importing third party libraries and Services
import { Component, OnInit } from '@angular/core';
import { Request } from '../../shared/model/request';
import { ApprovingAuthorityService } from "../../shared/services/approving-authority.service";
import { AddBuildingService } from '../../shared/services/add-building.service';
import { LocationStructureService } from '../../shared/services/location-structure.service'
import { AddFloorService } from '../../shared/services/add-floor.service';
import { CcCodeService } from "../../shared/services/cc-code.service";
import { EntityService } from "../../shared/services/entity.service";
import { RequestService } from "../../shared/services/request.service";
import { Router } from "@angular/router";

@Component({
  selector: 'request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css'],
})
export class RequestFormComponent implements OnInit {
  locations: any[];
  buildings: any[];
  building: any;
  floors: any[];
  ccCodes: any[];
  entities: any[];
  approvingAuthority: any[];
  modal: any;
  model = new Request('', null, null, null, null, null, '', null, null, null, null, null, null);
  public msg: string;
   totalSeats:number=0;

  constructor(
    private locationService: LocationStructureService,
    private buildingService: AddBuildingService,
    private floorService: AddFloorService,
    private requestService: RequestService,
    private ccCodeService: CcCodeService,
    private entityService: EntityService,
    private approvingauthorityService: ApprovingAuthorityService,
    private route: Router,


  ) { }
  //this will call the location, building, code and entity service
  ngOnInit() {
    this.locationService.getLocationName().subscribe(locations => {
      this.locations = locations;
      this.buildingService.getBuildingName(21)
        .subscribe(buildings => {
          this.buildings = buildings;
          this.ccCodeService.get().subscribe(ccCode => {
            this.ccCodes = ccCode
            this.entityService.get().subscribe(entities => {
              this.entities = entities
              this.approvingauthorityService.getAuthority()
                .subscribe(approvingAuthority => {
                  this.approvingAuthority = approvingAuthority;

                });
            });
          });
        });
    });
  }
  submitted = false;

  onSubmit() { this.submitted = true; }

  //select building according to building Code
  selectBuilding() {
    this.totalSeats =0 ;
    this.floorService.getFloors(this.model.buildingCode)
      .subscribe(building => {


        this.building = building;
        for(let f of building){          
          this.totalSeats += f.totalVacantSeats;
        }
      
      });
  }

  //validating seats
  checkSeats() {
    if (this.model.noOfseats < 1) {
      alert('no of seats should be greator than zero');
    }
    if (this.model.noOfseats > this.totalSeats) {
      alert('no of seats should be less than the capacity!');
      this.model.noOfseats=null;
      // this.cap = true ;
    }
  }

  //should navigate to dashboard-home
  navigateButton() {
    this.modal = null;
    this.route.navigate(['app-sidenav/app-history']);
  }

  //request add by Business User
  addRequest() {
    delete this.model.requestId;
    this.model.transactionList = null;
    delete this.model.requestedOn;
    this.model.requestedBy = '12345';
    this.model.currentAllocatedseats = 0;
    this.model.locationCode = 21;
    this.model.status = "pending";
    this.model.toDate = this.model.toDate + 'T00:00:00';
    this.requestService.post(this.model).subscribe(response => {
      this.msg = "Request Sent Successfully";
    }
      , error => {
        this.msg = "Something Went Wrong, Please Try Again";
      }
    );

    this.modal = 1;
  }
}
