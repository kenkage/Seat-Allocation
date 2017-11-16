using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Model
{
    public class ApprovingAuthority
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string EmpCode { get; set; }

        public string EmpName { get; set; }

        public string Status { get; set; }
    }
}
