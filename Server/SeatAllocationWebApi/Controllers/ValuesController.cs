using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SeatAllocationWebApi.Services;
using SeatAllocationWebApi.Model;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System;
using Microsoft.AspNetCore.Authorization;

namespace SeatAllocationWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly HttpClient client;
        private string uri = "https://iniitiandev2.niit-tech.com/mobile/Cmn/CmnService/Authenticate?Token=";
    
        public ValuesController()
        {

            client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }
        // GET api/values
        [HttpGet]
        public async Task TokenAuthenticationResult([FromQuery]string token)
        {
            //here we will call the server for the data with the token by using HttpClient GetAsync method
            //here we will get the data from the  HttpResponseMeesage
            //HttpContent will store the content from the response
            try
            {
                if (token != null)
                {
                    using (HttpResponseMessage response = await client.GetAsync(uri + token))
                    {
                        if (response != null)
                        {
                            using (HttpContent content = response.Content)
                            {
                                if (content != null)
                                {
                                    var data = content.ReadAsStringAsync().Result;
                               
                                    //then we will redirect to our angualr app with data
                                    HttpContext.Response.Redirect("http://localhost:4200/app-login/" + data);

                                }
                            }
                        }
                        else
                        {
                            throw new NullReferenceException();
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        // GET api/values/5






    }
}
