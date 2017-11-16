import { Component, OnInit, Input } from '@angular/core';
import { AddLocation } from '../../shared/model/location-structure';
import { LocationStructureService } from '../../shared/services/location-structure.service';
import { AddBuildingService } from '../../shared/services/add-building.service';
//importing third party libraries and Services

@Component({
	selector: 'app-update-location',
	templateUrl: './update-location.component.html',
	styleUrls: ['./update-location.component.css']
})
export class UpdateLocationComponent implements OnInit {

	constructor(
		private locationService: LocationStructureService,
		private buildingService: AddBuildingService
	) { }
	@Input() location: any;
	building: any;
	sum: any;
	ngOnInit() {
		this.model = new AddLocation('', null, '', 0, '');
		this.getbuildingdata();
		this.model.TotalSeats = this.location.totalSeats
		this.model.csoOwner = this.location.csoOwner
		this.model.csoOwnerName = this.location.csoOwnerName
		this.model.locationName = this.location.locationName
	}
	getbuildingdata() {
		this.sum = 0;
		this.buildingService.getBuildingName(this.location.locationCode)
			.subscribe((value) => {
				this.building = value
				this.building.forEach((m) => {
					this.sum = this.sum + m.totalSeats;
				})
			})
	}
	model = new AddLocation('', null, '', 0, '');
	submitted = false;
	onSubmit() { this.submitted = true; }
	UpdateLocation(updatedlocation: any) {
		if (updatedlocation.status == '')
			updatedlocation.status = 'deactive';
		let id = this.location.locationCode;
		if (updatedlocation.TotalSeats >= this.sum) {
			this.locationService.update(id, updatedlocation);
			alert("updated successfully");

		}
		else
			alert("updated seats are more than total occupied seats");
	}
}

