using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SeatAllocationWebApi.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SeatAllocationWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class EntityController : Controller
    {
        private IEntityService _services;
        public EntityController(IEntityService services)
        {
            _services = services;
            var builder = new ConfigurationBuilder()
                //D:\RestAPI\UnitTestRestAPI\bin\Debug\netcoreapp2.0\configuration.json
                .AddJsonFile("configuration.json", optional: false, reloadOnChange: true);
            Configuration = builder.Build();
        }
        public IConfigurationRoot Configuration { get; set; }
        // GET: api/Entity
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_services.GetAll());
            }
            catch (System.Exception)
            {

                return Ok(Configuration["internalServerError"]);
            }

        }

        //// GET api/Entity/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/Entity
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/Entity/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/Entity/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
