using SeatAllocationWebApi.Model;
using System.Collections.Generic;
using System.Linq;

namespace SeatAllocationWebApi.Repository
{
    public interface ILocationStructureRepository
    {

        void Add(LocationStructure location);
        List<LocationStructure> GetAll();
        LocationStructure Getid(int id);
        LocationStructure GetByCsoOwner(int csoOwner);
        void Delete(int id);
        void Update(int id, LocationStructure location);

    }
    public class LocationStructureRepository : ILocationStructureRepository
    {
        private readonly SeatAllocationSystemDatabase _context;
        public LocationStructureRepository(SeatAllocationSystemDatabase context)
        {
            _context = context;
        }

        // Adding the LocationStructure Record in the LocationStructures table passed by the client
        public void Add(LocationStructure location)
        {
            _context.LocationStructures.Add(location);

            //peristing the object passed by the client into the table
            _context.SaveChanges();
        }

        //soft delete; will change the status to deactive
        public void Delete(int id)
        {
            LocationStructure location = _context.LocationStructures.FirstOrDefault(m => m.LocationCode == id);
            location.Status = "deactive";
            _context.SaveChanges();
        }
        public List<LocationStructure> GetAll()
        {
            return _context.LocationStructures.ToList();
        }

        public LocationStructure GetByCsoOwner(int csoOwner)
        {
            return _context.LocationStructures.FirstOrDefault(l => l.CsoOwner == csoOwner);
        }

        public LocationStructure Getid(int id)
        {
            LocationStructure data = _context.LocationStructures.FirstOrDefault(m => m.LocationCode == id);
            return data;
        }
        public void Update(int id, LocationStructure location)
        {
            LocationStructure data = _context.LocationStructures.FirstOrDefault(m => m.LocationCode == id);
          
            //write update value in data
            data.Status = location.Status;
            data.CsoOwner = location.CsoOwner;
            data.CsoOwnerName = location.CsoOwnerName;
            data.LocationName = location.LocationName;
            data.TotalSeats = location.TotalSeats;
            _context.SaveChanges();
        }
    }
}
