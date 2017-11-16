import {browser, element, by } from 'protractor';


describe('History Page',()=>{

    //It'll before each test spec in this suite
       beforeEach(()=>{
    browser.get('/app-dashboard-authority/app-authority-history');
   });

   //Test Cases

   it('should display the Table and Table Headers of the table History Page',()=>{

       //Checking the table is present or not
       expect(element(by.css('table')).isPresent()).toBeTruthy();

       //Checking Table Headers
       expect(element.all(by.tagName('tr')).get(0).getText()).toContain('Entity Building Seats Requested By Requested date Status');
   });

});