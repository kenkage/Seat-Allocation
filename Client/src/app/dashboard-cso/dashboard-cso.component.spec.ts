import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLinkStubDirective } from "../../testing/router-stubs";
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
//importing third party libraries and Services
import { DashboardCSOComponent } from './dashboard-cso.component';

describe('DashboardCSOComponent', () => {
  let component: DashboardCSOComponent;
  let fixture: ComponentFixture<DashboardCSOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCSOComponent, RouterLinkStubDirective],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCSOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();



  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display home', () => {
    let de = fixture.debugElement.query(By.css('.navLink'));
    let el = de.nativeElement;
    expect(el.textContent).toContain('Home');
  })

  it('should display Sign Out', () => {
    let de = fixture.debugElement.queryAll(By.css('.navLink'));
    let el = de[1].nativeElement;
    expect(el.textContent).toContain('Sign Out');
  })

  //logo
  it('should display Seat', () => {
    let de = fixture.debugElement.query(By.css('h3'));
    let el = de.nativeElement;
    expect(el.textContent).toContain('Seat');
  })
  //logo
  it('should display Allocation', () => {
    let de = fixture.debugElement.query(By.css('#head'));
    let el = de.nativeElement;
    expect(el.textContent).toContain('Allocation');
  })

  //side navbar options
  it('should display View Status', () => {
    let de = fixture.debugElement.query(By.css('.sidebar-title'));
    let el = de.nativeElement;
    expect(el.textContent).toContain('View Status');
  })

  //side navbar options
  it('should display Requests', () => {
    let de = fixture.debugElement.queryAll(By.css('.sidebar-title'));
    let el = de[1].nativeElement;
    expect(el.textContent).toContain('Requests');
  })


  it('can get RouterLinks from template', () => {


    let linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    let links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    expect(links.length).toBe(6, 'should have 6 links');
    // expect(links[0].linkParams).toContain('/app-home', '1st link should go to Dashboard');
    expect(links[1].linkParams).toBe('/app-login', '2nd link should go to login page');
    // expect(links[2].linkParams).toContain("[ 'app-current-allocation' ]", '1st link should go to');
    // expect(links[3].linkParams).toContain("['app-cso-user']", '1st link should go to ');
  });

  it('can click Sign Out link in template', () => {
    let linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    let links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    const csoLinkDe = linkDes[1];
    const csoLink = links[1];

    expect(csoLink.navigatedTo).toBeNull('link should not have navigated yet');

    csoLink.triggerEventHandler('click', csoLink);
    fixture.detectChanges();

    expect(csoLink.navigatedTo).toBe('/app-login');
  });


  // it('can click Home link in template', () => {
  //   let linkDes = fixture.debugElement
  //   .queryAll(By.directive(RouterLinkStubDirective));

  //   let links = linkDes
  //   .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

  //   const csoLinkDe = linkDes[0];
  //   const csoLink = links[0];

  //   expect(csoLink.navigatedTo).toBeNull('link should not have navigated yet');

  //   csoLink.triggerEventHandler('click', csoLink);
  //   fixture.detectChanges();

  //   expect(csoLink.navigatedTo).toBe("['app-home']");
  // });


});
