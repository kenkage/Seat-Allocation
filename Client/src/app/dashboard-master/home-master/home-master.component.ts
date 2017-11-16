import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '../../shared/model/location-structure';
import { LocationStructureService } from '../../shared/services/location-structure.service';
import { routerTransition } from '../../router.animations';
//importing third party libraries and Services


@Component({
	selector: 'app-home-master',
	templateUrl: './home-master.component.html',
	styleUrls: ['./home-master.component.css'],
	animations: [routerTransition()]

})
export class HomeMasterComponent implements OnInit {

	constructor(
		private router: Router,
		private locationService: LocationStructureService//make instance of LocationStructureService
	) { }

	images: string[] = [
		'../../../assets/gurgaon.jpg',
		'../../../assets/tapasaya.jpg',
		'../../../assets/greater-noida-campus.jpg',
		'../../../assets/SEZ unit-2.jpg',
		'../../../assets/Kolkata.jpg',
		'../../../assets/Bangalore.jpg',

	]
	temp: any;
	temp1: any;
	locationData: Location[];//define array variable type of Location
	ngOnInit() {
		this.temp = undefined;
		this.temp1 = undefined;
		this.locations();   //call location service method to get location data from the database
	}
	locations() {									//this function calls the locationservice to get location name
		this.locationService.getLocationName()
			.subscribe((data) => {
				this.locationData = data
			});
	}
	//for refresh modal
	increment(i: any) {
		this.temp = i;
	}
	//for refresh another modal
	increment1(i: any) {
		this.temp1 = i;
	}
	// navigate building home componenet to see buildings at particular location
	gotoDetail(value: any): void {
		// console.log(value.locationCode);
		this.router.navigate(['/app-dashboard-master/app-building-home', value.locationCode]);
	}
	//for closing modal
	close() {
		this.temp = undefined;
	}
	//closing anothher modal
	close1() {
		this.locations();
	}
	changeStatus(data: any) {
		if (data.status == 'Active') {
			data.status = 'deactive';
		}
		else if (data.status == 'deactive') {
			data.status = 'Active';
		}
		this.locationService.update(data.locationCode, data)
	}
	//close third modal and get updated list
	close2() {
		this.temp1 = undefined;
		this.locations();
	}
}
