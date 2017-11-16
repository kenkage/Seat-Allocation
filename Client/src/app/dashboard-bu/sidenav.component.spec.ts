import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLinkStubDirective } from "../../testing/router-stubs";
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavComponent, RouterLinkStubDirective],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();



  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display home', () => {
    let de = fixture.debugElement.query(By.css('.nav-link'));
    let el = de.nativeElement;
    expect(el.textContent).toContain('Home');
  })

  it('should display Sign Out', () => {
    let de = fixture.debugElement.queryAll(By.css('.nav-link'));
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
  it('should display Request Form', () => {
    let de = fixture.debugElement.queryAll(By.css('.sidebar-title'));
    let el = de[1].nativeElement;
    expect(el.textContent).toContain('Request History');
  })


  it('can get RouterLinks from template', () => {


    let linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    let links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    expect(links.length).toBe(6, 'should have 5 links');
    expect('/app-home').toContain(links[0].linkParams, '1st link should go to Dashboard');

    expect(links[1].linkParams).toBe('/app-login', '2nd link should go to login page');
    expect("[ 'app-history']").toContain(links[3].linkParams, '1st link should go to current allocation');
    expect("['request-form']").toContain(links[2].linkParams, '1st link should go to request form');
  });

  it('can click Sign Out link in template', () => {
    let linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    let links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    // const buLinkDe = linkDes[1];
    const buLink = links[1];

    expect(buLink.navigatedTo).toBeNull('link should not have navigated yet');

    buLink.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(buLink.navigatedTo).toBe('/app-login');
  });


});
