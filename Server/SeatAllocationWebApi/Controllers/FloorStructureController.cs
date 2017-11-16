using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Services;
using System.Collections.Generic;

namespace SeatAllocationWebApi.Controllers
{
    [Authorize]
    [Produces("application/json")]
    public class FloorStructureController : Controller        //Controller for FloorStructure implementing from Controller base class
    { 
        private IFloorStructureServices _services;

        //Injecting FloorStructureService
        public FloorStructureController(IFloorStructureServices services)
        {
            _services = services;
        }

        // GET api/FloorStructure
        [HttpGet]
        [Route("api/[controller]")]
        public IActionResult Get()            //Method for getting all floor objects
        {
            try
            {
                return Ok(_services.GetAll());   // returns a response code of 200
            }
            catch (System.Exception)
            {

                return StatusCode(500);          // returns a response code of 400 
            }
            
        }

        // GET api/FloorStructure/Get/5
        [HttpGet]
        [Route("api/[controller]/Get/{id}")]        //Method for getting floor by Id
        public IActionResult Get(int id)
        {
            try
            {
                return Ok(_services.Getid(id));  // returns a response code of 200 
            }
            catch (System.Exception)
            {

                return BadRequest();  // returns a response code of 400 if Exception
            }
           
        }
        [HttpGet]
        // GET api/FloorStructure/GetByBuildingCode/5
        [Route("api/[controller]/GetByBuildingCode/{id}")] 
        public IActionResult GetByBuildingCode(string id)         //Method for getting floor by Building Code
        {
            try
            {
                if (id == "")
                {
                    return BadRequest();     //Return Bad Request if id is empty
                }
                else
                {


                    List<FloorStructure> buildings = (List<FloorStructure>) _services.GetByBuildingCode(id);   //Returns floor object by Building ids
                    if (buildings.Count != 0)
                    {
                        return Ok(buildings); // returns a OK response if buildings returned are 0
                    }
                    else
                    {
                        return NotFound(); // returns a response code 404 to the client
                    }
                }
            }
            catch
            {
                return StatusCode(500) ;  // returns a response code of 400
            }

        }

        // POST api/FloorStructure
        [HttpPost]
        [Route("api/[controller]")]
        public IActionResult Post([FromBody]FloorStructure floorStructure)      //Method for Post Request
        {
            try
            {
                _services.Add(floorStructure);     //Call to service to add the floor object
                return StatusCode(200,Ok());   // returns a response code of 200
            }
            catch (System.Exception)
            {

                return StatusCode(500);       //returns 500 status when Exception
            }
           

        }

        // PUT api/FloorStructure/5
        [HttpPut]
        [Route("api/[controller]/{id}")]
        public IActionResult Put(int id, [FromBody]FloorStructure floor)          //Method for update Request
        {
            try
            {
                if (floor == null)
                {
                    return NotFound();  // returns a status code of 404
                }
                _services.Update(id, floor);                            //Call to service to update the floor subjected to given id
                return Ok(); // returns a reponse code of 200
            }
            catch (System.Exception)
            {

                return BadRequest();    //Returns 400 when Exception
            }
            
        }

        // DELETE api/FloorStructure/5
        [HttpDelete]
        [Route("api/[controller]/{id}")]
        public IActionResult Delete(int id)                       //Method for Deleting floor object with that id 
        {
            try
            { 
                _services.Delete(id);                             //Call to delete method with defined id
                return NoContent();  // returns a response code of 200
            }
            catch (System.Exception)
            {

                return BadRequest();  //returns 400 when Exception
            }
          
        }



    }
}
