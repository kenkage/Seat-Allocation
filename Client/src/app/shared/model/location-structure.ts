export class Location {
  
    constructor(

     // public locationCode: string,

      public locationCode: string,

      public locationName: string,
      public csoOwner: number,
      public csoOwnerName: string,
      public TotalSeats:number
    ) {  }
  
  }
  
  export class AddLocation {
  
    constructor(
   
      public locationName: string,
      public csoOwner: number,
      public csoOwnerName: string,
      public TotalSeats:number,
      public status:string
    ) {  }
  
  }