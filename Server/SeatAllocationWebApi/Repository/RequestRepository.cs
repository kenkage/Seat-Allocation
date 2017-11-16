using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SeatAllocationWebApi.Model;
using System.Collections.Generic;
using System.Linq;
using System;

namespace SeatAllocationWebApi.Repository
{
    public interface IRequestRepository
    {

        void Add(Request res);
        List<Request> GetAll();
        IEnumerable<Request> getByUserCode(string empCode);
        List<Request> GetByCcCode(string ccCode);
        IEnumerable<Request> getByLocationCode(int locationCode);
        Request Getid(int id);
        void Delete(int id);
        void Update(int id, Request res);
        IEnumerable<Request> getByRequestedBy(string requestedBy);
        IEnumerable<Request> PendingRequest(string authorityid);
        IEnumerable<Request> HistoryAuthority(string authorityId);
    }
    public class RequestRepository : IRequestRepository
    {
        public SeatAllocationSystemDatabase _context;
        public RequestRepository(SeatAllocationSystemDatabase context)
        {
            _context = context;
            var builder = new ConfigurationBuilder()
                
                .AddJsonFile("configuration.json", optional: false, reloadOnChange: true);
            Configuration = builder.Build();
        }
        public IConfigurationRoot Configuration { get; set; }
        public void Add(Request res)
        {
            _context.Requests.Add(res);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            Request data = _context.Requests.FirstOrDefault(m => m.RequestId == id);
            data.Status = Configuration["rejected"];
            _context.SaveChanges();
        }


        public List<Request> GetAll()
        {
            return _context.Requests.ToList();
        }

        public IEnumerable<Request> getByLocationCode(int locationCode)
        {
            return _context.Requests.Include(f => f.BuildingStructures).Where(r => r.LocationCode == locationCode && r.Status.ToLower().Equals("forwarded"));
        }

        public Request Getid(int id)
        {
            Request data = _context.Requests.FirstOrDefault(m => m.RequestId == id);
            return data;
        }

        public IEnumerable<Request> getByRequestedBy(string requestedBy)
        {
            return _context.Requests.Include(f=>f.BuildingStructures).Where(r => r.RequestedBy == requestedBy);
        }

        public void Update(int id, Request res)
        {
            Request data = _context.Requests.FirstOrDefault(m => m.RequestId == id);

            data.NoOfseats = res.NoOfseats;
            data.Status = res.Status;
            _context.SaveChanges();
        }

        public IEnumerable<Request> PendingRequest(string authorityid)
        {

            return _context.Requests.Include(b=>b.BuildingStructures).ToList().Where(m => m.Status == Configuration["pending"] && m.EmpCode == authorityid);

        }

        public IEnumerable<Request> HistoryAuthority(string authorityId)
        {
            return _context.Requests.ToList().Where(m => (m.Status == Configuration["forwarded"] || m.Status == Configuration["rejected"]) && m.EmpCode == authorityId);
        }

        public IEnumerable<Request> getByUserCode(string empCode)
        {
            return _context.Requests.Include(m => m.ApprovingAuthorities).Include(l => l.LocationStructures).Where(r => r.RequestedBy == empCode);
        }

        public List<Request> GetByCcCode(string ccCode)
        {
            return _context.Requests.Where(m => m.CcCode == ccCode && m.Status == Configuration["approved"]).ToList();
        }
    }
}
