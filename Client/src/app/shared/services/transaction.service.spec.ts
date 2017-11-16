import { TransactionService } from "./transaction.service";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, inject, fakeAsync } from '@angular/core/testing';
import {
 HttpModule,
 Http,
 Response,
 ResponseOptions,
 XHRBackend
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {MOCKTRANSACTION} from '../../../testing/mock-data';

describe('RequestService', () => {

 beforeEach(() => {

   TestBed.configureTestingModule({
     imports: [HttpModule],
     providers: [
     
       TransactionService,
       { provide: XHRBackend, useClass: MockBackend },
     ]
   });
 });

 describe('get()', () => {

   it('should return an Observable<Array<Request>> of Transaction',
   inject([TransactionService, XHRBackend], (requestService, mockBackend) => {
       mockBackend.connections.subscribe((connection) => {
       connection.mockRespond(new Response(new ResponseOptions({
         body: JSON.stringify(MOCKTRANSACTION)
       })));
     });

     requestService.get().subscribe((mockRequests) => {
       expect(mockRequests.length).toBe(2);
       expect(mockRequests[0].totalSeatsInTheBuilding).toEqual(60);
       expect(mockRequests[1].transactor).toEqual('123');
     });

   }));
 });

   
     
});