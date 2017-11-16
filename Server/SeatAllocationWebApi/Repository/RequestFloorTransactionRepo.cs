using System;
using SeatAllocationWebApi.Model;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Collections.Generic;

namespace SeatAllocationWebApi.Repository
{
    public interface IRequestFloorTransactionRepo
    {
        bool Add(RequestFloorTransaction requestFloorTransaction);
    }
    public class RequestFloorTransactionRepo : IRequestFloorTransactionRepo
    {
        private readonly SeatAllocationSystemDatabase _context;
        public RequestFloorTransactionRepo(SeatAllocationSystemDatabase _context)
        {
            this._context = _context;
            var builder = new ConfigurationBuilder()
                .AddJsonFile("configuration.json", optional: false, reloadOnChange: true);
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; set; }

        public bool Add(RequestFloorTransaction requestFloorTransaction)
        {
            //setting Transaction properties
            Transaction trans = new Transaction();
            trans.RequestId = requestFloorTransaction.RequestId;
            trans.Transactor = requestFloorTransaction.Transactor;
            trans.TypeOfTransaction = requestFloorTransaction.TypeOfTransaction;
            trans.NoOfseats = requestFloorTransaction.NoOfseats;
            trans.TypeOfSeat = requestFloorTransaction.TypeOfSeat;
            trans.FloorCode = requestFloorTransaction.FloorCode;



            using (var transaction = _context.Database.BeginTransaction()) //transaction begins
            {
                try
                {                    
                    trans.TotalSeatsInTheBuilding = _context.BuildingStructures.FirstOrDefault(b => b.BuildingCode == requestFloorTransaction.BuildingCode).TotalSeats;             
                    _context.Transactions.Add(trans);
                    _context.SaveChanges();

                    Request request = _context.Requests.FirstOrDefault(r => r.RequestId == requestFloorTransaction.RequestId);
                    request.Status = requestFloorTransaction.Status;
                    request.CurrentAllocatedseats = requestFloorTransaction.CurrentAllocatedseats;
                    request.Status = requestFloorTransaction.Status;
                    _context.SaveChanges();


                    FloorStructure floor = _context.FloorStructures.FirstOrDefault(r => r.FloorCode == requestFloorTransaction.FloorCode);
                    if (requestFloorTransaction.TypeOfSeat.ToLower().Equals(Configuration["openODC"]))
                    {
                        floor.TotalVacantSeats -= requestFloorTransaction.CurrentAllocatedseats;
                        floor.OpenAllocatedSeats += requestFloorTransaction.CurrentAllocatedseats;
                        floor.OpenVacantSeats -= requestFloorTransaction.CurrentAllocatedseats;
                    }
                    else
                    {
                        if (requestFloorTransaction.TypeOfSeat.ToLower().Equals(Configuration["closedODC"]))
                        {
                            floor.TotalVacantSeats -= requestFloorTransaction.CurrentAllocatedseats;
                            floor.ClosedAllocatedSeats += requestFloorTransaction.CurrentAllocatedseats;
                            floor.AbvSeats -= requestFloorTransaction.AbvSeats;
                        }
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
