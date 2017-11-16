using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Repository;
using System.Collections.Generic;

namespace SeatAllocationWebApi.Services
{
    public interface IBuildingStructureServices
    {

        void Add(BuildingStructure res);
        List<BuildingStructure> GetAll();
        BuildingStructure Getid(string id);
        void Delete(string id);
        void Update(string id, BuildingStructure res);
        IEnumerable<BuildingStructure> GetByLocationId(int id);
        IEnumerable<BuildingStructure> GetByCsoOWner(int id);


    }
    public class BuildingStructureServices : IBuildingStructureServices
    {
        public IBuildingStructureRepository _repository;
        private readonly ILocationStructureRepository _locRepo;
        public BuildingStructureServices(IBuildingStructureRepository repository, ILocationStructureRepository locRepo)
        {
            _repository = repository;
            _locRepo = locRepo;
        }
        public void Add(BuildingStructure res)
        {
            _repository.Add(res);
        }
        public void Delete(string id)
        {
            _repository.Delete(id);
        }
        public List<BuildingStructure> GetAll()
        {
            return _repository.GetAll();
        }
        public IEnumerable<BuildingStructure> GetByCsoOWner(int id)
        {
            LocationStructure loc = _locRepo.GetByCsoOwner(id);//get location by csoowner
            return _repository.GetByLocationId(loc.LocationCode);//get all buildings by location code 

        }
        public IEnumerable<BuildingStructure> GetByLocationId(int id)
        {
          return _repository.GetByLocationId(id);
        }

        public BuildingStructure Getid(string id)
        {
            return _repository.Get(id);
        }
        public void Update(string id, BuildingStructure res)
        {
            _repository.Update(id,res);
        }
    }
}
