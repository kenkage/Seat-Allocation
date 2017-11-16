using SeatAllocationWebApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SeatAllocationWebApi.Repository;

namespace SeatAllocationWebApi.Services
{
    public interface IApprovingAuthorityServices
    {
        List<ApprovingAuthority> GetAll();
      
        
    }
    public class ApprovingAuthorityService : IApprovingAuthorityServices
    {
        public IApprovingAuthorityRepository _repository;
        public ApprovingAuthorityService(IApprovingAuthorityRepository repository)
        {
            _repository = repository;
        }

        public List<ApprovingAuthority> GetAll()
        {
            return _repository.GetAll();
        }

     
    }
}
