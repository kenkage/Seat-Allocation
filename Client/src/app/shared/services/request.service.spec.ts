import { RequestService } from "./request.service";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, inject, fakeAsync } from '@angular/core/testing';
import { MOCKREQUESTS } from "../../../testing/mock-data";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MOCKTRANSACTION } from '../../../testing/mock-data';

describe('RequestService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [

        RequestService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('getPendingRequests()', () => {

    it('should return an Observable<Array<Request>> where status is forwarded',
      inject([RequestService, XHRBackend], (requestService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(MOCKREQUESTS)
          })));
        });

        requestService.getPendingRequests(3456).subscribe((mockRequests) => {

          expect(mockRequests.length).toBe(2);
          expect(mockRequests[1].status).toEqual('approved');
          expect(mockRequests[1].requestId).toBe(4);
          expect(mockRequests[0].status).toEqual('forwarded');
          expect(mockRequests[0].empCode).toEqual('123');
        });

      }));
  });


  describe('get()', () => {

    it('should return an Observable<Array<Request>>',
      inject([RequestService, XHRBackend], (requestService, mockBackend) => {

        const mockResponse =
          [{ "requestId": 3, "requestedBy": "98", "empCode": "123", "ccCode": "23", "entity": "NTL", "floorCode": 1, "floorStructures": { "floorCode": 1, "floorName": "1", "buildingCode": "90", "buildingStructures": null, "status": "deactive", "totalSeats": 500, "totalVacantSeats": 41, "openAllocatedSeats": 398, "openVacantSeats": 2, "closedAllocatedSeats": 438, "abvSeats": 39 }, "buildingCode": "90", "locationCode": "123", "status": "pending", "noOfseats": 420, "currentAllocatedseats": 0, "requestReleases": null, "justification": "", "approvedOn": "2017-09-20T10:35:16.541778", "requestedOn": "2017-01-01T00:00:00", "toDate": "2017-01-01T00:00:00" },
          { "requestId": 5, "requestedBy": "78", "empCode": null, "ccCode": "6789", "entity": "NSS", "floorCode": 1, "floorStructures": { "floorCode": 1, "floorName": "1", "buildingCode": "90", "buildingStructures": null, "status": "deactive", "totalSeats": 500, "totalVacantSeats": 41, "openAllocatedSeats": 398, "openVacantSeats": 2, "closedAllocatedSeats": 438, "abvSeats": 39 }, "buildingCode": "90", "locationCode": "123", "status": "forwarded", "noOfseats": 21, "currentAllocatedseats": 0, "requestReleases": null, "justification": "accepted", "approvedOn": "2017-09-20T11:06:48.4210315", "requestedOn": "2017-01-01T00:00:00", "toDate": "2017-01-01T00:00:00" }];


        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        requestService.getPendingRequests(3456).subscribe((mockRequests) => {

          expect(mockRequests.length).toBe(2);
          expect(mockRequests[0].status).toEqual('pending');
          expect(mockRequests[1].requestId).toBe(5);
          expect(mockRequests[1].status).toEqual('forwarded');
          expect(mockRequests[0].empCode).toEqual('123');
        });

      }));
  });


  describe('getByUserCode()', () => {

    it('should return an Observable<Array<Request>> by userCode',
      inject([RequestService, XHRBackend], (requestService, mockBackend) => {

        const mockResponse =
          [{ "requestId": 5, "requestedBy": "78", "empCode": null, "ccCode": "6789", "entity": "NSS", "floorCode": 1, "floorStructures": { "floorCode": 1, "floorName": "1", "buildingCode": "90", "buildingStructures": { "buildingCode": "90", "buildingName": "Tower A", "locationCode": "123", "floorStructures": [{ "floorCode": 2, "floorName": "0", "buildingCode": "90", "status": "deactive", "totalSeats": 110, "totalVacantSeats": 110, "openAllocatedSeats": 0, "openVacantSeats": 50, "closedAllocatedSeats": 0, "abvSeats": 60 }, { "floorCode": 3, "floorName": "9", "buildingCode": "90", "status": "deactive", "totalSeats": 190, "totalVacantSeats": 190, "openAllocatedSeats": 0, "openVacantSeats": 90, "closedAllocatedSeats": 0, "abvSeats": 100 }], "status": "deactive" }, "status": "deactive", "totalSeats": 500, "totalVacantSeats": 41, "openAllocatedSeats": 398, "openVacantSeats": 2, "closedAllocatedSeats": 438, "abvSeats": 39 }, "buildingCode": "90", "locationCode": "123", "status": "forwarded", "noOfseats": 21, "currentAllocatedseats": 0, "requestReleases": null, "justification": "accepted", "approvedOn": "2017-09-20T11:06:48.4210315", "requestedOn": "2017-01-01T00:00:00", "toDate": "2017-01-01T00:00:00" },
          { "requestId": 6, "requestedBy": "78", "empCode": null, "ccCode": "6789", "entity": "NSS", "floorCode": 1, "floorStructures": { "floorCode": 1, "floorName": "1", "buildingCode": "90", "buildingStructures": { "buildingCode": "90", "buildingName": "Tower A", "locationCode": "123", "floorStructures": [{ "floorCode": 2, "floorName": "0", "buildingCode": "90", "status": "deactive", "totalSeats": 110, "totalVacantSeats": 110, "openAllocatedSeats": 0, "openVacantSeats": 50, "closedAllocatedSeats": 0, "abvSeats": 60 }, { "floorCode": 3, "floorName": "9", "buildingCode": "90", "status": "deactive", "totalSeats": 190, "totalVacantSeats": 190, "openAllocatedSeats": 0, "openVacantSeats": 90, "closedAllocatedSeats": 0, "abvSeats": 100 }], "status": "deactive" }, "status": "deactive", "totalSeats": 500, "totalVacantSeats": 41, "openAllocatedSeats": 398, "openVacantSeats": 2, "closedAllocatedSeats": 438, "abvSeats": 39 }, "buildingCode": "90", "locationCode": "123", "status": "rejected", "noOfseats": 210, "currentAllocatedseats": 0, "requestReleases": null, "justification": "accepted", "approvedOn": "2017-09-20T11:10:48.6094607", "requestedOn": "2017-01-01T00:00:00", "toDate": "2017-01-01T00:00:00" }];


        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        requestService.getByUserCode(3456).subscribe((mockRequests) => {

          expect(mockRequests.length).toBe(2);
          expect(mockRequests[0].requestedBy).toEqual('78');
          expect(mockRequests[1].requestedBy).toEqual('78');
          expect(mockRequests[1].entity).toEqual('NSS');
          expect(mockRequests[0].buildingCode).toEqual('90');
        });

      }));
  });
  it('should add Request ', fakeAsync(
    inject([RequestService, XHRBackend], (requestService, mockBackened) => {
      console.log(requestService, mockBackened, "hoiioh");
      mockBackened.connections.subscribe((connection) => {
        connection.mockRespond(new ResponseOptions({ status: 200 }))
      });
      let mock = { "requestId": 3, "requestedBy": "98", "empCode": "123", "ccCode": "23", "entity": "NTL", "floorCode": 1, "approvingAuthorities": { "empName": 'Ram' }, "locationStructures": { "locationName": 'Noida' }, "floorStructures": { "floorCode": 1, "floorName": "1", "buildingCode": "90", "buildingStructures": null, "status": "deactive", "totalSeats": 500, "totalVacantSeats": 41, "openAllocatedSeats": 398, "openVacantSeats": 2, "closedAllocatedSeats": 438, "abvSeats": 39 }, "buildingCode": "90", "locationCode": "123", "status": "forwarded", "noOfseats": 420, "currentAllocatedseats": 0, "requestReleases": null, "justification": "", "approvedOn": "2017-09-20T10:35:16.541778", "requestedOn": "2017-01-01T00:00:00", "toDate": "2017-01-01T00:00:00" };

      requestService.post(mock).subscribe((res) => {
        console.log(res, "sgd");
        expect(res.RequestMethod).not.toBeNull();
        expect(res.status).toBe(200);
      })
    })));

  it('should treat 500 as an Observable error', async(inject([RequestService, XHRBackend],
    (requestService, mockBackened) => {

      mockBackened.connections.subscribe((connection: MockConnection) => {
        const options: any = new ResponseOptions({
          body: {},
          status: 500
        });
        const response: any = new Response(options);
        connection.mockError(response);
      });
      requestService.post().catch(res => { }, error => {
        expect(error.status).toBe(500);
      });
    })));

  it('should return an Observable<Array<Request>> of History log',
    inject([RequestService, XHRBackend], (requestService, mockBackend) => {

      const mockResponse =
        {
          "requestId": 3, "requestedBy": "98", "empCode": "123", "ccCode": "23", "entity": "NTL", "floorCode": 1,
          "approvingAuthorities": { "empName": 'Ram' }, "locationStructures": { "locationName": 'Noida' },
          "floorStructures": {
            "floorCode": 1, "floorName": "1", "buildingCode": "90", "buildingStructures": null,
            "status": "deactive", "totalSeats": 500, "totalVacantSeats": 41, "openAllocatedSeats": 398,
            "openVacantSeats": 2, "closedAllocatedSeats": 438, "abvSeats": 39
          }, "buildingCode": "90",
          "locationCode": "123", "status": "forwarded", "noOfseats": 420, "currentAllocatedseats": 0,
          "requestReleases": null, "justification": "", "approvedOn": "2017-09-20T10:35:16.541778",
          "requestedOn": "2017-01-01T00:00:00", "toDate": "2017-01-01T00:00:00"
        };



      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      requestService.getHistoryLogs(98).subscribe((mockRequests) => {
        expect(mockRequests.requestedBy).toEqual('98');
        expect(mockRequests.buildingCode).toEqual('90');
      });

    }));

  it('should return an Observable<Array<Request>> of Transaction',
    inject([RequestService, XHRBackend], (requestService, mockBackend) => {




      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(MOCKTRANSACTION)
        })));
      });

      requestService.getRequestTransaction(1).subscribe((mockRequests) => {
        expect(mockRequests[0].totalSeatsInTheBuilding).toEqual(60);
        expect(mockRequests[1].transactor).toEqual('123');
      });

    }));
});