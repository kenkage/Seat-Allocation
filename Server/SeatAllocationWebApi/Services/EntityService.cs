using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Services
{
    public interface IEntityService
    {
        List<Entity> GetAll();
    }
    public class EntityService:IEntityService
    {
        public IEntityRepository _repo;
        public EntityService(IEntityRepository repo)
        {
            _repo = repo;
        }

        public List<Entity> GetAll()
        {
            return _repo.GetAll();
        }
    }
}
