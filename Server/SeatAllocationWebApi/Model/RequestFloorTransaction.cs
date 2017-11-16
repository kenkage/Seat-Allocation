using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Model
{
    public class RequestFloorTransaction
    {
        public int RequestId { get; set; }

        public string RequestedBy { set; get; }

        public string EmpCode { get; set; }

        public string CcCode { get; set; }

        public string Entity { get; set; }

        public string BuildingCode { get; set; }



        public int LocationCode { set; get; }


        public string Status { get; set; }

        public int NoOfseats { get; set; }

        public int CurrentAllocatedseats { set; get; }

        public List<Transaction> TransactionList { set; get; }

        public DateTime RequestedOn { get; set; }

        public DateTime ToDate { get; set; }

        public int TransactionId { get; set; }

        public string Transactor { get; set; }//empcode of transactor

        public Request Requests { get; set; }


        public string TypeOfTransaction { get; set; }
        public string TypeOfSeat { get; set; }


        public int FloorCode { get; set; }

        public string FloorName { get; set; }


        public int TotalSeats { set; get; }

        public int TotalVacantSeats { get; set; }

        public int OpenAllocatedSeats { get; set; }

        public int OpenVacantSeats { get; set; }

        public int ClosedAllocatedSeats { get; set; }

        public int AbvSeats { get; set; }

    }
}
