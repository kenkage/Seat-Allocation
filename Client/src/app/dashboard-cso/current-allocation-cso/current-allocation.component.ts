import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
//importing third party libraries and Services
import { LocationStructureService } from '../../shared/services/location-structure.service'
import { AddBuildingService } from '../../shared/services/add-building.service';
import { AddFloorService } from '../../shared/services/add-floor.service';

@Component({
 selector: 'app-current-allocation',
 templateUrl: './current-allocation.component.html',
 styleUrls: ['./current-allocation.component.css'],
 providers:[AddFloorService]
})
export class CurrentAllocationComponent implements OnInit {
floor:any;
location:any;
locationname:any;
buildings:any;
floors:any;
token:any;
data:number[]=[];
data1:number[]=[];

 constructor(
   private router: Router,
   private BuildService: AddBuildingService,
   private locationService:LocationStructureService,
   private floorService :AddFloorService ) { }

 ngOnInit() {
   this.locationService.getLocationName().subscribe(locations=>{this.location=locations;  
  }) ;
 }

public barChartOptions:any = {
   scaleShowVerticalLines: true,
   responsive: true
 };
 public barChartLabels:string[] = [];
 public barChartType:string = 'bar';
 public barChartLegend:boolean = true;
 public barChartData :any[]=[];


searchData(){
 this.data=[];
 this.data1=[];
 this.barChartData=[];
 this.barChartLabels.splice(0, this.barChartLabels.length);
for(var i=0;i<this.floors.length;i++)
{
this.barChartLabels.push("floor "+this.floors[i].floorName);
this.data.push(this.floors[i].abvSeats);
this.data1.push(this.floors[i].openVacantSeats);
}
this.token=1;
this.barChartData.push(
 {
   data:this.data,
   label:'Closed Seat',
 },
 {
   data:this.data1,
   label:'Vacant Seat',
 }
 )

}

getfloor(){
console.log(this.locationname);
this.BuildService.getBuildingName(this.locationname)
   .subscribe(buildings=>{this.buildings=buildings;
   }) ;
}


getroom(){   this.floorService.getFloors(this.floor)
.subscribe(floors=>{this.floors=floors;       console.log(this.floors);
this.searchData();     }); }

 public chartClicked(e:any):void {
   console.log(e);
    }

}

