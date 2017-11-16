using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Repository;
using System;
using System.Collections.Generic;

namespace SeatAllocationWebApi.Services
{
    public interface ISeatAllocationServices
    {

        void Add(Request res);
        List<Request> GetAll();
        Request Getid(int id);
        void delete(int id);
        void Update(int id, Request res);

    }
    public class SeatAllocationServices : ISeatAllocationServices
    {
        public IRequestRepository _repository;
        public SeatAllocationServices(IRequestRepository repository)
        {
            _repository = repository;
        }
        public void Add(Request res)
        {
            _repository.Add(res);
        }

        public void delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<Request> GetAll()
        {
            return _repository.GetAll();
        }

        public Request Getid(int id)
        {
            return _repository.Getid(id);
        }

        public void Update(int id, Request res)
        {
            _repository.Update(id,res);
        }
    }
}
