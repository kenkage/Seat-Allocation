using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SeatAllocationWebApi.Services;

namespace SeatAllocationWebApi.Controllers
{
    [Authorize]
    [Produces("application/json")]
    public class ApprovingAuthorityController : Controller
    {
        private IApprovingAuthorityServices _services;
        public ApprovingAuthorityController(IApprovingAuthorityServices services)
        {
            _services = services;
        }
        // GET api/ApprovingAuthority
        [HttpGet]
        [Route("api/[controller]")]
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

      

    }
}
