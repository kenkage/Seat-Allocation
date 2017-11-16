import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { LocationStructureService } from '../../shared/services/location-structure.service';
import {  HttpModule } from '@angular/http';
import{Router} from '@angular/router';
import { RouterLinkStubDirective } from '../../../testing/router-stubs';// router link stub for testting
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { AddBuildingService } from '../../shared/services/add-building.service';

import { UpdateBuildingComponent } from './update-building.component';
import { MOCKLOCATIONS } from '../../../testing/mock-data';

describe('UpdateBuildingComponent', () => {
  let component: UpdateBuildingComponent;
  let fixture: ComponentFixture<UpdateBuildingComponent>;
let buildingService:AddBuildingService;
let spy,spy2,spy3,spy4;
let de:DebugElement;
let el:HTMLInputElement;
let locationService;
//mock data 
const data=[
  {name:'nishant',id:12,locationCode:"245",locationName:'agra',csoOwner:12,csoOwnerName:"ram"},
  {name:'nishant',id:12,locationCode:"246",locationName:'pune',csoOwner:13,csoOwnerName:"shyam"}
]
// router stub for testing
const buildingdata={
buildingCode:"990099",
buildingName:"kaka",
floorStructures:null,
locationCode:36,

status:"deactive",
totalSeats:89
}
class RouterStub {
  navigateByUrl(url: string) { return url; }
}
beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports:      [ FormsModule,HttpModule],
    declarations: [ UpdateBuildingComponent,RouterLinkStubDirective ],
    schemas:      [ NO_ERRORS_SCHEMA ],
    providers: [
      LocationStructureService,
      AddBuildingService,
      { provide: Router,      useClass: RouterStub }
    ]    
  })
  .compileComponents();
}));
  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBuildingComponent);
    component = fixture.componentInstance;
    buildingService=fixture.debugElement.injector.get(AddBuildingService);
    locationService=fixture.debugElement.injector.get(LocationStructureService);
  spy2 = spyOn(buildingService, 'updateBuildingData')//spy updateBuildingData() method of buildingservices
  .and.returnValue(Observable.of(data));
  spy3 = spyOn(buildingService, 'getAll').and.returnValue(Observable.of(data));//spy on getAll()
  spy4 = spyOn(locationService, 'getLocationNamebyId').and.returnValue(Observable.of(MOCKLOCATIONS));
   component.building=buildingdata;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add building after calling Building service from ngonit add method', () => {
  fixture.detectChanges();
 
  fixture.detectChanges(); // update view with data
  de = fixture.debugElement.query(By.css('.btn'));
  el = de.nativeElement;
  el.click();
   expect(spy2.calls.any()).toBe(false);//check whether call is made or not
   //<input _ngcontent-c2 class="form-control ng-untouched ng-pristine ng-valid" id="buildingName" name="buildingName" required type="text" ng-reflect-required ng-reflect-name="buildingName" ng-reflect-model="kaka">
 
});
   it('should have values at building name', () => {
  fixture.detectChanges();
 
  fixture.detectChanges(); // update view with data
  de = fixture.debugElement.query(By.css('#buildingName'));
  el = de.nativeElement;
  expect(el.attributes["ng-reflect-model"].value).toBe("kaka");
});

   it('should have values at total seats', () => {
  fixture.detectChanges();
 
  fixture.detectChanges(); // update view with data
  de = fixture.debugElement.query(By.css('#totalSeats'));
  el = de.nativeElement;
  expect(el.attributes["ng-reflect-model"].value).toBe("89");
});
   it('should check onSubmit', () => {
  component.submitted=false;
  component.onSubmit();
  expect(component.submitted).toBe(true);
});



it('SHOULD SHOW ALERT MESSAGE WITH "SUCCESSFULLY ADDED" ', () => {
 
    component.model.totalSeats=4;
    component.locationseats=10;
    component.sum=2;
spyOn(window,'alert');
    //let temp=component.locationseats- component.sum;
    fixture.detectChanges(); // UPDATE VIEW WITH DATA
  let  de = fixture.debugElement.query(By.css('#buttonUpdate')) 
 let  el = de.nativeElement;
 fixture.detectChanges();
 el.click();
    
    expect(window.alert).toHaveBeenCalledWith('updated successfully');
   
});
 });  


// it('should be created', () => {
//   expect(component).toBeTruthy();
// });

// it('should check onSubmit', () => {
//   component.submitted=false;
//   component.onSubmit();
//   expect(component.submitted).toBe(true);
// });
// }); 