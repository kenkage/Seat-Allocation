using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Model
{
    public class LocationStructure
    {
        [Key]
        public int LocationCode { get; set; }

        public string LocationName { get; set; }

        public string Status { get; set; }

        public int CsoOwner { set; get; }

        public string CsoOwnerName { set; get; }

        public int  TotalSeats { get; set; }

        public List<BuildingStructure> BuidingStructures { get; set; }


    }
}
