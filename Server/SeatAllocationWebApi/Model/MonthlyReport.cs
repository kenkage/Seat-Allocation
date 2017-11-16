using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Model
{
    public class MonthlyReport
    {
        [Key]
        public int ReportId { get; set; }

        //Off CasCade Delete
        [ForeignKey("FloorStructures")]
        public int FloorCode { get; set; }

        public int CcCode { get; set; }

        public DateTime SnapShotDate { get; set; }
    
        public int TotalSeats { set; get; }

        public int TotalVacantSeats { get; set; }

        public int OpenAllocatedSeats { get; set; }

        public int OpenVacantSeats { get; set; }

        public int ClosedAllocatedSeats { get; set; }

        public int AbvSeats { get; set; }


    }
}
