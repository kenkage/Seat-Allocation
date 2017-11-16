using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Services
{
    public interface IRequestTransactionService
    {
        bool Add(RequestTransaction requestTransaction);
        bool Release(RequestTransaction requestTransaction);
    }
    public class RequestTransactionService : IRequestTransactionService
    {
        private readonly IRequestTransactionRepository _requestTransactionRepository;
        public RequestTransactionService(IRequestTransactionRepository requestTransactionRepository)
        {
            _requestTransactionRepository = requestTransactionRepository;
        }
        public bool Add(RequestTransaction requestTransaction)
        {

            if (requestTransaction!=null)
            {
                return _requestTransactionRepository.Add(requestTransaction);
            }
            else
            {
                return false;
            }

        }

        public bool Release(RequestTransaction requestTransaction)
        {
            if (requestTransaction != null)
            {
                return _requestTransactionRepository.Release(requestTransaction);
            }
            else
            {
                return false;
            }
        }
    }
}
