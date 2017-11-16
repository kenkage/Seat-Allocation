using SeatAllocationWebApi.Model;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SeatAllocationWebApi.Repository
{
    public interface IFloorStructureRepository
    {

        void Add(FloorStructure floor);
        List<FloorStructure> GetAll();
        FloorStructure Getid(int id);
        void Delete(int id);
        void Update(int id, FloorStructure floor);
        List<FloorStructure> GetByBuildingCode(string id);

    }
    public class FloorStructureRepository: IFloorStructureRepository
    {
        private readonly SeatAllocationSystemDatabase _context;
        public FloorStructureRepository(SeatAllocationSystemDatabase context)
        {
            _context = context;
        }
        public void Add(FloorStructure floor)
        {

            _context.FloorStructures.Add(floor);
            //saving the changes to the database
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            FloorStructure data = _context.FloorStructures.FirstOrDefault(m => m.FloorCode == id);
            _context.FloorStructures.Remove(data);
            //saving the changes to the database
            _context.SaveChanges();
        }

        public List<FloorStructure> GetAll()
        {
            return _context.FloorStructures.Include(b=>b.BuildingStructures).ToList();
        }

        public List<FloorStructure> GetByBuildingCode(string id)
        {
            return _context.FloorStructures.Where(l => l.BuildingCode == id).ToList();
        }

        public FloorStructure Getid(int id)
        {
            //Select floor to be updated by floorId and returning it to the client
            return _context.FloorStructures.Include(b=>b.BuildingStructures).FirstOrDefault(m => m.FloorCode == id);          
        }

        public void Update(int id, FloorStructure floor)
        {
            //Select floor to be updated by floorId
            FloorStructure floorToBeUpdated = _context.FloorStructures.FirstOrDefault(m => m.FloorCode == id);

            //setting the values that will be updated
            floorToBeUpdated.FloorName = floor.FloorName;           
            floorToBeUpdated.BuildingCode = floor.BuildingCode;
            floorToBeUpdated.ClosedAllocatedSeats = floor.ClosedAllocatedSeats;
            floorToBeUpdated.OpenAllocatedSeats = floor.OpenAllocatedSeats;
            floorToBeUpdated.OpenVacantSeats = floor.OpenVacantSeats;
            floorToBeUpdated.TotalSeats = floor.TotalSeats;
            floorToBeUpdated.AbvSeats = floor.AbvSeats;
            floorToBeUpdated.TotalVacantSeats = floor.TotalVacantSeats;

            //saving the changes to the database
            _context.SaveChanges();
        }

    }
}
