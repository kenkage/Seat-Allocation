import { AddBuildingService } from "./add-building.service";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { async,inject } from '@angular/core/testing';
import { MOCKBUILDINGS} from "../../../testing/mock-data";//importing the mock of the building  
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('AddBuildingService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
       
        AddBuildingService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('getBuidingName()', () => {//test suite

    it('should return an Observable<Array<Buiding>>',
    //injecting the dependencies
        inject([AddBuildingService, XHRBackend], (addBuildingService, mockBackend) => {
        //mocking the response from the backend
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(MOCKBUILDINGS)
          })));
        });

        addBuildingService.getBuildingName(123).subscribe((mockBuiding) => {
         expect(mockBuiding.length).toBe(2);
         expect(mockBuiding[0].buildingCode).toEqual('90');
         expect(mockBuiding[1].buildingName).toEqual('Tower B');
        });

    }));
  });
});







