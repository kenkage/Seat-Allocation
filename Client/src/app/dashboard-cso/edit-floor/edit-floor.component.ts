import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Router } from "@angular/router";
//importing third party libraries and Services
import { AddFloorService } from "../../shared/services/add-floor.service";
import { AddBuildingService } from "../../shared/services/add-building.service";
import { RequestService } from "../../shared/services/request.service";

@Component({
  selector: 'app-edit-floor',
  templateUrl: './edit-floor.component.html',
  styleUrls: ['./edit-floor.component.css']
})
export class EditFloorComponent implements OnInit {
  private building: any;
  private vacantSeatsInBuilding: any;
  private currentVacantSeats: any;
  msg: any;
  private model: any = { floorName: '', buildingCode: '', totalSeats: null, totalVacantSeats: null, openAllocatedSeats: null, openVacantSeats: null, closedAllocatedSeats: null, abvSeats: null };
  private copy: any = {};
  constructor(private route: ActivatedRoute, private floorService: AddFloorService,
    private buildingService: AddBuildingService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(f => {//getting values from route
      let totalVacantSeats = 0;
      this.floorService.getFloorsByFloorId(f.has('floorCode') && f.get('floorCode')).subscribe(floor => {//getting floors by floorid
        this.floorService.getAll().subscribe(floors => {
          let filteredfloors = floors.filter(b => { return b.buildingCode == floor.buildingCode });
          for (let f of filteredfloors) {//getting total seats occupied by all the floors of a building
            totalVacantSeats += f.totalSeats;
          }

          this.model = floor;
          this.copy.opVac = this.model.openVacantSeats;//copy for validation
          this.copy.abv = this.model.abvSeats;
          this.vacantSeatsInBuilding = this.model.buildingStructures.totalSeats - totalVacantSeats + this.model.totalVacantSeats;
          this.currentVacantSeats = this.vacantSeatsInBuilding;
        });

      });
    })
  }

  submitted = false;

  onSubmit() { this.submitted = true; }

  checkSeats() {//for validating the user don"t seats more than the seats available in the building
    if (this.vacantSeatsInBuilding < (this.model.openVacantSeats) || this.vacantSeatsInBuilding < (this.model.abvSeat)
      || this.vacantSeatsInBuilding < (this.model.openVacantSeats + this.model.abvSeats)) {
      alert("Number Of Seats Entered Are More Than Building Capacity");
      this.model.openVacantSeats = this.copy.opVac;
      this.model.abvSeats = this.copy.abv;
    }

    if (this.model.openVacantSeats < this.model.openAllocatedSeats || this.model.abv < this.model.closedAllocatedSeats) {
      alert("Cannot Decrease The Seats Below Allocated Seats");
      this.model.openVacantSeats = this.copy.openVacantSeats;
      this.model.abvSeats = this.copy.abvSeats;
    }
  }

  updateFloor() {

    let id = this.model.floorCode;//for setting the floorid that is to up
    this.model.totalSeats = this.model.openAllocatedSeats + this.model.openVacantSeats + this.model.abvSeats + this.model.closedAllocatedSeats;

    this.model.totalVacantSeats = this.model.openVacantSeats + this.model.abvSeats;
    this.floorService.updateFloors(id, this.model).subscribe(result => {
      this.msg = "Floor Updated Successfully!";
    },
      error => {
        this.msg = "Something Went Wrong, Please Try Again Later";
      }
    );
  }

  navigateButton() {
    this.router.navigate(['../app-dashboard-cso/view-floor']);//navigate to this route after the floor add request is fired
  }


}
