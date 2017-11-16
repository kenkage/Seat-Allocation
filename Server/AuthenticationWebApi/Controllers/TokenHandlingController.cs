using AuthenticationWebApi.Models;
using AuthenticationWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AuthenticationWebApi.Controllers
{
    [Route("api/[controller]")]
    public class TokenHandlingController :Controller
    {
        //some config in the appsettings.json
        private readonly IOptions<Audience> _settings;
        private readonly IConfiguration _config;

        private readonly IRoleIdentificationService _roleIdentificationService;

        //creating the HttpClient object for the get or post call to the server
        private readonly HttpClient _client; 

        public TokenHandlingController(IRoleIdentificationService roleIdentificationService, IOptions<Audience> settings, IConfiguration config)
        {
            _roleIdentificationService = roleIdentificationService;
            _settings = settings;
            _config = config;
            _client = new HttpClient();
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        [HttpGet]
        [Route("TokenAuthenticationResult")]
        public async Task TokenAuthenticationResult([FromQuery]string token)
        {
            //here we will call the server for the data with the token by using HttpClient GetAsync method 
            //here we will get the data from the  HttpResponseMeesage 
            //HttpContent will store the content from the response
            //url of innitian for the token authentication and employee information
            string url = _config["iniitian:AuthUrl"];
            try
            {
                if (token != null)
                {
                    using (HttpResponseMessage response = await _client.GetAsync(url + token))
                    {
                        if (response != null)
                        {
                            string value=null;
                            using (HttpContent content = response.Content)
                            {
                                if (content != null)
                                {
                                    var data = content.ReadAsStringAsync().Result;
                                    var obj = JObject.Parse(data);
                                    string employeeCode =(string) obj.SelectToken("UserID");
                                    string employeeName = (string) obj.SelectToken("UserName");
                                    string emailId = (string) obj.SelectToken("Email");
                                    string validValue = (string) obj.SelectToken("isvalid");
                                    string roleCode = RoleIdentification(employeeCode);
                                    //string supervisor code find 
                                    string superVCode = _roleIdentificationService.SuperviserIdentification(employeeCode);
                                    //setting in Empployee model
                                    Employee emp = new Employee { empCode= employeeCode, empName= employeeName, email= emailId, valid= validValue, role= roleCode,SuperVCode = superVCode};
                                    value= GetJWT(emp);
                                    
                                    HttpContext.Response.Redirect("http://localhost:4200/app-login/"+value);
                                }
                            }
                           // return Ok(value);
                        }
                        else
                        {
                            throw new NullReferenceException();
                        }
                    }
                }
                else
                {
                    throw new NoNullAllowedException();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        private string GetJWT(Employee emp)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sid, emp.empCode),
                new Claim(JwtRegisteredClaimNames.Sub, emp.empName),
                new Claim(JwtRegisteredClaimNames.Email, emp.email),
                new Claim(JwtRegisteredClaimNames.Prn,emp.valid), 
                new Claim(JwtRegisteredClaimNames.Typ, emp.role),
                new Claim(JwtRegisteredClaimNames.Amr,emp.SuperVCode), 
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Value.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _settings.Value.Iss,
                audience: _settings.Value.Aud,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: creds
            );

            var response=new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            };
            return JsonConvert.SerializeObject(response);
        }

        [HttpGet]
        [Route("RoleIdentification/{empCode}")]
        public string RoleIdentification(string empCode)
        {
            try
            {
                //seraching into the niit database for the role of user in our application
                string role = _roleIdentificationService.RoleIdentification(empCode);
                //role variable will store the value kind of role user has in niit
                if (role == "No role found")
                {
                    //if user doesn't have any kind of role in niit which is expected by our application for user
                    return "Not a User";
                }
                //if role has been find for user in our application
                //return the role to the angular app
                return role;
            }
            catch (Exception ex)
            {
                //if any kind of exception is thrown in accessing the role for user
                Console.WriteLine(ex);
                return "somethng went wrong";
            }
        }
    }
}
