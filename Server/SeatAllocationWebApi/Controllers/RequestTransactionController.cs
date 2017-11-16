using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SeatAllocationWebApi.Repository;
using SeatAllocationWebApi.Services;
using SeatAllocationWebApi.Model;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SeatAllocationWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class RequestTransactionController : Controller
    {
        private readonly IRequestTransactionService _requestTransactionService;
        public RequestTransactionController(IRequestTransactionService requestTransactionService)
        {
            _requestTransactionService = requestTransactionService;


        }
       

        // POST api/RequestTransaction
        [HttpPost]
        public IActionResult Post([FromBody]RequestTransaction requestTransaction)
        {
            try
            {
                bool result = _requestTransactionService.Add(requestTransaction);
                if (result==true)
                {
                    return StatusCode(200,Ok());//returns status code 200
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

        [HttpPost]
        [Route("api/[controller]/Release")]
        public IActionResult Release([FromBody]RequestTransaction requestTransaction)
        {
            try
            {
                bool result = _requestTransactionService.Release(requestTransaction);
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
