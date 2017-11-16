using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Model
{
    public class CcCode
    {

        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]

        public string CcCodeId { get; set; }

        public string Status { get; set; }

    }
}
