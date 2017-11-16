import{GetSeatInfo} from './get-seat-info.component';
import {async, ComponentFixture, TestBed, fakeAsync,tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AddFloorService } from "../../shared/services/add-floor.service";
import { RequestService } from "../../shared/services/request.service";
import { RouterTestingModule } from "@angular/router/testing";
import { Observable } from 'rxjs'
import { FormsModule } from "@angular/forms";
import{Router} from '@angular/router';
import { HttpModule } from "@angular/http";
import {  MOCKFLOORS, MOCKREQUESTS } from "../../../testing/mock-data";
import { By } from '@angular/platform-browser';

describe('GetSeatInfo', () => {
  let component: GetSeatInfo;
  let fixture: ComponentFixture<GetSeatInfo>;
  let spyRequest:any;
  let spyFloor: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,HttpModule,RouterTestingModule],
      declarations: [ GetSeatInfo ],
      providers: [ AddFloorService, RequestService,{provide:Router}],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSeatInfo);
    component = fixture.componentInstance;
    var addFloorService=fixture.debugElement.injector.get(AddFloorService);
    var requestService=fixture.debugElement.injector.get(RequestService);
    
    spyFloor = spyOn(addFloorService, 'getFloors').and.returnValue(Observable.of(MOCKFLOORS));
    spyRequest = spyOn(requestService, 'onApprove').and.returnValue(Observable.of(MOCKREQUESTS));1

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain heading ', () => {
    let de = fixture.debugElement.query(By.css('h1'));
    let el = de.nativeElement;
    expect(el.textContent).toEqual('Closed ODC');
    expect(el.textContent).not.toContain('CC CODE');
  });

  it('should contain total seat ', () => {
    component.floors=MOCKFLOORS
    fixture.detectChanges();
    let de = fixture.debugElement.queryAll(By.css('.totalSeats'));
    let el = de[0].nativeElement;
    expect(el.textContent).toEqual('Total Seats');
    expect(el.textContent).not.toContain('CC CODE');
  });
  it('should contain abv seats',()=>{
    component.floors=MOCKFLOORS;
    fixture.detectChanges();
    let de=fixture.debugElement.queryAll(By.css('#abvSeatsLabel'));
    let el =de[0].nativeElement;
    expect(el.textContent).toEqual('ABV Seats');
    expect(el.textContent).not.toContain('CC CODE');


  })
  it('should contain vacant seats',()=>
{
  component.floors=MOCKFLOORS
  fixture.detectChanges();
  let de=fixture.debugElement.query(By.css('#vacantSeats'));
  let el =de.nativeElement;
  expect(el.textContent).toEqual('Vacant Seats');
  expect(el.textContent).not.toContain('CC CODE');
})
it('should contain button',()=>
{
  component.floors=MOCKFLOORS
  fixture.detectChanges();
  let de=fixture.debugElement.queryAll(By.css('.btn'));
  let el=de[1].nativeElement;
  expect(el.textContent).toEqual('Allocate');
  expect(el.textContent).not.toContain('CC CODE');
})
  it('should show total seat data', fakeAsync(() => {
 
    component.floors = {totalSeats:500,abvSeats:250,closedAllocatedSeats:250};

    fixture.detectChanges();
   
    let de = fixture.debugElement.queryAll(By.css('.input'));
    let el = de[0].nativeElement;
    tick();
    fixture.detectChanges();
    expect(el.value).toEqual('500','totalSeats');
    expect(el.value).not.toContain('CC');
  }));
  it('should show abv seat details',fakeAsync(()=>{
    component.floors={totalSeats:500,abvSeats:250,closedAllocatedSeats:250};
    fixture.detectChanges();
    let de=fixture.debugElement.queryAll(By.css('.input'));
    let el=de[1].nativeElement;
    tick();
    fixture.detectChanges();
    expect(el.value).toEqual('250','abvSeats');
    expect(el.value).not.toContain('cc');

  }));
  it('should verify that dropdown working',function(){
    component.floors=MOCKFLOORS
    fixture.detectChanges();
    let de=fixture.debugElement.queryAll(By.css('.btn'));
    let el=de[0].nativeElement;
    expect(el.textContent).toContain('Select Floors');
  })

  // it('Allocate() should call',fakeAsync( () => {
  // fixture.detectChanges();
  // spyOn(component,'onAlloted');//method attached to the click
  // let btn=fixture.debugElement.queryAll(By.css('.btn'));
  // btn.trigger
  // }));
});
