import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFloorsComponent } from './view-floors.component';

describe('ViewFloorsComponent', () => {
  let component: ViewFloorsComponent;
  let fixture: ComponentFixture<ViewFloorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFloorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
