import { ApprovingAuthorityService } from "./approving-authority.service";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { async,inject } from '@angular/core/testing';
import { MOCKREQUESTS } from "../../../testing/mock-data";//importing mockrequest data object 
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('ApprovingAuthorityService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
       
        ApprovingAuthorityService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('getRequest()', () => {

    it('should return an Observable<Array<Request>>',
        inject([ApprovingAuthorityService, XHRBackend], (approvingAuthorityService, mockBackend) => {
      
        //mocking the backend
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(MOCKREQUESTS)
          })));
        });
       
        //Act calling the get request method
        approvingAuthorityService.getRequest(90).subscribe((mockRequest) => {

          //Expect or Assertion
         expect(mockRequest.length).toBe(2);       
         expect(mockRequest[0].requestId).toBe(3);
         expect(mockRequest[1].status).toEqual('approved');
         expect(mockRequest[1].empCode).toEqual('123');
        });

    }));
  });

  
});