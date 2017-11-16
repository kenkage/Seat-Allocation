using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Model
{
    public class FloorStructure
    {
        [Key]
        public int FloorCode { get; set; }
        public string FloorName { get; set; }

        //Foreign Key
        [ForeignKey("BuildingStructure")]
        public string BuildingCode { get; set; }

        public BuildingStructure BuildingStructures { get; set; }

        public string Status { get; set; }

        public int TotalSeats { set; get; }

        public int TotalVacantSeats { get; set; }

        public int OpenAllocatedSeats { get; set; }

        public int OpenVacantSeats { get; set; }

        public int ClosedAllocatedSeats { get; set; }

        public int AbvSeats { get; set; }



    }
}
