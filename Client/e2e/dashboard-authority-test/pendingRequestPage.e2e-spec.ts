import {browser, element, by } from 'protractor';


describe('Pending Request Page',()=>{

    //It'll before each test spec in this suite
       beforeEach(()=>{
    browser.get('/app-dashboard-authority/app-history');
   });

   //Test Cases

   it('should display the Table and Table Headers of the table of the Pending Request Page',()=>{
       //Checking whether table is present or not
       expect(element(by.css('table')).isPresent()).toBeTruthy();
       //Checking Table Headers
       expect(element.all(by.tagName('tr')).get(0).getText()).toContain('Entity Building Seats Requested By Requested date Forward Reject');
   });

});