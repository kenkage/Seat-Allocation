import { async, ComponentFixture, TestBed ,fakeAsync,tick} from '@angular/core/testing';
import { DebugElement ,NO_ERRORS_SCHEMA}    from '@angular/core';
import {By} from '@angular/platform-browser';
import { ReleaseRequestComponent } from './release-request.component';
import { RequestTransactionService } from '../../shared/services/request-transaction.service';
import { RequestService } from '../../shared/services/request.service';
import { MOCKREQUESTS } from '../../../testing/mock-data';
import { FormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs'
import { RouterTestingModule } from '@angular/router/testing';

describe('ReleaseRequestComponent', () => {
  let component: ReleaseRequestComponent;
  let fixture: ComponentFixture<ReleaseRequestComponent>;
  let spy: jasmine.Spy;
  let spyTransaction:jasmine.Spy;
  let de:DebugElement;
  let el:HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule,HttpModule,RouterTestingModule],
      declarations: [ReleaseRequestComponent],
      providers: [RequestService, RequestTransactionService,{provide:Router}],
      schemas:[NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseRequestComponent);
    component = fixture.componentInstance;
    var requests=fixture.debugElement.injector.get(RequestService);
    const transaction=fixture.debugElement.injector.get(RequestTransactionService);
    spy=spyOn(requests,'getRequestByCcCode').and.returnValue(Observable.of(MOCKREQUESTS));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  //it should get all the requests for the employee
  it('should get the requests', fakeAsync(()=> {
    tick();                             //it will wait until all the requests are fetched
    fixture.detectChanges();
    expect(spy.calls.count()).toBe(1);     //check whether method in ngOninit is called to get the requests
  }));

  //it should release the request for that paritcular request that has been fetch for the cc Code of the user
  it('should release the release for that cc code',()=>{
    let requestTransaction = fixture.debugElement.injector.get(RequestTransactionService);
    let spy=spyOn(requestTransaction,'release');        //spy the release method
    de=fixture.debugElement.query(By.css('#release'));
    el=de.nativeElement;
    el.click();                                   //release method should be clicked
    fixture.detectChanges();
    expect(spy.calls.count()).toBe(1);            //check method is called
  });

});