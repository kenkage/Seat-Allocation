import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//importing third party libraries and Services
import { EditFloorComponent } from './edit-floor.component';

describe('EditFloorComponent', () => {
  let component: EditFloorComponent;
  let fixture: ComponentFixture<EditFloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
