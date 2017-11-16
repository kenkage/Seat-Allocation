import { browser, by, element } from 'protractor';

describe('Should display  App Building Page',()=>{

    //It'll before each test spec in this suite
    beforeEach(()=>{
        browser.get('/app-dashboard-master/app-home-master');
    })

    //Test Cases

    //Hover over image
    it('should display Main Page',()=>{
        browser.actions().mouseMove(element.all(by.id('slidcrd')).get(0)).perform();

        //Making browser wait
        browser.waitForAngular();

        expect(element(by.css('#detail')).isDisplayed()).toBeTruthy();
        browser.sleep(900);
   
        //Finding element through id mentoined in home-master html
        var wdjs = browser.findElement(by.css('#detail'));
        wdjs.click();

        //Displaying Location on Card
        expect(element(by.className('card-title')).isPresent());

        //Dislplaying Add Icon
        expect(element(by.id('add')).isPresent());
        
        //Displaying Auto-Update Icon
         expect(element(by.id('autoupdate')).isPresent());
        
         //Displaying Status Button
         expect(element(by.className('btn')).isDisplayed());
              
        //Finding element through id mentioned in building-home html
        var wdj = browser.findElement(by.css('#detail'));
        wdj.click();

        //Displaying Location on Card in building-home html
        expect(element(by.className('card-title')).isPresent());

        //Displaying Auto-Update Icon in building-home html
        expect(element(by.css('.addlocation')).isPresent());

        element(by.id('icon1')).click();
       
        //Making the browser wait after performing click
        browser.sleep(1400);
        
        //Checks whether modal opens 
        var elm = element(by.className('modal-dialog'));
        expect(elm).toBeTruthy();

        //Checks Modal Header
       // expect(element.all(by.id('modal-title')).get(1).getText()).toContain('Update Location');

        //Checking whether Update button is enabled
        //expect(element(by.buttonText('UPDATE')).isEnabled()).toBeFalsy('Update button is not enabled');

        //Check header of form
        expect(element(by.tagName('h1')).getText()).toContain('BUILDING');

        //Checking label of form
        expect(element.all(by.tagName('label')).get(0).getText()).toContain('Building Name');

        //Fill data in form
        expect(element.all(by.tagName('input')).get(0).sendKeys('Tower A'));

        //Checking label of form
        expect(element.all(by.tagName('label')).get(1).getText()).toContain('Total Seats');

        //Fill data in form
        expect(element.all(by.tagName('input')).get(1).sendKeys('150'));
        
        //Checking whether Update button is enabled
        expect(element(by.buttonText('UPDATE')).isEnabled).toBeTruthy('Update button is enabled');

        //Performing Click on ADD button
        element(by.buttonText('UPDATE')).click();

        //Handling Alert after clicking on ADD button
        browser.get('/app-dashboard-master/app-home-master').catch(function () {
            return browser.switchTo().alert().then(function (alert) {            
                    alert.accept();
                   // return browser.get('/app-dashboard-master/app-home-master');           
                });
            
        });

        //Check whether Close buttonn is present 
        //expect(element(by.css(".close1")).isPresent()).toBeTruthy('close button is present');
        //Closes Modal
        //element(by.css(".close1")).click();
        //browser.sleep(1200);
               
    });

    

    


})