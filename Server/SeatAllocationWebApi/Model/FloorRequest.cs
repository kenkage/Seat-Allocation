using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Model
{
    public class FloorRequest
    {
        public int FloorCode { get; set; }
        public string FloorName { get; set; }

        public string BuildingCode { get; set; }

        public int TotalSeats { set; get; }

        public int TotalVacantSeats { get; set; }

        public int OpenAllocatedSeats { get; set; }

        public int OpenVacantSeats { get; set; }

        public int ClosedAllocatedSeats { get; set; }

        public int AbvSeats { get; set; }

        public int RequestId { get; set; }

        public string LocationCode { set; get; }

        public string Status { get; set; }

    }
}
