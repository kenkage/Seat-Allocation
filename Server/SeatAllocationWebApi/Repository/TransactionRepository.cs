using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SeatAllocationWebApi.Model;

namespace SeatAllocationWebApi.Repository
{
    public interface ITransactionRepository
    {
        List<Transaction> GetAll(int requestId);
    }
    public class TransactionRepository : ITransactionRepository
    {
        private readonly SeatAllocationSystemDatabase _context;
        public TransactionRepository(SeatAllocationSystemDatabase context)
        {
            _context = context;
        }
        public List<Transaction> GetAll(int requestId)
        {
            return _context.Transactions.Where(m=>m.RequestId==requestId).ToList();
        }
    }
}
