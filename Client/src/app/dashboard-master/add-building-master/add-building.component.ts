
/*
AddBuildingComponent file have functionality to add new building at particular location.
It uses AddBuilding Service to add building and it also uses Location Service to get location data for validation purpose 
*/

//import all the components that will needed in this file
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Building } from '../../shared/model/building';
import { AddBuildingService } from '../../shared/services/add-building.service';
import { LocationStructureService } from '../../shared/services/location-structure.service'


@Component({
  selector: 'add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.css']
})
// class for add building
export class AddBuildingComponent implements OnInit {
  // inject building service and router module also
  constructor(
    private buildService: AddBuildingService,
    private router: Router
  ) { }
  //Intialize variable 
  temp: any;
  locations: any[];
  @Input() location: any;
  locationdata: any;
  model = new Building('', '', '', 0);
  sum = 0;
  ngOnInit() {
    this.sum = 0;
    //call method to get All building list
    this.getbuilding()
    // get building by its building code
    this.buildService.getBuildingName(this.location.locationCode)
      .subscribe((locations) => {
        this.locations = locations
        if (this.locations != null)
          this.locations.forEach((m) => this.sum = this.sum + m.totalSeats)
      });
    //intialize model variable
    this.model = new Building('', '', '', 0);
  }

  submitted = false;
  onSubmit() {
    this.submitted = true;
  }
  //Returns all building name
  getbuilding() {
    this.buildService.getAll()
      .subscribe((locationdata) => {
        this.locationdata = locationdata;
      })
  }
  //call add building function to add new building
  addBuilding() {
    this.model.locationCode = this.location.locationCode;
    if (this.locationdata != null) {
      this.temp = this.locationdata.find((m) => m.buildingCode == this.model.buildingCode);
    }

    //validation for new building Id
    if (this.temp) {
      alert("Given Building Code Already Exist");
    }
    else {
      if (this.model.totalSeats == 0) {
        alert("enter valid seat numbers");
      }
      else if (this.model.totalSeats <= this.location.totalSeats - this.sum) {
        this.buildService.addBuild(this.model);
        alert("Sucessfully added");
      }
      else {
        alert("you entered more seat");
      }
    }
  }
}
