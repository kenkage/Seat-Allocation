import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLinkStubDirective } from "../../testing/router-stubs";
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
//importing third party libraries and Services
import { DashboardMasterComponent } from './dashboard-master.component';

describe('DashboardMasterComponent', () => {
  let component: DashboardMasterComponent;
  let fixture: ComponentFixture<DashboardMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     
      declarations: [DashboardMasterComponent, RouterLinkStubDirective],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
