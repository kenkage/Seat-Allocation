using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Repository;
using System.Collections.Generic;

namespace SeatAllocationWebApi.Services
{
    public interface IFloorStructureServices
    {
        void Add(FloorStructure res);
        List<FloorStructure> GetAll();
        FloorStructure Getid(int id);
        //List<FloorStructure> GetByBuildingCode(int buildingCode);
        void Delete(int id);
        void Update(int id, FloorStructure floor);
        IEnumerable<FloorStructure> GetByBuildingCode(string id);
    }
    public class FloorStructureServices: IFloorStructureServices
    {
        public IFloorStructureRepository _repository;
        public FloorStructureServices(IFloorStructureRepository repository)
        {
            _repository = repository;
        }
        public void Add(FloorStructure res)
        {
           
            _repository.Add(res);
        }

        public void Delete(int id)
        {
            _repository.Delete(id);
        }

        public List<FloorStructure> GetAll()
        {
            return _repository.GetAll();
        }

        public IEnumerable<FloorStructure> GetByBuildingCode(string id)
        {
            return _repository.GetByBuildingCode(id);
        }

        //public List<FloorStructure> GetByBuildingCode(int buildingCode)
        //{
        //   return  _repository.GetByBuildingCode(buildingCode);
        //}

        public FloorStructure Getid(int id)
        {
            return _repository.Getid(id);
        }

        public void Update(int id, FloorStructure floor)
        {
            _repository.Update(id, floor);
        }
    }
}
