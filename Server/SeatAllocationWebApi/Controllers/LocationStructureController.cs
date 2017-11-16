using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Services;
using System;
using System.Collections.Generic;

namespace SeatAllocationWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class LocationStructureController : Controller
    {
        public ILocationStructureServices _services;
        public LocationStructureController(ILocationStructureServices services)
        {
            _services = services;
            var builder = new ConfigurationBuilder()
                //D:\RestAPI\UnitTestRestAPI\bin\Debug\netcoreapp2.0\configuration.json
                .AddJsonFile("configuration.json", optional: false, reloadOnChange: true);
            Configuration = builder.Build();
        }
        public IConfigurationRoot Configuration { get; set; }
        // GET api/LocationStructure
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
              List<  LocationStructure> list = _services.GetAll();
                if (list.Count != 0)
                {
                    return Ok(list);
                }
                else
                {
                    return StatusCode(404);
                }

            }
            catch
            {

                return StatusCode(500);
            }
        }

        // GET api/LocationStructure/5
        [HttpGet("{locationCode}")]
        public IActionResult Get(int locationCode)
        {


            try
            {
                LocationStructure location = _services.Getid(locationCode);
                if (location.LocationCode>=0)
                {
                    return Ok(location);
                }
                else
                {
                    return StatusCode(404);
                }

            }
            catch
            {

                return StatusCode(500);
            }
           
        }

        // POST api/LocationStructure
        [HttpPost]
        public IActionResult Post([FromBody]LocationStructure locationStructure)
        {
            try
            {
                if (locationStructure!=null)
                {
                    _services.Add(locationStructure);
                    return Ok(Configuration["ok"]);
                }
                else
                {
                    return StatusCode(404);

                }
                
            }
            catch (Exception)
            {

                return StatusCode(500);
            }
            
        }

        // PUT api/LocationStructure/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]LocationStructure value)
        {
            try
            {
                if (id >= 0 && value!=null)
                {
                    _services.Update(id, value);
                    return Ok(Configuration["ok"]);
                }
                else
                {
                    return StatusCode(404);

                }

            }
            catch (Exception)
            {

                return StatusCode(500);
            }
        
        }

      //  DELETE api/LocationStructure/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                if (id >= 0 )//&& value != null)
                {
                    _services.delete(id);
                    return Ok(Configuration["ok"]);
                }
                else
                {
                    return StatusCode(404);

                }

            }
            catch (Exception)
            {

                return StatusCode(500);
            }
           
        }

    }
}
