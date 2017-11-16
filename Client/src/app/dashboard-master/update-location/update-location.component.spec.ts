import { UpdateLocationComponent } from './update-location.component';
import { async, ComponentFixture, TestBed,fakeAsync,tick } from '@angular/core/testing';
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

describe('UpdateLocationComponent', () => {
  let component: UpdateLocationComponent;
  let fixture: ComponentFixture<UpdateLocationComponent>;
let locationService:LocationStructureService;
let buildingservice:AddBuildingService;
let spy,spy2,spy3,spy4;
let de:DebugElement;
let el:HTMLInputElement;
//mock data 
const data=[
  {name:'nishant',id:12,locationCode:"245",locationName:'agra',csoOwner:12,csoOwnerName:"ram"},
  {name:'nishant',id:12,locationCode:"246",locationName:'pune',csoOwner:13,csoOwnerName:"shyam"}
]
// router stub for testing
const locationdata={buidingStructures:null,csoOwner:50042949,csoOwnerName:"nishant",locationCode:36,locationName:"pune",status:"deactive",totalSeats:500}

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
    declarations: [ UpdateLocationComponent,RouterLinkStubDirective ],
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
    fixture = TestBed.createComponent(UpdateLocationComponent);
    component = fixture.componentInstance;
    locationService=fixture.debugElement.injector.get(LocationStructureService);
  spy2 = spyOn(locationService, 'update')//spy getAllBuildingName() method of buildingservices
      buildingservice=fixture.debugElement.injector.get(AddBuildingService);
  spy = spyOn(buildingservice, 'getBuildingName')
  .and.returnValue(Observable.of(data));
   component.location=locationdata;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add building after calling Building service from ngonit add method',fakeAsync( () => {
  fixture.detectChanges();
  tick();                  // wait for async getLocationName
  fixture.detectChanges(); // update view with data
  de = fixture.debugElement.query(By.css('.btn'));
  el = de.nativeElement;
   expect(spy.calls.any()).toBe(true);//check whether call is made or not
 
}));
   it('should have values at Cso_Id', () => {
  fixture.detectChanges();
 
  fixture.detectChanges(); // update view with data
  de = fixture.debugElement.query(By.css('#Cso_Id'));
  el = de.nativeElement;
  expect(el.attributes["ng-reflect-model"].value).toBe("50042949");
});

   it('should have values at location_name', () => {
  fixture.detectChanges();
 
  fixture.detectChanges(); // update view with data
  de = fixture.debugElement.query(By.css('#location_name'));
  el = de.nativeElement;
  expect(el.attributes["ng-reflect-model"].value).toBe("pune");
});
      it('should have values at Cso_Name', () => {
  fixture.detectChanges();
 
  fixture.detectChanges(); // update view with data
  de = fixture.debugElement.query(By.css('#Cso_Name'));
  el = de.nativeElement;
  expect(el.attributes["ng-reflect-model"].value).toBe("nishant");
});

   it('should have values at total seats', () => {
  fixture.detectChanges();
 
  fixture.detectChanges(); // update view with data
  de = fixture.debugElement.query(By.css('#totalseats'));
  el = de.nativeElement;
  expect(el.attributes["ng-reflect-model"].value).toBe("500");
});
it('should check onSubmit', () => {
  component.submitted=false;
  component.onSubmit();
  expect(component.submitted).toBe(true);
});
  it('should add Location after calling Location service add method', () => {
  fixture.detectChanges();
 component.sum=100;
  fixture.detectChanges(); // update view with data
  de = fixture.debugElement.query(By.css('.btn'));
  el = de.nativeElement;
  el.click();
   expect(spy2.calls.any()).toBe(true);//check whether call is made or not
 
});

  it('should alert add Location after calling Location service add method with message "updated successfully"', () => {
  fixture.detectChanges();
 component.sum=100;
 spyOn(window,"alert");
  fixture.detectChanges(); // update view with data
  de = fixture.debugElement.query(By.css('.btn'));
  el = de.nativeElement;
  el.click();
  fixture.detectChanges(); // update view with data

  expect(window.alert).toHaveBeenCalledWith('updated successfully');

});


  it('should alert  "updated seats are more than total occupied seats"', () => {
  fixture.detectChanges();
 component.sum=600;
 spyOn(window,"alert");
  fixture.detectChanges(); // update view with data
  de = fixture.debugElement.query(By.css('.btn'));
  el = de.nativeElement;
  el.click();
  fixture.detectChanges(); // update view with data

  expect(window.alert).toHaveBeenCalledWith('updated seats are more than total occupied seats');

});

 });  