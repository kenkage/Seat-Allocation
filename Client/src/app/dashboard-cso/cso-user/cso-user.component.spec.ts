import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule, NgForm, NgModel } from "@angular/forms";
import { MockBackend } from '@angular/http/testing';
import { HttpModule } from "@angular/http";
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { Observable } from 'rxjs'
import { CsoUserComponent } from './cso-user.component';
import { AddFloorService } from "../../shared/services/add-floor.service";
import { RequestService } from "../../shared/services/request.service";
import { AddBuildingService } from "../../shared/services/add-building.service"
import { RequestTransactionService } from "../../shared/services/request-transaction.service"
import { MOCKFLOORS, MOCKFORWARDREQUEST } from "../../../testing/mock-data";
import { RouterLinkStubDirective,RouterOutlet } from "../../../testing/router-stubs";
//importing third party libraries and Services
import {
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
export class RouterStub {
  navigate(url: string) { return url; }
}
export class UserManagementServiceErrorStub {
  onRejection() {
    return Observable.throw(new Error('Test error'));
  }
  
}
describe('CsoUserComponent', () => {
  let component: CsoUserComponent;
  let fixture: ComponentFixture<CsoUserComponent>;
  let spyRequest: any;
  let spyTrans: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule, RouterTestingModule],
      declarations: [CsoUserComponent,RouterLinkStubDirective],
      providers: [RequestTransactionService, AddFloorService, AddBuildingService, RequestService, { provide: Router, useClass: RouterStub }, { provide: XHRBackend, useClass: MockBackend }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CsoUserComponent);
    component = fixture.componentInstance;

    //injecting the custom dependecies
    var requestService = fixture.debugElement.injector.get(RequestService);

    spyRequest = spyOn(requestService, 'getPendingRequests').and.returnValue(Observable.of(MOCKFORWARDREQUEST));

    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show heading Entity', () => {
    let de = fixture.debugElement.queryAll(By.css('th'));
    let el = de[0].nativeElement;
    expect(el.textContent).toContain('Entity');
  });
  it('should show heading Building name', () => {
    let de = fixture.debugElement.queryAll(By.css('th'));
    let el = de[1].nativeElement;
    expect(el.textContent).toContain('BuildingName');
  });
  it('should show Entity', fakeAsync(() => {
    // wait for fakeAsync getData
    tick();
    let de = fixture.debugElement.queryAll(By.css('td'));
    let el = de[0].nativeElement;
    expect(el.textContent).toEqual("ICS");
  }));
  it('should show value for Building Name', fakeAsync(() => {
    // wait for fakeAsync getData
    tick();
    let de = fixture.debugElement.queryAll(By.css('td'));
    let el = de[1].nativeElement;
    expect(el.textContent).toEqual("Tower A");
  }));
  it('should show value for number of seats', fakeAsync(() => {
    // wait for fakeAsync getData
    tick();
    let de = fixture.debugElement.queryAll(By.css('td'));
    let el = de[2].nativeElement;
    expect(el.textContent).toEqual("50");
  }));
  it('should show value Requested By', fakeAsync(() => {
    // wait for fakeAsync getData
    tick();
    let de = fixture.debugElement.queryAll(By.css('td'));
    let el = de[3].nativeElement;
    expect(el.textContent).toEqual("50042910");
  }));
  it('Should on click of reject button', fakeAsync(() => {
    var requestTransactionService = fixture.debugElement.injector.get(RequestTransactionService);
    spyTrans = spyOn(requestTransactionService, 'onRejection')

    tick();
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('#RejectButton'));
    let el = de.nativeElement;
    el.click();
    // component.acceptRequest(MOCKPENDINGREQUESTS)
    tick();
    fixture.detectChanges();
    expect(spyTrans.calls.count()).toBe(1, 'stubbed method was called once');
    fixture.detectChanges();
    expect(component.requestTransaction.transactor).toBe('3456');
  }));
  it('Test', async(inject([RequestService, XHRBackend], (service, mockBackend) => {
    var requestTransactionService = fixture.debugElement.injector.get(RequestTransactionService);
    spyTrans = spyOn(requestTransactionService, 'onRejection')
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        status: 404
      })));
    });
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('#RejectButton'));
    let el = de.nativeElement;
    el.click();
    // component.acceptRequest(MOCKPENDINGREQUESTS)
    fixture.whenStable();
    fixture.detectChanges();
    expect(spyTrans.calls.count()).toBe(1, 'stubbed method was called once');
    expect(component.requestTransaction.transactor).toBe('3456');
  })));
  it('Should give alert with Request Is Rejected', async(inject([XHRBackend], (mockBackend) => {
    var requestTransactionService = fixture.debugElement.injector.get(RequestTransactionService);

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200
      })),
        {

        }
      )
    });
    // let requestTrans = {"transactor":"3456","typeOfTransaction":"rejection","requestId":2,"status":"rejected","noOfseats":0,"buildingCode":"6789"}
    spyOn(window, 'alert');
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('#RejectButton'));
    let el = de.nativeElement;
    el.click();
    fixture.whenStable();

    fixture.detectChanges();

    // component.acceptRequest(MOCKPENDINGREQUESTS)

    fixture.whenStable();
    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Request Is Rejected');
    expect(component.requestTransaction.transactor).toBe("3456")
  })));
  it('Test', async(inject([XHRBackend], (mockBackend) => {
    //var requestTransactionService = fixture.debugElement.injector.get(RequestTransactionService);
    fixture.detectChanges();
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: '', status: 500, statusText: 'Internal Server Error'
      }))
        //{body:'',status:500,ok:false,statusText:'Internal Server Error'}
      )
    });
    let requestTrans = { "transactor": "3456", "typeOfTransaction": "rejection", "requestId": 2, "status": "rejected", "noOfseats": 0, "buildingCode": "6789" }
    spyOn(window, 'alert');
    fixture.detectChanges();
    fixture.whenStable();

    fixture.detectChanges();
    component.onReject(requestTrans);


    fixture.whenStable();
    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Something Went Wrong. Please Try Again Later');
  })));

});