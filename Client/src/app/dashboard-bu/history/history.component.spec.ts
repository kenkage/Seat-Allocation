import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';
import { HistoryBusinessUserComponent } from './history.component';
import { RequestService } from '../../shared/services/request.service';
import {MOCKTRANSACTION} from '../../../testing/mock-data';
import { MOCKREQUESTS } from '../../../testing/mock-data';


//suite that create the component environment
describe('HistoryBusinessUserComponent', () => {
  let component: HistoryBusinessUserComponent;
  let fixture: ComponentFixture<HistoryBusinessUserComponent>;
  let requestService: RequestService;
  let spyRequests: jasmine.Spy;
  let spyTransaction:jasmine.Spy;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [HistoryBusinessUserComponent],
      providers: [RequestService]
    })
      .compileComponents();
  }));

  //Testbed creating testing Environment
  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryBusinessUserComponent);
    component = fixture.componentInstance;
    requestService = fixture.debugElement.injector.get(RequestService);
    spyRequests = spyOn(requestService, 'getHistoryLogs').and.returnValue(Observable.of(MOCKREQUESTS));
   
    fixture.detectChanges();
  });

  //testcases for checking the component
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  //calling get method to get request of the business user
  it('should get the requests for the Business User', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    let de = fixture.debugElement.queryAll(By.css('tr'));
    let el = de[0].nativeElement;
    expect(spyRequests.calls.count()).toBe(1);
    expect(component.requests.length).toEqual(2);
  }))
  
  //checking the transaction details
  it('should get the transaction details for the Business User', async(() => {
    spyTransaction=spyOn(requestService,'getRequestTransaction').and.
    returnValue(Observable.of(MOCKTRANSACTION));
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('#transc')).nativeElement;  
    fixture.detectChanges();
    el.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(spyTransaction.calls.count()).toBe(1, 'stubbed method was called once');     
    });
  }))
  
});
