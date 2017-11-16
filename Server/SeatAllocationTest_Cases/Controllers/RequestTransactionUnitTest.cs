using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using SeatAllocationWebApi.Services;
using Moq;
using SeatAllocationWebApi.Controllers;
using Xunit;
using SeatAllocationWebApi.Model;

namespace SeatAllocationTest_Cases.Controllers
{
    public class RequestTransactionUnitTest
    {
        [Fact]
        public void PostAction_ServiceReturnsTrue_ShouldReturnStatusCode200()
        {
            //Arrange
            var mockService = new Mock<IRequestTransactionService>();
            mockService.Setup(x => x.Add(It.IsAny<RequestTransaction>())).Returns(true);
            RequestTransactionController obj = new RequestTransactionController(mockService.Object);

            //Act
            var res = obj.Post(new RequestTransaction(){TransactionId = 1});
            var result = (ObjectResult)res;
      
            //Assert
            Assert.Equal(200, result.StatusCode);


        }

        [Fact]
        public void PostAction_ServiceReturnsFalse_ShouldReturnStatusCode500()
        {
            //Arrange
            var mockService = new Mock<IRequestTransactionService>();
            mockService.Setup(x => x.Add(It.IsAny<RequestTransaction>())).Returns(false);
            RequestTransactionController obj = new RequestTransactionController(mockService.Object);

            //Act
            var res = obj.Post(new RequestTransaction() { TransactionId = 1});
            var result = (StatusCodeResult)res;

            //Assert
            Assert.Equal(500, result.StatusCode);


        }

        [Fact]
        public void PostAction_ServiceThrowsException_ShouldReturnStatusCode500()
        {
            //Arrange
            var mockService = new Mock<IRequestTransactionService>();
            mockService.Setup(x => x.Add(It.IsAny<RequestTransaction>())).Throws(new Exception());
            RequestTransactionController obj = new RequestTransactionController(mockService.Object);

            //Act
            var res = obj.Post(new RequestTransaction() { TransactionId = 1 });
            var result = (StatusCodeResult)res;

            //Assert
            Assert.Equal(500, result.StatusCode);


        }

     


    }
}
