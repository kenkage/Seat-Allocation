//Importing Service and custom libraries
import { AddFloorService } from "./add-floor.service";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { async,inject } from '@angular/core/testing';
import { MOCKFLOORS} from "../../../testing/mock-data";
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';


//test suite describe what is being tested
describe('AddFloorService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
       
        AddFloorService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });


  describe('getFloors()', () => {
//testing and making mock of service method getFloors()
    it('should return an Observable<Array<Floors>>',
        inject([AddFloorService, XHRBackend], (addFloorService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(MOCKFLOORS)
          })));
        });

        addFloorService.getFloors(90).subscribe((mockFloors) => {
         expect(mockFloors.length).toBe(3);
         expect(mockFloors[0].buildingCode).toEqual('90');
         expect(mockFloors[1].status).toEqual('deactive');
        });

    }));
  });

  describe('getFloorsByFloorId()', () => {
    //making mock of service method getFloorsByFloorId() and test cases
        it('should return an Observable<Object<Floor>>',
            inject([AddFloorService, XHRBackend], (addFloorService, mockBackend) => {
    
            const mockResponse = 
            {"floorCode":1,"floorName":"1","buildingCode":"90","buildingStructures":null,"status":"deactive","totalSeats":500,"totalVacantSeats":41,"openAllocatedSeats":398,"openVacantSeats":2,"closedAllocatedSeats":438,"abvSeats":39};
                       
              mockBackend.connections.subscribe((connection) => {
              connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockResponse)
              })));
            });
    
            addFloorService.getFloorsByFloorId(1).subscribe((mockFloors) => {
            
             expect(mockFloors.floorCode).toEqual(1);
             expect(mockFloors.totalSeats).toEqual(500);
       
            });
    
        }));
      });
  
});
