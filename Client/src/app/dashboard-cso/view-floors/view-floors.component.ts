import { Component, OnInit } from '@angular/core';
import { AddBuildingService } from "../../shared/services/add-building.service";
import { AddFloorService } from "../../shared/services/add-floor.service";
//importing third party libraries and Services

@Component({
  selector: 'app-view-floors',
  templateUrl: './view-floors.component.html',
  styleUrls: ['./view-floors.component.scss']
})
export class ViewFloorsComponent implements OnInit {
  private floors: any[];//Array for storing all floors
  private floors1: any[];//copy for filtering
  private searchItem: any;
  private buildings: any[];
  selectedBuilding: "Search Building";
  constructor(private buildingService: AddBuildingService,
    private floorservice: AddFloorService) { }//declare variables for dependency injection

  ngOnInit() {
    this.floorservice.getAll().subscribe(floors => {//get all the floors from the building

      this.floors = floors;
      this.floors1 = floors;
    });
  }

  search(): void {
    //filtering the floors by building name
    this.floors = this.floors1.filter(floor => {
      return floor.buildingStructures.buildingName.toUpperCase().indexOf(this.searchItem.toUpperCase().trim()) >= 0
    });
  }

}
