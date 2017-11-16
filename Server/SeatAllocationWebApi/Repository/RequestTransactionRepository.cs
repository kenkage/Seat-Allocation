
using Microsoft.Extensions.Configuration;
using SeatAllocationWebApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;


namespace SeatAllocationWebApi.Repository
{
    public interface IRequestTransactionRepository
    {
        bool Add(RequestTransaction requestTransaction);
        bool Release(RequestTransaction requestTransaction);

    }
    public class RequestTransactionRepository : IRequestTransactionRepository
    {
        private readonly SeatAllocationSystemDatabase _context;

        public RequestTransactionRepository(SeatAllocationSystemDatabase context )
        {
            _context = context;
            var builder = new ConfigurationBuilder()
                .AddJsonFile("configuration.json", optional: false, reloadOnChange: true);
            Configuration = builder.Build();

        }
        public IConfigurationRoot Configuration { get; set; }
        public bool Add(RequestTransaction requestTransaction)
        { 
            //setting Transaction properties
            Transaction trans = new Transaction();
            trans.RequestId = requestTransaction.RequestId;
            trans.Transactor = requestTransaction.Transactor;
            trans.TypeOfTransaction = requestTransaction.TypeOfTransaction;
            trans.NoOfseats = requestTransaction.NoOfseats;
            
            
            
            using (var transaction = _context.Database.BeginTransaction()) //transaction begins
            {
                try
                {
                    List<FloorStructure> floorList  = _context.FloorStructures.ToList();
                    trans.FloorCode = floorList[0].FloorCode;
                    trans.TotalSeatsInTheBuilding = _context.BuildingStructures.FirstOrDefault(b => b.BuildingCode == requestTransaction.BuildingCode).TotalSeats;

                    _context.Transactions.Add(trans);
                    _context.SaveChanges();

                    Request request = _context.Requests.FirstOrDefault(r => r.RequestId == requestTransaction.RequestId);
                    request.Status = requestTransaction.Status;
  
                    _context.SaveChanges();
            

                    // Commit transaction if all commands succeed, transaction will auto-rollback
                    // when disposed if either commands fails
                    transaction.Commit();
                    return true;
                }
                catch (Exception e)
                {
                    Console.WriteLine( e);
                    return false;//if any one of the commands fails 
                }
            }
        }

        public bool Release(RequestTransaction requestTransaction)
        {
            //setting Transaction properties
            Transaction trans = new Transaction();
            trans.RequestId = requestTransaction.RequestId;
            trans.Transactor = requestTransaction.Transactor;
            trans.TypeOfTransaction = requestTransaction.TypeOfTransaction;
            trans.NoOfseats = requestTransaction.NoOfseats;


            using (var transaction = _context.Database.BeginTransaction()) //transaction begins
            {
                try
                {

                    trans.TotalSeatsInTheBuilding = _context.BuildingStructures.FirstOrDefault(b => b.BuildingCode == requestTransaction.BuildingCode).TotalSeats;
                    Transaction transExist = _context.Transactions.FirstOrDefault(t => t.RequestId == requestTransaction.RequestId);
                    trans.FloorCode = transExist.FloorCode;
                    trans.TypeOfSeat = transExist.TypeOfSeat;
                    _context.Transactions.Add(trans);
                    _context.SaveChanges();

                    Request request = _context.Requests.FirstOrDefault(r => r.RequestId == requestTransaction.RequestId);
                    request.Status = requestTransaction.Status;
                    request.CurrentAllocatedseats = requestTransaction.CurrentAllocatedseats;
                    if (requestTransaction.CurrentAllocatedseats == 0)
                    {
                        request.Status = Configuration["closed"];
                    }
                    _context.SaveChanges();


                    // Commit transaction if all commands succeed, transaction will auto-rollback
                    // when disposed if either commands fails
                    transaction.Commit();
                    return true;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return false;//if any one of the commands fails
                }
            }

        }
    }
}
