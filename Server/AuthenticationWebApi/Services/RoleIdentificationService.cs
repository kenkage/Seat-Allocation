using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;

namespace AuthenticationWebApi.Services
{
    public interface IRoleIdentificationService
    {
        string RoleIdentification(string empCode);
        string SuperviserIdentification(string empCode);
    }

    public class RoleIdentificationService : IRoleIdentificationService
    {
        private readonly IConfiguration _config;
        public RoleIdentificationService(IConfiguration config)
        {
            _config = config;
        }
        public string RoleIdentification(string empCode)
        {
            //getting connection string of ntlniitess database
            string connstring = _config["ConnectionStrings:NtlniitessConnection"];
            //creating sql connection object for coonection string
            SqlConnection conn = new SqlConnection(connstring);
            //creating command for query to get the role for cso or location hr or asset controller
            SqlCommand cmd = new SqlCommand("SELECT DISTINCT(in_rolecode) FROM ecc_authorization WHERE ch_empcode=@P1 AND ((in_rolecode=3 OR in_rolecode=9)OR in_rolecode=136)");
            //creating command for query which will check for role of supervisor or user
            SqlCommand query = new SqlCommand("SELECT COUNT(*) FROM ZEMP_MAST_WEB_AL WHERE SUPERVCODE=@P2");

            //setting the parameter value for query
            cmd.Parameters.AddWithValue("p1", empCode);
            query.Parameters.AddWithValue("p2", empCode);
            //seeting conection for the sql comand
            cmd.Connection = conn;
            try
            {
                // open the sql connection
                conn.Open();
                //execute the query using Execute Reader 
                SqlDataReader sdr = cmd.ExecuteReader(CommandBehavior.SingleResult);
                //iterating over response from the database table
                while (sdr.Read())
                {
                    //geeting the role code
                    int rolecode = (int)sdr[0];
                    //checking for CSO role code which is 9
                    if (rolecode == 9)
                    {
                        //user is CSO
                        return "cso-control";
                    }
                    //checking if role code for location HR which is 3
                    else if (rolecode == 3)
                    {
                        //user is HR
                        return "humanresource";
                    }
                    //checking for role code of asset controller which is 136
                    else if (rolecode == 136)
                    {
                        //user is asset controller
                        return "asset-control";
                    }
                }
                //close the connection for current sql command 
                sdr.Close();
                //assigning the sql connection to the new query command
                query.Connection = conn;
                //executing the query
                sdr = query.ExecuteReader(CommandBehavior.SingleResult);
                //reading the response of query execution
                while (sdr.Read())
                {
                    //get the count value from the query
                    int value = (int)sdr[0];
                    //checking for the employee code is also a supervisor code for role identification
                    if (value >= 1)
                    {
                        //user is supervisor 
                        return "supervisor";
                    }
                    else
                    {
                        //user is normal user 
                        return "user";
                    }
                }
            }
            //checking exeption for null response for the database
            catch (NullReferenceException ex)
            {
                Console.WriteLine(ex);
            }
            finally
            {
                //close the connection
                conn.Close();
            }
            return "No role found";

        }



        public string SuperviserIdentification(string empCode)
        {
            //getting connection string of ntlniitess database
            string connstring = _config["ConnectionStrings:NtlniitessConnection"];
            //creating sql connection object for coonection string
            SqlConnection conn = new SqlConnection(connstring);
            //creating command for query to get the role for cso or location hr or asset controller
            SqlCommand cmd = new SqlCommand("SELECT SUPERVCODE FROM ZEMP_MAST_WEB_AL WHERE EMPNO = @P1");


            //setting the parameter value for query
            cmd.Parameters.AddWithValue("p1", empCode);

            //seeting conection for the sql comand
            cmd.Connection = conn;
            try
            {
                // open the sql connection
                conn.Open();
                //execute the query using Execute Reader 
                SqlDataReader sdr = cmd.ExecuteReader(CommandBehavior.SingleResult);
                //iterating over response from the database table
                while (sdr.Read())
                {

                    return (string)sdr[0];

                }



            }
            //checking exeption for null response for the database
            catch (NullReferenceException ex)
            {
                Console.WriteLine(ex);
            }
            finally
            {
                //close the connection
                conn.Close();
            }
            return "No role found";

        }
    }

}
