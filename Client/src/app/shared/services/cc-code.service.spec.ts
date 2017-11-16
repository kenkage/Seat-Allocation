import { CcCodeService } from "./cc-code.service";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { async,inject } from '@angular/core/testing';
import { MOCKCCCODES } from "../../../testing/mock-data";//importing  mockcccode object array
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('CcCodeService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
       
        CcCodeService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('get()', () => { //test suite

    it('should return an Observable<Array<cc-code>>',
    //injecting dependencies
        inject([CcCodeService, XHRBackend], (ccCodeService, mockBackend) => {
         //mocking backend
          mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(MOCKCCCODES)
          })));
        });
        
        //calling the method under test
        ccCodeService.get().subscribe((mockCcCodes) => {

          //Assert
         expect(mockCcCodes.length).toBe(2);       
         expect(mockCcCodes[0].ccCodeId).toBe('1234');
         expect(mockCcCodes[1].status).toEqual('active');
         expect(mockCcCodes[1].ccCodeId).toEqual('6789');
        });

    }));
  });

  
});