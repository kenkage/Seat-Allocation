import { async, inject, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, NgForm, NgModel } from "@angular/forms";
import { RouterLinkStubDirective } from "../../../testing/router-stubs";
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Observable } from 'rxjs'
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { RequestFormComponent } from './request-form.component';
import { By } from '@angular/platform-browser';

//Modules used for testing
import { RouterTestingModule } from "@angular/router/testing";
import { LocationStructureService } from "../../shared/services/location-structure.service";
import { AddBuildingService } from '../../shared/services/add-building.service';
import { ApprovingAuthorityService } from '../../shared/services/approving-authority.service';
import { AddFloorService } from '../../shared/services/add-floor.service';
import { CcCodeService } from "../../shared/services/cc-code.service";
import { EntityService } from "../../shared/services/entity.service";
import { RequestService } from "../../shared/services/request.service";
import { MOCKBUILDINGS, MOCKLOCATIONS, MOCKCCCODES, MOCKENTITIES, MOCKFLOORS, MOCKAUTHORITY } from "../../../testing/mock-data";
//Typescript Declarations
describe('RequestFormComponent', () => {
  let component: RequestFormComponent;
  let fixture: ComponentFixture<RequestFormComponent>;
  let spyLocation: any;
  let spyCcCode: any;
  let spyEntity: any;
  let spyBuilding: any;
  let spyFloor: any;
  let spyAuth: any;
  let moc: any;
  // beforeEach is called once before every `it` block in a test.
  // Using this to configure to the component, inject services etc.
  beforeEach(async(() => {
    class RouterStub {
      navigate(url: string) { return url; }

    }
    class ObserverThrowServiceStub {
      getBuildingName() {
        return Observable.throw(new Error('Test error'));
      }
    }
    //async before is used for compiling external templates which is any async activity
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule, RouterTestingModule],
      declarations: [RequestFormComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: AddBuildingService, useClass: ObserverThrowServiceStub },
        { provide: XHRBackend, useClass: MockBackend },
        LocationStructureService, AddBuildingService, AddFloorService, ApprovingAuthorityService, CcCodeService, EntityService, RequestService
      ]
    })
      .compileComponents();           //compile template and css
  }));
  beforeEach(() => {
    //This one is synchronous async function
    fixture = TestBed.createComponent(RequestFormComponent);
    component = fixture.componentInstance;
    //get the injected services from component's fixture.debugElement
    var locationService = fixture.debugElement.injector.get(LocationStructureService);
    var ccCodeservice = fixture.debugElement.injector.get(CcCodeService);
    var entityService = fixture.debugElement.injector.get(EntityService);
    var buildingService = fixture.debugElement.injector.get(AddBuildingService);
    var floorService = fixture.debugElement.injector.get(AddFloorService);
    var requestService = fixture.debugElement.injector.get(RequestService);
    var approvingService = fixture.debugElement.injector.get(ApprovingAuthorityService);

    //Create a jasmine spy to spy on the add method
    spyLocation = spyOn(locationService, 'getLocationName').and.returnValue(Observable.of(MOCKLOCATIONS));
    spyCcCode = spyOn(ccCodeservice, 'get').and.returnValue(Observable.of(MOCKCCCODES));
    spyEntity = spyOn(entityService, 'get').and.returnValue(Observable.of(MOCKENTITIES));
    spyAuth = spyOn(approvingService, 'getAuthority').and.returnValue(Observable.of(MOCKAUTHORITY));
    spyBuilding = spyOn(buildingService, 'getBuildingName').and.returnValue(Observable.of(MOCKBUILDINGS));
    spyFloor = spyOn(floorService, 'getFloors').and.returnValue(Observable.of(MOCKFLOORS));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should  Release Seats before OnInit', () => {
    //query the id head of form
    let de = fixture.debugElement.query(By.css('#head'));
    let el = de.nativeElement;
    expect(el.textContent).toBe('Request Seats', 'Request Seats displayed');
  });

  it('should show building dropdown after ngOnInit (fakeAsync)', fakeAsync(() => {
    // wait for fakeAsync getLocationName
    tick();
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.form-control'));
    let el = de.nativeElement;
    expect(el[0].textContent).toEqual("Tower A");
  }));

  it('should show CcCode dropdown  after ngOnInit (fakeAsync)', fakeAsync(() => {
    // wait for fakeAsync getEntity
    tick();
    fixture.detectChanges();
    let de = fixture.debugElement.queryAll(By.css('.form-control'));
    let el = de[2].nativeElement;
    expect(el[0].textContent).toEqual("1234");
    expect(el[1].textContent).toEqual("6789");
  }));

  it('should show entity dropdown after ngOnInit (fakeAsync)', fakeAsync(() => {
    // wait for fakeAsync getCcCode
    tick();
    fixture.detectChanges();
    let de = fixture.debugElement.queryAll(By.css('.form-control'));
    let el = de[3].nativeElement;
    expect(el[1].textContent).toEqual("ESRI");
  }));

  it('should show authority dropdown menu after selection of location (fakeAsync)', fakeAsync(() => {
    // wait for fakeAsync getAuthorities
    tick();
    fixture.detectChanges();
    let de = fixture.debugElement.queryAll(By.css('.form-control'));
    let el = de[1].nativeElement;
    expect(el[0].textContent).toEqual("Vikas");
  }));

  //for binding modal to click add button
  it('should bind the  property noOfSeats to the correct input', fakeAsync(() => {
    fixture.detectChanges();
    // put our test string to the input element
    component.model.noOfseats = 100;
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('input')).nativeElement;
    element.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    // expect it to be the uppercase version
    expect(element.attributes["ng-reflect-model"].value
    ).toContain(component.model.noOfseats);
  }));

  //for checking to date is valid
  it('should bind property toDate to the correct input', fakeAsync(() => {
    fixture.detectChanges();
    component.model.toDate = '2017-09-09';
    fixture.detectChanges();
    let element = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    element.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(element.attributes["ng-reflect-model"].value
    ).toContain(component.model.toDate);
  }));

  //should submit 
  it('should set submitted to true onSubmit', () => {
    fixture.detectChanges();
    component.onSubmit();
    fixture.detectChanges();
    component.submitted
    expect(component.submitted
    ).toEqual(true);
  });

  //should checks of alert message is correct
  it('should give alerts on noOfseats', () => {
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('input')).nativeElement;
    spyOn(window, 'alert')
    component.model.noOfseats = 0;
    fixture.detectChanges();
    element.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('no of seats should be greator than zero');
  });

  //should give alert for noofseats greater than zero
  it('should not give alert on noOfseats', () => {
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('input')).nativeElement;
    spyOn(window, 'alert')
    component.model.noOfseats = 10;
    fixture.detectChanges();
    element.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(window.alert).not.toHaveBeenCalledWith('no of seats should be greator than zero');
  });

  //should add requests
  it('should addRequest method should be called', async () => {
    fixture.detectChanges();
    let requestService = fixture.debugElement.injector.get(RequestService);
    let el = fixture.debugElement.query(By.css('.btn')).nativeElement;
    let spyRequest = spyOn(requestService, 'post')
    fixture.detectChanges();
    el.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(spyRequest.calls.count()).toBe(1, 'stubbed method was called once');
      expect(component.model.requestedBy).toBe('12345');
    });
  });
  //router test navigation when clicked on close button
  it('check when button routed when clicked',
    inject([Router], (route: Router) => {
      const spy = spyOn(route, 'navigate');
      component.modal = 1;
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css('#navigate1'));
      let el = de.nativeElement;
      el.click();
      fixture.detectChanges();
      // const navargs=spy.calls.first().args[0];
      expect(spy.calls.count()).toBe(1);
      expect(route.navigate).toHaveBeenCalledWith(['app-sidenav/app-history']);
    }))

  //should handle error
  it('Should handle the error ', async(inject([Router, RequestService, XHRBackend], (router, requestService, mockBackend) => {
    fixture.detectChanges();
    mockBackend.connections.subscribe((connection) => {
      connection.mockError(new Response(new ResponseOptions({
        body: '', status: 500
      })));
    });
    component.addRequest();
    fixture.whenStable();
    fixture.detectChanges();
    expect(component.msg).toBe("Something Went Wrong, Please Try Again");
  })));

  //should check modal if sent successfully
  it('Should Give Alert ', async(inject([Router, RequestService, XHRBackend], (router, requestService, mockBackend) => {
    fixture.detectChanges();
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200
      })));
    });

    let el = fixture.debugElement.query(By.css('.btn')).nativeElement;
    el.click();
    fixture.whenStable();
    fixture.detectChanges();
    expect(component.msg).toBe("Request Sent Successfully");
  })));
});