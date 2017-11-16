import { Component, OnInit,Input } from '@angular/core';
import { Building } from '../../shared/model/building';
import { LocationStructureService } from '../../shared/services/location-structure.service';
import { AddBuildingService } from '../../shared/services/add-building.service';

@Component({
	selector: 'app-update-building',
	templateUrl: './update-building.component.html',
	styleUrls: ['./update-building.component.css']
})
export class UpdateBuildingComponent implements OnInit {

	model = new Building( '', '','',null);
	constructor(
		private locationService:LocationStructureService,
		private buildingService:AddBuildingService
		) { }
	@Input() building: any;
	sum:any;
	locationseats:any;
	ngOnInit() {
		this.getsum();
		this.model = new Building( '', '','',null);
		this.model.totalSeats=this.building.totalSeats
		this.model.buildingName=this.building.buildingName
		this.model.buildingCode=this.building.buildingCode

	}
	submitted = false;
	onSubmit() { this.submitted = true; }
	getlocation(){
		this.locationService.getLocationNamebyId(this.building.locationCode)
		.subscribe((val)=>{
			this.locationseats=val.totalSeats;
		})

	}
	getsum(){
		this.sum=0;
		this.buildingService.getAll()
		.subscribe((data)=>{
			data.forEach((m)=>{
				this.sum=this.sum+m.totalSeats;
				this.getlocation();
			})
		})
	}
	updateBuilding(updatedbuilding:any){
		let temp=this.locationseats-this.sum;
		if(temp>updatedbuilding.totalSeats)
		{
		let id=this.building.buildingCode;
		updatedbuilding.locationCode=this.building.locationCode;
		this.buildingService.updateBuildingData(id,updatedbuilding);   
		alert("updated successfully");
	}
	else{
		alert("Entered seats are exceeds total location seats");
	}

	}

}