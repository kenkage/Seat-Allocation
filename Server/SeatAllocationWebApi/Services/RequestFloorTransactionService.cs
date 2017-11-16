using System;
using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Repository;

namespace SeatAllocationWebApi.Services
{
    public interface IRequestFloorTransactionService
    {
        bool Add(RequestFloorTransaction requestFloorTransaction);
    }
    public class RequestFloorTransactionService : IRequestFloorTransactionService
    {
        private readonly IRequestFloorTransactionRepo _reqFloorTransRepo;
        public RequestFloorTransactionService(IRequestFloorTransactionRepo _reqFloorTransRepo)
        {
            this._reqFloorTransRepo = _reqFloorTransRepo;
        }
        
        public bool Add(RequestFloorTransaction requestFloorTransaction)
        {
            if( requestFloorTransaction!=null)
            {
                return _reqFloorTransRepo.Add(requestFloorTransaction);
            }
            else
            {
                return false;
            }
        }
    }
}
