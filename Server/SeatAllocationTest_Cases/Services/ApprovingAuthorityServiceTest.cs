using Microsoft.AspNetCore.Mvc;
using Moq;
using SeatAllocationWebApi.Controllers;
using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Repository;
using SeatAllocationWebApi.Services;
using System;
using System.Collections.Generic;
using Xunit;

namespace SeatAllocationTest_Cases
{
    public class ApprovingAuthorityServiceTest
    {


        [Fact]
        public void Request_Service_GetAll_Method_To_GetAll_Request()
        {
            //Arrange
            List<Request> requests = new List<Request>();
            var request = new Request();
            request.RequestId = 1;
            requests.Add(request);           
            var mockRepoReq = new Mock<IRequestRepository>(); //mocking RequestRepository
            var mockRepoLoc = new Mock<ILocationStructureRepository>(); //mocking LocationStructureRepository
            mockRepoReq.Setup(x => x.GetAll()).Returns(requests); //mocking GetAll() of RequestRepository
            RequestService obj = new RequestService(mockRepoLoc.Object, mockRepoReq.Object);

            //Act
            var res = obj.GetAll();
           
            //Assert
            Assert.NotNull(res);
            Assert.Equal(requests, res);
        }
    }
}
    

