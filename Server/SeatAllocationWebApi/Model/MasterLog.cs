using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Model
{
    public class MasterLog
    {
        [Key]
        public int Logid { get; set; }

        public string ChangeBy { get; set; }

        public DateTime OnDate { get; set; }

        public string Modify { get; set; }

        public string ActionTaken { get; set; }

        public int NoChanged { get; set; }


    }
}
