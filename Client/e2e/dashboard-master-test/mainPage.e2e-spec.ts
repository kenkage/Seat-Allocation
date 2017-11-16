/*

*/

//Importing required dependencies
import { browser, element, by } from 'protractor';


describe('Master Page',()=>{

    //It'll before each test spec in this suite
    beforeEach(()=>{
        browser.get('/app-dashboard-master/app-home-master');
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

    //Checking for Home Icon
    it('should contain Home Icon',()=>{
        expect(element(by.className('fa fa-home')).isDisplayed());
    });

    //Checking for Home Button on Nav-Bar
    it('should display Home Button',()=>{
        expect(element.all(by.className('nav-link')).get(0).getText()).toContain('Home');
    });

    //Checking for Sign Out Icon
    it('should contain Sign Out Icon',()=>{
        expect(element(by.className('fa fa-sign-out')).isDisplayed());
    });

    //Checking for Sign Out
    it('should display Sign Out Button',()=>{
        expect(element.all(by.className('nav-link')).get(1).getText()).toContain('Sign Out');
    });

    it('should click on Add Location',()=>{

       // browser.get('/app-dashboard-master/app-home-master');

       

       //Making the browser to wait for sometime
        browser.waitForAngular();

        //performing hover action
        browser.actions().mouseMove(element(by.css('.overlay'))).perform();

        //Checking whether Hover is performed
       // expect(element(by.css('.info')).isDisplayed()).toBeTruthy();
        
        //Checking whether ADD LOCATION button is present 
        expect(element(by.css('.info')).getText()).toBe('ADD LOCATION');

        //Performs click on ADD LOCATION
        var wdjs = browser.findElement(by.linkText('ADD LOCATION'));
        wdjs.click();

        //Making browser wait for 5000ms
        browser.sleep(1400);
        browser.waitForAngular()
        
        //Checks whether modal opens 
        var elm = element(by.className('modal-dialog'));
        expect(elm).toBeTruthy();

        //Checks Modal Header
        expect(element.all(by.id('modalLabelLarge1')).get(0).getText()).toContain('Add New Location');

        //Checking whether ADD button is enabled
        expect(element(by.buttonText('ADD')).isEnabled()).toBeFalsy('Add button is not enabled');

        //Check header of form
        expect(element(by.tagName('h1')).getText()).toContain('Add Location');

        //Checking label of form
        expect(element.all(by.tagName('label')).get(0).getText()).toContain('CSO Owner Id');

        //Fill data in form
        expect(element.all(by.tagName('input')).get(0).sendKeys('1A01'));

        //Checking label of form
        expect(element.all(by.tagName('label')).get(1).getText()).toContain('CSO Owner Name');

        //Fill data in form
        expect(element.all(by.tagName('input')).get(1).sendKeys('Vikas'));

        //Checking label of form
        expect(element.all(by.tagName('label')).get(2).getText()).toContain('Location Name');

        //Fill data in form
        expect(element.all(by.tagName('input')).get(2).sendKeys('Greater Noida'));

        //Checking label of form
        expect(element.all(by.tagName('label')).get(3).getText()).toContain('Total No. Of Seats');

        //Fill data in form
        expect(element.all(by.tagName('input')).get(3).sendKeys(200));

        //Checking whether ADD button is enabled
        expect(element(by.buttonText('ADD')).isEnabled).toBeTruthy('Add button is enabled');

        //Performing Click on ADD button
        element(by.buttonText('ADD')).click();

        //Handling Alert after clicking on ADD button
        browser.get('/app-dashboard-master/app-home-master').catch(function () {
            return browser.switchTo().alert().then(function (alert) {            
                    alert.accept();
                   // return browser.get('/app-dashboard-master/app-home-master');           
                });
            
        });
       
        //Check whether Close buttonn is present 
        expect(element(by.css(".close1")).isPresent()).toBeTruthy('close button is present');
        //Closes Modal
        element(by.css(".close1")).click();
        browser.sleep(1200);

        
    });

})