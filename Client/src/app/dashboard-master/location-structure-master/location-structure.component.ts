import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//importing third party libraries and Services
import { AddLocation } from '../../shared/model/location-structure';
import { LocationStructureService } from '../../shared/services/location-structure.service';

@Component({
  selector: 'location-structure',
  templateUrl: './location-structure.component.html',
  styleUrls: ['./location-structure.component.css']
})
export class LocationStructureComponent implements OnInit {
  //Injecting service
  constructor(
    private locationService: LocationStructureService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.model = new AddLocation('', null, '', 0, '');
  }

  model = new AddLocation('', null, '', 0, '');

  submitted = false;

  onSubmit() { this.submitted = true; }

  addLocation(location: any) {
    location.status = 'deactive';
    this.locationService.add(location);
    alert("sucessfully added");

  }


}
