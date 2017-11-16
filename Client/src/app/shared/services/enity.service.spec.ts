import { EntityService } from "./entity.service";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { async,inject } from '@angular/core/testing';
import { MOCKENTITIES } from "../../../testing/mock-data";// importing the mock enities data array
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('EntityService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
       
        EntityService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('get()', () => {

    it('should return an Observable<Array<Enity>>',
    //inject the dependencies
        inject([EntityService, XHRBackend], (entityService, mockBackend) => {

          //mocking the backend response
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(MOCKENTITIES)
          })));
        });
       
        //Act calling the method under test  
        entityService.get().subscribe((mockEntities) => {
  
          //expectation
         expect(mockEntities.length).toBe(4);  
         expect(mockEntities[0].status).toEqual('active');     
         expect(mockEntities[1].entityId).toBe(2);
         expect(mockEntities[2].entityName).toEqual('NSS');
         expect(mockEntities[3].entityName).toEqual('ICS');
        });

    }));
  });

  
});