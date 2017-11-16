using SeatAllocationWebApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Repository
{
    public interface ICcCodeRepository
    {
        List<CcCode> GetAll();
    }
    public class CcCodeRepository : ICcCodeRepository
    {
        public SeatAllocationSystemDatabase _context;
        public CcCodeRepository(SeatAllocationSystemDatabase context)
        {
            _context = context;
        }
        public List<CcCode> GetAll()
        {
            return _context.CcCodes.ToList();
        }
    }
}
