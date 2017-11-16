/*------------->importing dependency<-------------*/
import { browser, by, element } from 'protractor';

//TestSuite
describe('Release Request Page', () => {

  //It will run before each test spec in this suite 
  beforeEach(() => {
    browser.get('/app-sidenav/app-release-request');
  });

  /*  Test cases */

  //test for table and table heading
  it('should have a table and table header', () => {
    expect(element(by.css('table')).isPresent()).toBeTruthy();
    expect(element.all(by.tagName('tr')).get(0).getText()).toContain('Request Id Requested By Allocated Seats Release Seats');
  });

  //test for table rows
  it('table should have at least one row', () => {
    expect(element.all(by.tagName('tr')).get(1).getText()).toContain('29 12345 9');
  });

  //test for view button and modal for display
  it('should have a View Transaction button and modal should appear on click', () => {
    expect(element(by.buttonText('View')).isDisplayed()).toBeTruthy();
    expect(element(by.id('myModal')).isDisplayed()).toBeFalsy('The modal window should not appear now');
    element(by.buttonText('View')).click();
    browser.sleep(2000);
    expect(element(by.id('myModal')).isDisplayed()).toBeTruthy('The modal window should appear now');
    element(by.id('noOfseats')).sendKeys(2);
    element(by.buttonText('Submit')).click();
  });

});