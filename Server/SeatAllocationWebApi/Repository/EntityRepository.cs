using SeatAllocationWebApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;


namespace SeatAllocationWebApi.Repository
{
    public interface IEntityRepository
    {
        List<Entity> GetAll();
    }
    public class EntityRepository : IEntityRepository
    {
        public SeatAllocationSystemDatabase _context;
        public EntityRepository(SeatAllocationSystemDatabase context)
        {
            _context = context;
        }
        public List<Entity> GetAll()
        {
            return _context.Entities.ToList();
        }
    }
}
