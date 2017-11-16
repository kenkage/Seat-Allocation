export class Request
{
    constructor(    
        public requestId: string,
        public  requestedBy: string,
        public  empCode: string,
        public  ccCode: string,
        public  entity: string,
       
        public transactionList: string,
        public  buildingCode:string,
        public  locationCode:number,
        public   status: string,
        public   noOfseats:number,
        public   requestedOn: string,
        public currentAllocatedseats:number,
        public  toDate: string
    ){}

}