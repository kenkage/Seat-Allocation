using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Repository;

namespace SeatAllocationWebApi.Services
{
    public interface ITransactionServices
    {
        List<Transaction> GetAll(int requestId);
    }
    public class TransactionServices : ITransactionServices
    {
        public ITransactionRepository _repository;
        public TransactionServices(ITransactionRepository repository)
        {
            _repository = repository;
        }

        public List<Transaction> GetAll(int requestId)
        {
            return _repository.GetAll(requestId);
        }
    }
}
