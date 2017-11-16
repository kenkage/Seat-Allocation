/*------------->importing dependency<-------------*/
import { browser, by, element } from 'protractor';

//TestSuite
describe('Request Form Page', () => {

  //It will run before each test spec in this suite 
  beforeEach(() => {
    browser.get('/app-sidenav/request-form');
  });

  /*  Test cases */

  /* test for form headings and labels */
  it('should show heading and display the labels of form', () => {
    expect(element(by.css('request-form h2')).getText()).toContain('Request Seats');
    expect(element.all(by.tagName('label')).get(0).getText()).toContain('Building Name');
    expect(element.all(by.tagName('label')).get(1).getText()).toContain('Approving Authority');
    expect(element.all(by.tagName('label')).last().getText()).toContain('To Date');
  });


  /* test form form submissiona and modal display */
  it('should have an Submit button and should show modal on submission', () => {
    expect(element(by.buttonText('Submit')).isPresent()).toBeTruthy();
     expect(element(by.buttonText('Submit')).isEnabled()).toBeFalsy();
    element(by.id('buildingName')).element(by.cssContainingText('option', 'Tower A')).click();
    element(by.id('empName')).element(by.cssContainingText('option', 'Vikas')).click();
    element(by.id('ccCode')).element(by.cssContainingText('option', '100')).click();
    element(by.id('entity')).element(by.cssContainingText('option', 'ntl')).click();
    element(by.id('noOfseats')).sendKeys(34);
    element(by.id('toDate')).sendKeys('20/04/2017');
   expect(element(by.buttonText('Submit')).isEnabled()).toBeTruthy(); 
   element(by.buttonText('Submit')).click();
   browser.sleep(3000);
    expect(element(by.className('modal')).isPresent()).toBeTruthy('The modal window should appear now');
    expect(element(by.id('navigate1')).isPresent()).toBeTruthy();
    element(by.id('navigate1')).browser_.actions().perform();
  });

});