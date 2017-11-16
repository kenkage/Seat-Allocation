import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LocationStructureService } from '../../shared/services/location-structure.service';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { RouterLinkStubDirective } from '../../../testing/router-stubs';// router link stub for testting
import { HomeMasterComponent } from './home-master.component';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
//importing third party libraries and Services


describe('HomeMasterComponent', () => {
  let component: HomeMasterComponent;
  let fixture: ComponentFixture<HomeMasterComponent>;
  let locationservice: LocationStructureService;
  let spy, spy2, spy3, spy4;
  let de: DebugElement;
  let el: HTMLInputElement;
  //mock data 
  const data = [
    { name: 'nishant', id: 12, locationCode: "245", locationName: 'agra', csoOwner: 12, csoOwnerName: "ram" },
    { name: 'nishant', id: 12, locationCode: "246", locationName: 'pune', csoOwner: 13, csoOwnerName: "shyam" }
  ]
  // router stub for testing
  const locationdata = [
    { buidingStructures: null, csoOwner: 50042949, csoOwnerName: "nishant", locationCode: 36, locationName: "pune", status: "deactive", totalSeats: 500 }
    , { buidingStructures: null, csoOwner: 50042949, csoOwnerName: "nishant", locationCode: 37, locationName: "rambagh", status: "deactive", totalSeats: 500 }
  ]
  class RouterStub {
    navigate(url: string) { return url; }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule],
      declarations: [HomeMasterComponent, RouterLinkStubDirective],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        LocationStructureService,
        { provide: Router, useClass: RouterStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMasterComponent);
    component = fixture.componentInstance;
    locationservice = fixture.debugElement.injector.get(LocationStructureService);
    spy = spyOn(locationservice, 'getLocationName')//spy getlocationame() method of locationservices
      .and.returnValue(Observable.of(locationdata));
    //component.index=0;
    component.images = [
      '../../../assets/gurgaon.jpg',
      '../../../assets/tapasaya.jpg',
      '../../../assets/greater-noida-campus.jpg',
      '../../../assets/SEZ unit-2.jpg',
      '../../../assets/Kolkata.jpg',
      '../../../assets/Bangalore.jpg',

    ];

    fixture.detectChanges(); // trigger initial data binding
  });



  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show list of location after calling locationService from  getLocationName method', fakeAsync(() => {
    fixture.detectChanges(); // update view with data
    tick();                  // wait for async getLocationName

    fixture.detectChanges(); // update view with data
    de = fixture.debugElement.query(By.css('.home'));
    el = de.nativeElement;
    expect(spy.calls.any()).toBe(true);//check whether call is made or not

  }));


  it('should check details and call go details method',
    fakeAsync(inject([Router], (router: Router) => {

      fixture.detectChanges(); // update view with data
      tick();               // wait for async getLocationName
      fixture.detectChanges(); // update view with data

      let sp = spyOn(router, "navigate")
      de = fixture.debugElement.query(By.css('#detail'));
      el = de.nativeElement;
      el.click();
      expect(sp.calls.first().args[0][0]).toBe("/app-dashboard-master/app-building-home");
      expect('36').toContain(sp.calls.first().args[0][1]);
    })));




  it('should check increment method', () => {
    component.temp = 0;
    fixture.detectChanges(); // update view with data
    de = fixture.debugElement.query(By.css('.increment'));
    el = de.nativeElement;
    el.click();

    expect(component.temp).toBe(0);
  });
  it('should check increment1 method', () => {
    component.temp1 = 0;
    fixture.detectChanges(); // update view with data
    de = fixture.debugElement.query(By.css('.increment1'));
    el = de.nativeElement;
    el.click();
    expect(component.temp1).toBe(0);
  });
  it('should check close method', () => {

    fixture.detectChanges(); // update view with data
    de = fixture.debugElement.query(By.css('.btn'));
    el = de.nativeElement;
    el.click();
    fixture.detectChanges();
    expect(component.temp).toBe(undefined);
  });
  it('should check close1 method', () => {

    fixture.detectChanges(); // update view with data
    de = fixture.debugElement.query(By.css('.close1'));
    el = de.nativeElement;
    el.click();
    fixture.detectChanges();
    expect(spy.calls.count()).toBe(2);
  });
  it('should check close2 method', () => {

    fixture.detectChanges(); // update view with data
    de = fixture.debugElement.query(By.css('.close2'));
    el = de.nativeElement;
    el.click();
    fixture.detectChanges();
    console.log(el);
    expect(component.temp1).toBe(undefined);
    expect(spy.calls.count()).toBe(1);
  });
}); 