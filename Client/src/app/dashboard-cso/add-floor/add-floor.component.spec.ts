import { async, ComponentFixture, TestBed, fakeAsync, tick,inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, NgForm, NgModel } from "@angular/forms";
import { RouterLinkStubDirective } from "../../../testing/router-stubs";
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Observable } from 'rxjs'
import { MockBackend } from '@angular/http/testing';
import{Router} from '@angular/router';
import { AddFloorComponent } from './add-floor.component';
import { By } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { RouterTestingModule } from "@angular/router/testing";
import { LocationStructureService } from "../../shared/services/location-structure.service";
import { AddBuildingService } from '../../shared/services/add-building.service';
import { AddFloorService } from '../../shared/services/add-floor.service';
import { CcCodeService } from "../../shared/services/cc-code.service";
import { EntityService } from "../../shared/services/entity.service";
import { RequestService } from "../../shared/services/request.service";
import {
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';

//importing the mock data
import { MOCKBUILDINGS, MOCKLOCATIONS, MOCKCCCODES, MOCKENTITIES, MOCKFLOORS } from "../../../testing/mock-data";
class RouterStub {
  navigate(url: string) { return url; }
}
describe('AddFloorComponent', () => {
  let component: AddFloorComponent;
  let fixture: ComponentFixture<AddFloorComponent>;
  let spyLocation: any;
  let spyCcCode: any;
  let spyEntity: any;
  let spyBuilding: any;
  let spyFloor: any;
  let moc: any;
  let spyFloorGetAll:any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule, RouterTestingModule],
      declarations: [AddFloorComponent],
      providers: [LocationStructureService, AddBuildingService, AddFloorService, CcCodeService, EntityService, RequestService, { provide: Router,      useClass: RouterStub },{ provide: XHRBackend, useClass: MockBackend }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFloorComponent);
    component = fixture.componentInstance;
   //injecting the custom dependencies
    var locationService = fixture.debugElement.injector.get(LocationStructureService);
    var ccCodeservice = fixture.debugElement.injector.get(CcCodeService);
    var entityService = fixture.debugElement.injector.get(EntityService);
    var buildingService = fixture.debugElement.injector.get(AddBuildingService);
    var floorService = fixture.debugElement.injector.get(AddFloorService);
    var requestService = fixture.debugElement.injector.get(RequestService);


   //spyOn the methods and mocking the methods
    spyLocation = spyOn(locationService, 'getLocationName').and.returnValue(Observable.of(MOCKLOCATIONS));
    spyCcCode = spyOn(ccCodeservice, 'get').and.returnValue(Observable.of(MOCKCCCODES));
    spyEntity = spyOn(entityService, 'get').and.returnValue(Observable.of(MOCKENTITIES));
    spyBuilding = spyOn(buildingService, 'getByCsoOwner').and.returnValue(Observable.of(MOCKBUILDINGS));
    spyFloor = spyOn(floorService,'getAll').and.returnValue(Observable.of(MOCKFLOORS));
  });


  it('should be created', () => {
    expect(component).toBeTruthy();

  });
  it('should show heading', () => {
    let de = fixture.debugElement.query(By.css('#head'))

    let el = de.nativeElement;
    expect(el.textContent).toContain("Add Floor");
  })
  it('should show heading Select Building', () => {
    let de = fixture.debugElement.query(By.css('#buildName'))

    let el = de.nativeElement;
    expect(el.textContent).toContain("Select Building");
  })
  it('should get the name of the building',fakeAsync(()=>{
    tick();
    fixture.detectChanges();
     let de = fixture.debugElement.query(By.css('#buildingOption'))
    let el= de.nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toEqual('Tower A');
  }))
  it('Should on click of reject button', fakeAsync(() => {
    var floorService = fixture.debugElement.injector.get(AddFloorService);
    spyFloor = spyOn(floorService,'addFloor').and.returnValue(Observable.of(MOCKFLOORS));
    tick();
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('#addButton'));
    let el = de.nativeElement;
    el.click();
     tick();
    fixture.detectChanges();
    expect(component.msg).toContain('Floor Added Successfully!');
    fixture.detectChanges();
     expect('0').toContain(component.model.totalSeats);
  }));
   it('should check details and call go details method', 
  fakeAsync(inject([Router], (router: Router) =>{
   
   fixture.detectChanges(); // update view with data
  tick();               // wait for async getLocationName
  fixture.detectChanges(); // update view with data
  
 let sp = spyOn(router,"navigate")
  let de = fixture.debugElement.query(By.css('#navigateButton'));
  let el = de.nativeElement;
  el.click();
expect(sp.calls.first().args[0]).toEqual([ '/app-dashboard-cso' ]);
})));
it('should check seats if total seats less than vacant seats',fakeAsync(()=>{
  tick();
 component.model={floorName:'',buildingCode:'',totalSeats:'10',openVacantSeats:'12',abvSeats:null,totalVacantSeats:null,openAllocatedSeats:0,closedAllocatedSeats:0};
 console.log(component.model.totalSeats,component.model.openVacantSeats);

 spyOn(window,'alert');
 fixture.detectChanges();
 component.checkSeats();
 fixture.detectChanges(); 
 expect(window.alert).toHaveBeenCalledWith('Number Of Seats Entered Are More Than Building Capacity');


}))
it('should check seats if total seats less than abvSeats seats',fakeAsync(()=>{
  tick();
 component.model={floorName:'',buildingCode:'',totalSeats:'10',openVacantSeats:'',abvSeats:'12',totalVacantSeats:null,openAllocatedSeats:0,closedAllocatedSeats:0};
 console.log(component.model.totalSeats,component.model.openVacantSeats);

 spyOn(window,'alert');
 fixture.detectChanges();
 component.checkSeats();
 fixture.detectChanges(); 
 expect(window.alert).toHaveBeenCalledWith('Number Of Seats Entered Are More Than Building Capacity');


}))
it('should check seats if total seats less than abvSeats seats',fakeAsync(()=>{
  tick();
 component.model={floorName:'',buildingCode:'',totalSeats:'10',openVacantSeats:'6',abvSeats:'7',totalVacantSeats:null,openAllocatedSeats:0,closedAllocatedSeats:0};
 console.log(component.model.totalSeats,component.model.openVacantSeats);
 spyOn(window,'alert');
 fixture.detectChanges();
 component.checkSeats();
 fixture.detectChanges(); 
 expect(window.alert).toHaveBeenCalledWith('Number Of Seats Entered Are More Than Building Capacity');
}))
it('should check seats if total seats less than abvSeats seats',fakeAsync(()=>{
  tick();
 component.model={floorName:'',buildingCode:'',totalSeats:'10',openVacantSeats:'6',abvSeats:'7',totalVacantSeats:null,openAllocatedSeats:0,closedAllocatedSeats:0};
 console.log(component.model.totalSeats,component.model.openVacantSeats);
 spyOn(window,'alert');
 fixture.detectChanges();
 component.checkSeats();
 fixture.detectChanges(); 
 expect(window.alert).not.toHaveBeenCalledWith('Something Went Wrong');
}))
it('Should return with internel server error ', async(inject([XHRBackend], ( mockBackend) => {
  //var requestTransactionService = fixture.debugElement.injector.get(RequestTransactionService);
  fixture.detectChanges();
  mockBackend.connections.subscribe((connection) => {
    connection.mockRespond(new Response(new ResponseOptions({
      body:'',status:500,statusText:'Internal Server Error'
    }))
   //{body:'',status:500,ok:false,statusText:'Internal Server Error'}
   )
  });
  fixture.whenStable();
  fixture.detectChanges();
  //spyOn(window,'alert');
    component.addFloor();


  fixture.whenStable();
  fixture.detectChanges();
  expect(component.msg).toContain('Something Went Wrong, Please Try Again Later');
})));
it('Should return error, not found ', async(inject([XHRBackend], ( mockBackend) => {
  //var requestTransactionService = fixture.debugElement.injector.get(RequestTransactionService);
  fixture.detectChanges();
  mockBackend.connections.subscribe((connection) => {
    connection.mockRespond(new Response(new ResponseOptions({
      body:'',status:404,statusText:'Internal Server Error'
    }))
   //{body:'',status:500,ok:false,statusText:'Internal Server Error'}
   )
  });
  fixture.whenStable();
  fixture.detectChanges();
  //spyOn(window,'alert');
    component.addFloor();


  fixture.whenStable();
  fixture.detectChanges();
  expect(component.msg).toContain('Something Went Wrong, Please Try Again Later');
})));

})