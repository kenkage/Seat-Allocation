import {  browser, by, element } from 'protractor';

describe('Authority page',  ()=> {
    
    //It'll before each test spec in this suite
    beforeEach(()=>{
        browser.get('/app-dashboard-authority');
    })
    //Test Cases

    //Checking the logo of page
    it('should display name Logo of page',()=>{
        expect(element.all(by.css('h3')).get(0).getText()).toContain('Seat');
    });

    //Checking the logo of page
    it('should display name Logo of page',()=>{
        expect(element.all(by.css('h3')).get(1).getText()).toContain('Allocation');
    });

    //Checking for Icon
    it('should contain Home Icon',()=>{
        expect(element(by.className('fa fa-home')).isDisplayed());
    });

    //Checking for Home Button on Nav-Bar
    it('should display Home Button',()=>{
        expect(element.all(by.className('nav-link')).get(0).getText()).toContain('Home');
    });

    //Checking for Home Icon
    it('should contain Home Icon',()=>{
        expect(element(by.className('fa fa-sign-out')).isDisplayed());
    });

    //Checking for Sign Out
    it('should display route link',()=>{
        expect(element.all(by.className('nav-link')).get(1).getText()).toContain('Sign Out');
    });

    //Checking for Pending Request Icon
    it('should contain Pending Request Icon',()=>{
        expect(element(by.className('fa fa-users')).isDisplayed());
    });

    //Checking for Pending Request button
    it('should have Pending Requests Button',()=>{
        expect(element.all(by.className('sidebar-title')).get(0).getText()).toContain('Pending Requests');
    });

    //Checking for History Icon
    it('should contain History Icon',()=>{
        expect(element(by.className('fa fa-dashboard')).isDisplayed());
    });

    //Checking for History Button
    it('should have History Button',()=>{
        expect(element.all(by.className('sidebar-title')).get(1).getText()).toContain('History');
    });

    


})