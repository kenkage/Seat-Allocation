using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SeatAllocationWebApi.Services;
using SeatAllocationWebApi.Model;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SeatAllocationWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class RequestFloorTransactionController : Controller
    {
        private readonly IRequestFloorTransactionService _reqFloorTransService;
        public RequestFloorTransactionController(IRequestFloorTransactionService _reqFloorTransService)
        {
            this._reqFloorTransService = _reqFloorTransService;

        }
        



        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]RequestFloorTransaction requestFloorTransaction)
        {
            try
            {
                bool result = _reqFloorTransService.Add(requestFloorTransaction);
                if (result == true)
                {
                    return StatusCode(200, Ok());//returns status code 200
                }
                else
                {
                    return StatusCode(500);//if transaction fails
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500);//if any exception occours
            }
        }

    }
}
