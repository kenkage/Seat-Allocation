using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Model
{
    public class BuildingStructure
    {
        [Key,DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string BuildingCode { get; set; }

        public string BuildingName { get; set; }

        //ForeignKey Don't forget to turn off cascade delete
        [ForeignKey("LocationStructure")]
        public int LocationCode { set; get; }

        public List<FloorStructure> FloorStructures { get; set; }

        public int TotalSeats { get; set; }

        //public int TotalVacantSeats { get; set; }

        public string Status { get; set; }

    }
}
