using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Services
{
    public interface ICcCodeServices
    {
        List<CcCode> GetAll();
    }
    public class CcCodeService : ICcCodeServices
    {
        public ICcCodeRepository _repo;
        public CcCodeService(ICcCodeRepository repo)
        {
            _repo = repo;
        }
        public List<CcCode> GetAll()
        {
            return _repo.GetAll();
        }
    }
}
