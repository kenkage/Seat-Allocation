using SeatAllocationWebApi.Model;
using System.Collections.Generic;
using System.Linq;

namespace SeatAllocationWebApi.Repository
{
    public interface IBuildingStructureRepository
    {

        void Add(BuildingStructure building);
        List<BuildingStructure> GetAll();
        BuildingStructure Get(string id);
        void Delete(string id);
        void Update(string id, BuildingStructure building);
        IEnumerable<BuildingStructure> GetByLocationId(int id);

    }
    public class BuildingStructureRepository : IBuildingStructureRepository
    {
        private readonly SeatAllocationSystemDatabase _context;
        public BuildingStructureRepository(SeatAllocationSystemDatabase context)
        {
            //Initializing DbContext object through dependency injection
            _context = context;
        }

        public void Add(BuildingStructure building)
        {

            _context.BuildingStructures.Add(building);
            //saving the BuildingStructure object passed by the client
            _context.SaveChanges();
        }

        public void Delete(string id)
        {
            //selecting the BuildingStructure from the BuildingStructures Table by BuildingCode passed by the client
            BuildingStructure  buildingStructureToBeRemoved = _context.BuildingStructures.FirstOrDefault(m => m.BuildingCode == id);

            //Removing the BuildingStructure object
            _context.BuildingStructures.Remove(buildingStructureToBeRemoved);

            //persisting the changes made to the database
            _context.SaveChanges();
        }

        public BuildingStructure Get(string id)
        {
            return _context.BuildingStructures.FirstOrDefault(m => m.BuildingCode == id);
             
        }

        //Returns all the records from the BuildingStructures table to the client
        public List<BuildingStructure> GetAll()
        {
            return _context.BuildingStructures.ToList();
        }

        public BuildingStructure GetByLocationCode(int id)
        {
            return  _context.BuildingStructures.FirstOrDefault(m => m.LocationCode == id);      
        }

        public IEnumerable<BuildingStructure> GetByLocationId(int id)
        {
            return _context.BuildingStructures.ToList().Where(l => l.LocationCode == id); 
        }

        public void Update(string id, BuildingStructure building)
        {
            BuildingStructure buildingToBeUpdated = _context.BuildingStructures.FirstOrDefault(m => m.BuildingCode == id);
            buildingToBeUpdated.BuildingName = building.BuildingName;
           // buildingToBeUpdated.Status = building.Status;
          //  buildingToBeUpdated.BuildingCode = building.BuildingCode;
            buildingToBeUpdated.TotalSeats = building.TotalSeats;
            _context.SaveChanges();
        }
    }
}
