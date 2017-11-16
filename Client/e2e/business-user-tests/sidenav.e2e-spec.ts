/*------------->importing dependency<-------------*/
import { browser, by, element } from 'protractor';

//TestSuite
describe('Sidenav Page', () => {
 
 //It will run before each test spec in this suite 
 beforeEach(() => {
   browser.get('/app-sidenav');
 });

 
 /*  Test cases */

 //test cases for nav-links 
 it('should show heading and links in navbar',() => {
        expect(element.all(by.css('h3')).get(0).getText()).toContain('Seat');
        expect(element.all(by.css('h3')).get(1).getText()).toContain('Allocation');
        expect(element.all(by.className('nav-link')).get(0).getText()).toContain('Home');
        expect(element.all(by.className('nav-link')).get(1).getText()).toContain('Sign Out');
        expect(element.all(by.className('sidebar-title')).get(0).getText()).toContain('Request Form');
        expect(element.all(by.className('sidebar-title')).get(1).getText()).toContain('Request History');
        expect(element.all(by.className('sidebar-title')).get(2).getText()).toContain('Request Release');        
      });


});
