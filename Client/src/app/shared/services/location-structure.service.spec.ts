import { LocationStructureService } from "./location-structure.service";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { async,inject } from '@angular/core/testing';
import { MOCKLOCATIONS } from "../../../testing/mock-data";
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('LocationStructureService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
       
        LocationStructureService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('getLocationName()', () => {

    it('should return an Observable<Array<LocationStructure>>',
        inject([LocationStructureService, XHRBackend], (locationStructureService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(MOCKLOCATIONS)
          })));
        });

        locationStructureService.getLocationName().subscribe((mockLocations) => {

         expect(mockLocations.length).toBe(6);  
         expect(mockLocations[0].status).toEqual('deactive');     
         expect(mockLocations[1].csoOwner).toBe(90765454);
         expect(mockLocations[2].csoOwnerName).toEqual('Aabhaas');
         expect(mockLocations[5].locationName).toEqual('Greater Noida Unit-1');
        });

    }));
  });

  
});