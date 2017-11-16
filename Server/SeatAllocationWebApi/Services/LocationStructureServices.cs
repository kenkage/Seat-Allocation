
using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Services
{

    public interface ILocationStructureServices
    {

        void Add(LocationStructure res);
        List<LocationStructure> GetAll();
        LocationStructure Getid(int id);
        LocationStructure GetByCsoOwner(int csoOwnerCode);
        void delete(int id);
        void Update(int id, LocationStructure res);

    }
    public class LocationStructureServices: ILocationStructureServices
    {
        public ILocationStructureRepository _repository;
        public LocationStructureServices(ILocationStructureRepository repository)
        {
            _repository = repository;
        }
        public void Add(LocationStructure res)
        {
            _repository.Add(res);
        }

        public void delete(int id)
        {
            _repository.Delete(id);
        }

        public List<LocationStructure> GetAll()
        {
            return _repository.GetAll();
        }

        public LocationStructure GetByCsoOwner(int csoOwnerCode)
        {
           return  _repository.GetByCsoOwner(csoOwnerCode);
        }

        public LocationStructure Getid(int id)
        {
            return _repository.Getid(id);
        }

        public void Update(int id, LocationStructure res)
        {
            _repository.Update(id, res);
        }
    }
}
