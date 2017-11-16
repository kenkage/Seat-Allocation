import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '../../shared/model/location-structure';
import { AddBuildingService } from '../../shared/services/add-building.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
//importing third party libraries and Services

@Component({
	selector: 'app-building-home',
	templateUrl: './building-home.component.html',
	styleUrls: ['./building-home.component.css']
})
export class BuildingHomeComponent implements OnInit {

	constructor(private route: ActivatedRoute,
		private buildingService: AddBuildingService
	) { }
	temp1: any;

	images: string[] = [															//an array of building images
		'../../../assets/gurgaon.jpg',
		'../../../assets/tapasaya.jpg',
		'../../../assets/greater-noida-campus.jpg'
	];
	temp: any;
	buildingdata: Location[];                     //define array variable type of Location
	ngOnInit() {
		this.temp1 = undefined;                 //call location service method to get location data from the database
		this.locations();													//calling locations method
	}
	locations() {

		this.route.paramMap
			.switchMap((params: ParamMap) => this.buildingService.getBuildingName(+params.get('id')))   //call getBuildingName() of Building service
			.subscribe(hero => {
			this.buildingdata = hero
			});

	}
	close2()																		//this function auto-refresh the whole page
	{
		this.temp1 = undefined;
		this.locations();
	}
	increment1(i: any) {														//this function auto-refresh the modal
		this.temp1 = i;
	}
}

