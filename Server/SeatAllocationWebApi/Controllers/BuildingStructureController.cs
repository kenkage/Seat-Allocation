using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Services;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;

namespace SeatAllocationWebApi.Controllers
{
    [Authorize]
    [Produces("application/json")]
    public class BuildingStructureController : Controller
    {
        private IBuildingStructureServices _services;
        public BuildingStructureController(IBuildingStructureServices services)
        {
            _services = services;
            var builder = new ConfigurationBuilder()
                .AddJsonFile("configuration.json", optional: false, reloadOnChange: true);
            Configuration = builder.Build();
        }
        public IConfigurationRoot Configuration { get; set; }
        // GET api/BuildingStructure
        [HttpGet]
        [Route("api/[controller]")]
        public IActionResult Get()
        {
            try
            {
                var buildingService = _services.GetAll();
                if (buildingService.Count != 0)
                {
                     
                    return Ok(_services.GetAll()); // returns a response code of 200
                }
                else
                {
                    return StatusCode(204);// returns a response code of 204(No Content)
                }
            }

            catch (TimeoutException ex)
            {
                return StatusCode(102); // returns a response code of 102
            }
            catch (Exception ex)
            {
                return NotFound(Configuration["notFound"]);
            }
        }
        // GET api/BuildingStructure/Get/5
        [HttpGet]
        [Route("api/[controller]/Get/{id}")]
        
        public IActionResult Get(string id)
        {
            try
            {
               
                return Ok(_services.Getid(id)); // returns a response code of 200
            }
            catch
            {
                return BadRequest(Configuration["Error"]);
            }

        }

        // GET api/BuildingStructure/GetByLocationId/5
        [HttpGet]
        [Route("api/[controller]/GetByLocationId/{id}")]
        public IActionResult GetByLocationId(int id)
        {
            try
            {
                // _services.GetByLocationId(id);
                return Ok(_services.GetByLocationId(id)); //getting building by its Location Id
            }
            catch
            {
                return BadRequest();
            }

        }

        // GET api/BuildingStructure/GetByLocationId/5
        [HttpGet]
        [Route("api/[controller]/GetByCsoOwner/{id}")]
        public IActionResult GetByCsoOwner(int id)
        {
            try
            {

                return Ok(_services.GetByCsoOWner(id)); //getting Building by CsoOwner Id
            }
            catch
            {
                return BadRequest();
            }
        }
        // POST api/BuildingStructure
        [HttpPost]
        [Route("api/[controller]")]
        public IActionResult Post([FromBody]BuildingStructure value)
        {
            try
            {
                _services.Add(value);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        // PUT api/BuildingStructure/5
        [HttpPut]
        [Route("api/[controller]/{id}")]
        public IActionResult Put(string id, [FromBody]BuildingStructure value)
        {
            try
            {
                _services.Update(id, value);
                return Ok(Configuration["success"]);//update method 
            }
            catch (System.Exception)
            {

                return BadRequest();
            }

        }

        // DELETE api/BuildingStructure/5
        [HttpDelete]
        [Route("api/[controller]/{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                if (id != null)
                {
                    _services.Delete(id);
                    return Ok(Configuration["deleteSuccess"]);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (System.Exception)
            {
                return BadRequest();
            }

        }
      

    }
}
