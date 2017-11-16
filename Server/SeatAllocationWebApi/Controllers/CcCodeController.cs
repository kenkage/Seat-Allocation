using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SeatAllocationWebApi.Services;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SeatAllocationWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class CcCodeController : Controller
    {
        private ICcCodeServices _services;
        public CcCodeController(ICcCodeServices services)
        {
            _services = services;
        }

        // GET: api/CcCode
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_services.GetAll());
            }
            catch (System.Exception)
            {

                return BadRequest();
            }
        }

        //// GET api/CcCode/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/CcCode
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/CcCode/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/CcCode/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
