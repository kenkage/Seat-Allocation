export const MOCKLOCATIONS = 
[{"locationCode":"123","locationName":"Gurgaon","status":"deactive","csoOwner":3456,"csoOwnerName":"Arbaz","buidingStructures":null},
{"locationCode":"476890","locationName":"Hyderabad","status":"deactive","csoOwner":90765454,"csoOwnerName":"Nishant","buidingStructures":null},
{"locationCode":"67","locationName":"Agra","status":"deactive","csoOwner":9876,"csoOwnerName":"Aabhaas","buidingStructures":null},
{"locationCode":"67879","locationName":"Noida","status":"deactive","csoOwner":213,"csoOwnerName":"Sumit","buidingStructures":null},
{"locationCode":"987","locationName":"Pune","status":"deactive","csoOwner":8900,"csoOwnerName":"Richa","buidingStructures":null},
{"locationCode":"998686","locationName":"Greater Noida Unit-1","status":"deactive","csoOwner":58193,"csoOwnerName":"Vikas Vashisth","buidingStructures":null}];

export const MOCKCCCODES = 
[{"ccCodeId":"1234","status":"active"},{"ccCodeId":"6789","status":"active"}];

export const MOCKENTITIES = 
[{"entityName":"NTL","entityId":1,"status":"active"},
{"entityName":"ESRI","entityId":2,"status":"active"},
{"entityName":"NSS","entityId":3,"status":"active"},
{"entityName":"ICS","entityId":4,"status":"active"}];

export const MOCKAUTHORITY = [{"empCode":"121","buildingCode":"123","empName":"Vikas","status":"active"},
{"empCode":"122","buildingCode":"124","empName":"Rajendra","status":"active"}]

export const MOCKTRANSACTION=[
    {"transactionId":2,"requestId":1,"transactor":"123","requests":null,"floorCode":5,"typeOfTransaction":"pending","dateOfTransaction":"2017-09-09T00:00:00","totalSeatsInTheBuilding":60,"noOfseats":34},
    {"transactionId":3,"requestId":1,"transactor":"123","requests":null,"floorCode":5,"typeOfTransaction":"forwarded","dateOfTransaction":"2017-10-09T00:00:00","totalSeatsInTheBuilding":60,"noOfseats":45}
];

export const MOCKBUILDINGS = 
[{"buildingCode":"90","buildingName":"Tower A","locationCode":"123","floorStructures":null,"status":"deactive"},
 {"buildingCode":"91","buildingName":"Tower B","locationCode":"123","floorStructures":null,"status":"deactive"}];

 export const MOCKFLOORS = 
 [{"floorCode":1,"floorName":"1","buildingCode":"90","buildingStructures":null,"status":"deactive","totalSeats":500,"totalVacantSeats":41,"openAllocatedSeats":398,"openVacantSeats":2,"closedAllocatedSeats":438,"abvSeats":39},
 {"floorCode":2,"floorName":"0","buildingCode":"90","buildingStructures":null,"status":"deactive","totalSeats":110,"totalVacantSeats":110,"openAllocatedSeats":0,"openVacantSeats":50,"closedAllocatedSeats":0,"abvSeats":60},
 {"floorCode":3,"floorName":"9","buildingCode":"90","buildingStructures":null,"status":"deactive","totalSeats":190,"totalVacantSeats":190,"openAllocatedSeats":0,"openVacantSeats":90,"closedAllocatedSeats":0,"abvSeats":100}];


 export const MOCKREQUESTS = 
 [{"requestId":3,"requestedBy":"98","empCode":"123","ccCode":"23","entity":"NTL","floorCode":1,"approvingAuthorities":{"empName":'Ram'},"locationStructures":{"locationName":'Noida'},"floorStructures":{"floorCode":1,"floorName":"1","buildingCode":"90","buildingStructures":null,"status":"deactive","totalSeats":500,"totalVacantSeats":41,"openAllocatedSeats":398,"openVacantSeats":2,"closedAllocatedSeats":438,"abvSeats":39},"buildingCode":"90","locationCode":"123","status":"forwarded","noOfseats":420,"currentAllocatedseats":0,"requestReleases":null,"justification":"","approvedOn":"2017-09-20T10:35:16.541778","requestedOn":"2017-01-01T00:00:00","toDate":"2017-01-01T00:00:00"},
 {"requestId":4,"requestedBy":"98","empCode":"123","ccCode":"23","entity":"NTL","floorCode":1,"approvingAuthorities":{"empName":'Mohan'},"locationStructures":{"locationName":'Noida'},"floorStructures":{"floorCode":1,"floorName":"1","buildingCode":"90","buildingStructures":null,"status":"deactive","totalSeats":500,"totalVacantSeats":41,"openAllocatedSeats":398,"openVacantSeats":2,"closedAllocatedSeats":438,"abvSeats":39},"buildingCode":"90","locationCode":"123","status":"approved","noOfseats":40,"currentAllocatedseats":0,"requestReleases":null,"justification":"accepted","approvedOn":"0001-01-01T00:00:00","requestedOn":"2017-01-01T00:00:00","toDate":"2017-01-01T00:00:00"}
];
export const MOCKPENDINGREQUESTS =
[
{"buildingCode":"1","buildingStructures":{"buildingCode": "1", "buildingName": "TowerAAA", "locationCode": 1, "floorStructures": null,"totalSeats": "45" },"ccCode":"3343",
"currentAllocatedseats":"433","empCode":"50043","entity":"NTL","locationCode":"1","noOfseats":"23","requestId":"2","requestedBy":"Richa",
"requestedOn":"2017-12-02T00:00:00","status":"pending","toDate":"2017-01-02T00:00:00","transactionList":null
},
{"buildingCode":"1","buildingStructures":{"buildingCode": "1", "buildingName": "TowerAAA", "locationCode": 1, "floorStructures": null,"totalSeats": "45" },"ccCode":"3343",
"currentAllocatedseats":"433","empCode":"50043","entity":"NTL","locationCode":"1","noOfseats":"23","requestId":"2","requestedBy":"Richa",
"requestedOn":"2017-12-02T00:00:00","status":"pending","toDate":"2017-01-02T00:00:00","transactionList":null
}
]

export const MOCKFORWARDREQUEST =
[{"requestId":2,"requestedBy":"50042910","empCode":"50042974","ccCode":"90","entity":"ICS","buildingCode":"6789","buildingStructures":{"buildingCode":"6789","buildingName":"Tower A","locationCode":1,"floorStructures":null,"totalSeats":4500,"status":"deactive"},"locationCode":1,"status":"forwarded","noOfseats":50,"currentAllocatedseats":0,"transactionList":null,"requestedOn":"2017-10-06T00:00:00","toDate":"2017-11-01T00:00:00"}]