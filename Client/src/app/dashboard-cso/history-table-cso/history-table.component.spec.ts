import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpModule } from "@angular/http";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from '@angular/platform-browser';
//importing third party libraries and Services
import { HistoryTableComponent } from './history-table.component';
import { ApprovingAuthorityService } from "../../shared/services/approving-authority.service";
import { MOCKPENDINGREQUESTS } from "../../../testing/mock-data";

import { Observable } from 'rxjs'


describe('HistoryTableComponent', () => {
  let component: HistoryTableComponent;
  let fixture: ComponentFixture<HistoryTableComponent>;
  let spyGetReq: any;
  let spyPostReq: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      declarations: [HistoryTableComponent],
      providers: [ApprovingAuthorityService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTableComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
