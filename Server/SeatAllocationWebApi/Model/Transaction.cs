using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeatAllocationWebApi.Model
{
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }

        [ForeignKey("Request")]
        public int RequestId { get; set; }

        public string Transactor { get; set; }//empcode of transactor

        public Request Requests { get; set; }

        [ForeignKey("FloorStructure")]
        public int FloorCode { get; set; }

        public string TypeOfTransaction { get; set; }

        public DateTime DateOfTransaction { get; set; }

        public int  TotalSeatsInTheBuilding { get; set; }

        public int NoOfseats { get; set; }

        public string TypeOfSeat { get; set; }
    }
}
