import { Component, OnInit } from '@angular/core';
import { AddBuildingService } from "../../shared/services/add-building.service";
import { AddFloorService } from "../../shared/services/add-floor.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-floor',
  templateUrl: './add-floor.component.html',
  styleUrls: ['./add-floor.component.css']
})
export class AddFloorComponent implements OnInit {
  //floor model
  model = { floorName: '', buildingCode: '', totalSeats: null, openVacantSeats: null, abvSeats: null, totalVacantSeats: null, openAllocatedSeats: 0, closedAllocatedSeats: 0 };
  constructor(private buildingService: AddBuildingService, private router: Router,
    private floorService: AddFloorService) { }//declaring the dependencies that will de injected later by angular
  private buildings: any;
  private selectedBuildingSeats: any;
  private modal: any;
  msg: any;//string that will be displayed to the user on successfull or unsuccessfull add of floor
  zeroSeats = '';
  ngOnInit() {
    //getting the buildings by csoowner empCode
    this.buildingService.getByCsoOwner(54707).subscribe(buildings => {

      this.buildings = buildings;
    });
  }
  submitted = false;

  onSubmit() { this.submitted = true; }

  selectBuilding() {//what will happen when cso select a floor
    let totalVacantSeats = 0; //storing the vacant seats in the selected building building
    //get all the floors
    this.floorService.getAll().subscribe(floors => {
      let filteredfloors = floors.filter(b => { return b.buildingCode == this.model.buildingCode });
      for (let f of filteredfloors) {
        totalVacantSeats += f.totalSeats;
      }

      this.model.totalSeats = this.buildings.find(b => b.buildingCode == this.model.buildingCode).totalSeats - totalVacantSeats;

      if (this.model.totalSeats <= 0) {

        //if vacant seats are zero user can't add the floor
        this.zeroSeats = 'zero';
      }
      else {

        this.zeroSeats = '';
        this.selectedBuildingSeats = this.model.totalSeats;
      }
    });

  }
  //will navigate to cso dashboard
  navigateButton() {
    this.router.navigate(['/app-dashboard-cso']);
  }

  //check if seats entered are greater rhan available seats
  checkSeats() {
  
    if (this.model.totalSeats < this.model.openVacantSeats || this.model.totalSeats < this.model.abvSeats || this.model.totalSeats < (this.model.openVacantSeats + this.model.abvSeats)) {
      alert("Number Of Seats Entered Are More Than Building Capacity");

    }



  }

  //will set some properties of the floor and call the addFloor of floor service
  addFloor() {
    this.model.totalSeats = this.model.openVacantSeats + this.model.abvSeats;
    this.model.totalVacantSeats = this.model.openVacantSeats + this.model.abvSeats;
    this.floorService.addFloor(this.model).subscribe(result => {
      this.msg = "Floor Added Successfully!";
    },
      error => {
        this.msg = "Something Went Wrong, Please Try Again Later";
      }
    )

  }
}
