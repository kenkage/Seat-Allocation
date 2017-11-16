import { async, ComponentFixture, TestBed,fakeAsync,tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
//importing third party libraries and Services
import { LocationStructureService } from '../../shared/services/location-structure.service';
import {  HttpModule } from '@angular/http';
import { AddBuildingService } from '../../shared/services/add-building.service';
import{Router} from '@angular/router';
import { RouterLinkStubDirective } from '../../../testing/router-stubs';// router link stub for testting
import { AddBuildingComponent } from './add-building.component';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';


//test suite for AddBuildingComponent which is being tested
describe('AddBuildingComponent', () => {
let component: AddBuildingComponent;
let fixture: ComponentFixture<AddBuildingComponent>;
let buildingservice:AddBuildingService
let locationservice:LocationStructureService;
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
class RouterStub {
  navigateByUrl(url: string) { return url; }
}
beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports:      [ FormsModule,HttpModule],
    declarations: [ AddBuildingComponent,RouterLinkStubDirective ],
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
  fixture = TestBed.createComponent(AddBuildingComponent);
  component = fixture.componentInstance;
  locationservice=fixture.debugElement.injector.get(LocationStructureService);
  buildingservice=fixture.debugElement.injector.get(AddBuildingService);
   spy = spyOn(buildingservice, 'getBuildingName')//spy getlocationame() method of locationservices
   .and.returnValue(Observable.of(data));
  spy2 = spyOn(buildingservice, 'getAll')//spy getAllBuildingName() method of buildingservices
  .and.returnValue(Observable.of(data));
  spy3 = spyOn(buildingservice, 'addBuild')//spy addbuild() method of buildingservices
  .and.returnValue(Observable.of(data));
  component.location=locationdata;
    fixture.detectChanges(); // trigger initial data binding
    });

it('should show list of location after calling buildingService from ngonit getBuildingName method', fakeAsync(() => {
  fixture.detectChanges();
  tick();                  // wait for async getLocationName
  fixture.detectChanges(); // update view with data
  de = fixture.debugElement.query(By.css('.form-control'));
  el = de.nativeElement;
   expect(spy.calls.any()).toBe(true);//check whether call is made or not
 // expect(el[0].value).toBe("245");
}));

  it('should show list of location after calling buildingService from ngonit getAllBuildingName method', fakeAsync(() => {
  fixture.detectChanges();
  tick();                  // wait for async getLocationName
  fixture.detectChanges(); // update view with data
  de = fixture.debugElement.query(By.css('.form-control'));
  el = de.nativeElement;
   expect(spy2.calls.any()).toBe(true);//check whether call is made or not
   expect(component.locations).not.toBe(null);
    expect(component.sum).not.toBe(500);
}));



it('should show alert message with "Given Building Code Already Exist"', fakeAsync(() => {
  fixture.detectChanges();
  tick();                  // wait for async getLocationName
  fixture.detectChanges(); // update view with data
  spyOn(window,"alert");
  component.location.locationCode=36;
  component.temp=locationdata;
  spyOn(component.locationdata, 'find')//spy addbuild() method of buildingservices
  .and.returnValue((data));
  fixture.detectChanges();
  component.addBuilding();
  fixture.detectChanges(); // update view with data
  expect(window.alert).toHaveBeenCalledWith('Given Building Code Already Exist');
}));



it('should show alert message with "enter valid seat numbers"', fakeAsync(() => {
  fixture.detectChanges();
  tick();                  // wait for async getLocationName
  fixture.detectChanges(); // update view with data
  spyOn(window,"alert");
  component.model.totalSeats=0;
  fixture.detectChanges();
  component.addBuilding();
  fixture.detectChanges(); // update view with data
  expect(window.alert).toHaveBeenCalledWith('enter valid seat numbers');
}));


it('should add the value in database', fakeAsync(() => {
  fixture.detectChanges();
  tick();                  // wait for async getLocationName
  fixture.detectChanges(); // update view with data
  spyOn(window,"alert");
  component.model.totalSeats=10;
  component.location.totalSeats=100;
  component.sum=0;
  fixture.detectChanges();
  component.addBuilding();
  fixture.detectChanges(); // update view with data
  expect(window.alert).toHaveBeenCalledWith('Sucessfully added');
  expect(spy3.calls.any()).toBe(true);
}));


it('should show alert message with "enter valid seat numbers"', fakeAsync(() => {
  fixture.detectChanges();
  tick();                  // wait for async getLocationName
  fixture.detectChanges(); // update view with data
  spyOn(window,"alert");
  component.model.totalSeats=10;
  component.location.totalSeats=10;
  component.sum=5;
  fixture.detectChanges();
  component.addBuilding();
  fixture.detectChanges(); // update view with data
  expect(window.alert).toHaveBeenCalledWith('you entered more seat');
}));

it('should be created', () => {
  expect(component).toBeTruthy();
});

it('should check onSubmit', () => {
  component.submitted=false;
  component.onSubmit();
  expect(component.submitted).toBe(true);
});
}); 