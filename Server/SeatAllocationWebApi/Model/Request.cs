using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Model
{
    public class Request
    {
        [Key]
        public int RequestId { get; set; }

        public string RequestedBy { set; get; }

        [ForeignKey("ApprovingAuthority")]
        public string EmpCode { get; set; }

        public ApprovingAuthority ApprovingAuthorities{ get; set; }

        public string CcCode { get; set; }

        public string Entity { get; set; }

        [ForeignKey("BuildingStructure")]
        public string BuildingCode { get; set; }
        public BuildingStructure BuildingStructures { set; get; }

        [ForeignKey("LocationStructure")]
        public int LocationCode { set; get; }

        public LocationStructure LocationStructures { get; set; }


        public string Status { get; set; }

        public int NoOfseats { get; set; }

        public int CurrentAllocatedseats { set; get; }

        public List<Transaction> TransactionList {set; get;}

        public DateTime RequestedOn { get; set; }

        public DateTime ToDate { get; set; }

    }
}
