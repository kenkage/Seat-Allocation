using Microsoft.AspNetCore.Mvc;
using Moq;
using SeatAllocationWebApi.Controllers;
using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Repository;
using SeatAllocationWebApi.Services;
using System;
using System.Collections.Generic;
using Xunit;

namespace SeatAllocationTest_Cases.Controllers
{
    public class RequestFloorTransactionControllerUnitTest
    {
        [Fact]
        public void PostAction_WithValidInput_ShouldReturnOkResultObject_StatusCode200()
        {
            //Arrange
            var mockService = new Mock<IRequestFloorTransactionService>();
            RequestFloorTransaction request = new RequestFloorTransaction()
            {
                RequestId = 1

            };
            mockService.Setup(service => service.Add(It.IsAny<RequestFloorTransaction>())).Returns(true);

            RequestFloorTransactionController requestController = new RequestFloorTransactionController(mockService.Object);

            //Act
            var result = requestController.Post(request);
            var result1 = (ObjectResult)result;

            //Assert           
            Assert.NotNull(result);
            Assert.Equal(200, result1.StatusCode);

        }
        [Fact]
        public void PostAction_ServiceReturnsFalse_ShouldReturnStatusCode500()
        {
            //Arrange
            var mockService = new Mock<IRequestFloorTransactionService>();
            RequestFloorTransaction request= new RequestFloorTransaction();
            mockService.Setup(service => service.Add(It.IsAny<RequestFloorTransaction>())).Throws(new Exception());
            RequestFloorTransactionController obj = new RequestFloorTransactionController(mockService.Object);

            //Act
            var res = obj.Post(request);
            var result = (StatusCodeResult)res;

            //Assert
            Assert.Equal(500, result.StatusCode);


        }
        

    }
}
