import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LocationStructureService } from '../../shared/services/location-structure.service';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { RouterLinkStubDirective } from '../../../testing/router-stubs';// router link stub for testting
import { LocationStructureComponent } from './location-structure.component';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
//importing third party libraries and Services

describe('LocationStructureComponent', () => {
  let component: LocationStructureComponent;
  let fixture: ComponentFixture<LocationStructureComponent>;
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
  const locationdata = { buidingStructures: null, csoOwner: 50042949, csoOwnerName: "nishant", locationCode: 36, locationName: "pune", status: "deactive", totalSeats: 500 }
  class RouterStub {
    navigateByUrl(url: string) { return url; }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule],
      declarations: [LocationStructureComponent, RouterLinkStubDirective],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        LocationStructureService,
        { provide: Router, useClass: RouterStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationStructureComponent);
    component = fixture.componentInstance;
    locationservice = fixture.debugElement.injector.get(LocationStructureService);
    spy2 = spyOn(locationservice, 'add')//spy getAllBuildingName() method of buildingservices
      .and.returnValue(Observable.of(data));

    fixture.detectChanges(); // trigger initial data binding
  });

  it('should add location after calling LocationService from ngonit add method', () => {
    fixture.detectChanges();

    fixture.detectChanges(); // update view with data
    de = fixture.debugElement.query(By.css('.btn'));
    el = de.nativeElement;
    el.click();
    expect(spy2.calls.any()).toBe(true);//check whether call is made or not

  });
  it('should show alert message with "successfully added" ', () => {
    fixture.detectChanges();

    fixture.detectChanges(); // update view with data
    de = fixture.debugElement.query(By.css('.btn'));
    el = de.nativeElement;
    spyOn(window, "alert");
    el.click();
    expect(window.alert).toHaveBeenCalledWith('sucessfully added');

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should check onSubmit', () => {
    component.submitted = false;
    component.onSubmit();
    expect(component.submitted).toBe(true);
  });
}); 