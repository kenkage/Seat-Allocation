using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder.Internal;
using Microsoft.AspNetCore.Mvc;
using SeatAllocationWebApi.Services;
using Microsoft.AspNetCore.Authorization;

namespace SeatAllocationWebApi.Controllers
{
    [Authorize]
    [Produces("application/json")]
    public class TransactionController:Controller
    {
        private ITransactionServices _services;
        public TransactionController(ITransactionServices services)
        {
            _services = services;
        }
        // GET api/TransactionRepository
        [HttpGet]
        [Route("api/[controller]/{requestId}")]
        public IActionResult Get(int requestId)
        {
            try
            {
                return Ok(_services.GetAll(requestId));
            }
            catch (System.Exception)
            {
                return BadRequest();
            }
        }

    }
}
