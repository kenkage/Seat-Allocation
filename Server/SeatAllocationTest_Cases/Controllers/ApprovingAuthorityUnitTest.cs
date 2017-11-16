using Microsoft.AspNetCore.Mvc;
using Moq;
using SeatAllocationWebApi.Controllers;
using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Services;
using System;
using System.Collections.Generic;
using Xunit;

namespace SeatAllocationTest_Cases.Controllers
{
   public class ApprovingAuthorityUnitTest
    {
        [Fact]
        public void GetAll_Method_Should_Return_OKObjectResult()
        {   //Arrange
            var mockService = new Mock<IApprovingAuthorityServices>();
            var controller = new ApprovingAuthorityController(mockService.Object);

            // Act
            IActionResult actionResult = controller.Get();
            var contentResult = actionResult as OkObjectResult;

            // Assert
            Assert.Equal(200, contentResult.StatusCode);
            Assert.NotNull(contentResult);

        }
        [Fact]
        public void GetAll_should_Return_BadRequestResult()
        {
            //Arrange
            ApprovingAuthority approvingAuthority = new ApprovingAuthority(){ EmpCode = "121" };
            var mockservice = new Mock<IApprovingAuthorityServices>();
            mockservice.Setup(m => m.GetAll()).Throws(new Exception());
            ApprovingAuthorityController floorController = new ApprovingAuthorityController(mockservice.Object);

            //Act
            var result = floorController.Get();
            var contentResult = result as StatusCodeResult;

            //Assert
            Assert.Equal(400, contentResult.StatusCode);
            Assert.NotNull(result);

        }
       

    }
}
