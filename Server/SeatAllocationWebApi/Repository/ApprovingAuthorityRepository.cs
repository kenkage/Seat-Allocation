using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SeatAllocationWebApi.Model;

namespace SeatAllocationWebApi.Repository
{
    public interface IApprovingAuthorityRepository
    {
        List<ApprovingAuthority> GetAll();
       

    }

    public class ApprovingAuthorityRepository:IApprovingAuthorityRepository
    {
        private readonly SeatAllocationSystemDatabase _context;
        public ApprovingAuthorityRepository(SeatAllocationSystemDatabase context)
        {
            _context = context;
        }

        public List<ApprovingAuthority> GetAll()
        {
            return _context.ApprovingAuthority.ToList();
        }

     
    }
}
