using Microsoft.AspNetCore.Mvc;
using Moq;
using SeatAllocationWebApi.Controllers;
using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace SeatAllocationTest_Cases.Controllers
{
    public class FloorStructureControllerTest
    {
        [Fact]
        public void GetAll_Method_Should_Return_OKObjectResult()
        {   //Arrange
            var mockService = new Mock<IFloorStructureServices>();
            var controller = new FloorStructureController(mockService.Object);

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
            FloorStructure floor = new FloorStructure() { FloorCode = 123 };
            var mockservice = new Mock<IFloorStructureServices>();
            mockservice.Setup(m => m.GetAll()).Throws(new Exception());
            FloorStructureController floorController = new FloorStructureController(mockservice.Object);

            //Act
            var result = floorController.Get();
            var contentResult = result as StatusCodeResult;

            //Assert
            Assert.Equal(500, contentResult.StatusCode);
            Assert.NotNull(result);

        }

        [Fact]
        public void GetFloorById_Should_Return_Object()
        {
            //Arrange
            var mockService = new Mock<IFloorStructureServices>();
            var controller = new FloorStructureController(mockService.Object);

            // Act
            var actionResult = controller.Get(3);
            var contentResult = actionResult as OkObjectResult;

            // Assert
            Assert.Equal(200, contentResult.StatusCode);
            Assert.NotNull(contentResult);

        }

        [Fact]
        public void GetFloorById_ShouldReturn_BadRequestResult()
        {
            //Arrange
            var mockservice = new Mock<IFloorStructureServices>();
            mockservice.Setup(m => m.Getid(5)).Throws(new Exception());
            FloorStructureController floorController = new FloorStructureController(mockservice.Object);

            //Act
            var result = floorController.Get(5);
            var contentResult = result as StatusCodeResult;

            //Assert
            Assert.Equal(400, contentResult.StatusCode);
            Assert.NotNull(result);
        }

        [Fact]
        public void PostMethod_should_return_OkResult()
        {
            //Arrange
            var mockService = new Mock<IFloorStructureServices>();
            var controller = new FloorStructureController(mockService.Object);

            // Act
            IActionResult actionResult = controller.Post(new FloorStructure());
            var contentResult = actionResult as ObjectResult;

            // Assert
            Assert.Equal(200, contentResult.StatusCode);
            Assert.NotNull(contentResult);
        }


        [Fact]
        public void Post_Should_Return_BadRequest_When_Exception()
        {
            //Arrange
            FloorStructure floor = new FloorStructure() { FloorCode = 123 };
            var mockservice = new Mock<IFloorStructureServices>();
            mockservice.Setup(m => m.Add(floor)).Throws(new Exception());
            FloorStructureController floorController = new FloorStructureController(mockservice.Object);

            //Act
            var result = floorController.Post(floor);
            var contentResult = result as StatusCodeResult;

            //Assert
            Assert.Equal(500, contentResult.StatusCode);
            Assert.NotNull(result);
        }

        [Fact]
        public void PutMethod_Should_Return_OKResult()
        {
            //Arrange
            var mockService = new Mock<IFloorStructureServices>();
            var controller = new FloorStructureController(mockService.Object);

            // Act
            IActionResult actionResult = controller.Put(4, new FloorStructure());
            var contentResult = actionResult as OkResult;

            // Assert
            Assert.Equal(200, contentResult.StatusCode);
            Assert.NotNull(contentResult);
        }

        [Fact]
        public void PutMethod_Should_Return_NotFound_For_NULL()
        {
            var mockService = new Mock<IFloorStructureServices>();
            var controller = new FloorStructureController(mockService.Object);

            // Act
            IActionResult actionResult = controller.Put(4, null);
            var contentresult = actionResult as NotFoundResult;

            // Assert
            Assert.Equal(404, contentresult.StatusCode);
            Assert.NotNull(contentresult);
        }


        [Fact]
        public void PutMethod_Should_Return_BadResult_When_Exception()
        {
            //Arrange
            FloorStructure floor = new FloorStructure() { FloorCode = 123 };
            var mockservice = new Mock<IFloorStructureServices>();
            mockservice.Setup(m => m.Update(5, floor)).Throws(new Exception());
            FloorStructureController floorController = new FloorStructureController(mockservice.Object);

            //Act
            var result = floorController.Put(5, floor);
            var contentResult = result as StatusCodeResult;

            //Assert
            Assert.Equal(400, contentResult.StatusCode);
            Assert.NotNull(result);
        }



        [Fact]
        public void GetByBuildingCode_Should_Return_OKResult()
        {  
            //Arrange
            var mockService = new Mock<IFloorStructureServices>();
            List<FloorStructure> floors = new List<FloorStructure>(){new FloorStructure()};
            mockService.Setup(service => service.GetByBuildingCode(It.IsAny<string>())).Returns(floors);
            FloorStructureController controller = new FloorStructureController(mockService.Object);

            // Act
            var actionResult = controller.GetByBuildingCode("abc");
            var contentResult = (OkObjectResult)actionResult;

            // Assert
            Assert.Equal(200, contentResult.StatusCode);
            Assert.NotNull(contentResult);

        }

        [Fact]
        public void GetByBuildingCode_Should_Return_StatusCodeResult_When_Exception()
        {
            //Arrange
            var mockService = new Mock<IFloorStructureServices>();
            List<FloorStructure> floors = new List<FloorStructure>() { new FloorStructure() };

            mockService.Setup(service => service.GetByBuildingCode(It.IsAny<string>())).Throws(new Exception());
            FloorStructureController controller = new FloorStructureController(mockService.Object);

            // Act
            var actionResult = controller.GetByBuildingCode("abc");
            var contentResult = (StatusCodeResult)actionResult;

            // Assert
            Assert.Equal(500, contentResult.StatusCode);
            Assert.NotNull(contentResult);

        }

        [Fact]
        public void GetByBuildingCode_Should_Return_Notfound()
        {   //Arrange
            var mockService = new Mock<IFloorStructureServices>();
           List<FloorStructure> floors = new List<FloorStructure>();
            
            mockService.Setup(service => service.GetByBuildingCode(It.IsAny<string>())).Returns(floors);
            FloorStructureController controller = new FloorStructureController(mockService.Object);
            
            // Act
            var actionResult = controller.GetByBuildingCode("abc");
            var contentResult = (NotFoundResult)actionResult;

            // Assert
            Assert.Equal(404, contentResult.StatusCode);
            Assert.NotNull(actionResult);
        }

        [Fact]
        public void GetByBuildingCode_Should_Return_BadRequestResult()
        {   //Arrange
            var mockService = new Mock<IFloorStructureServices>();
            List<FloorStructure> floors = new List<FloorStructure>();

            mockService.Setup(service => service.GetByBuildingCode(It.IsAny<string>())).Returns(floors);
            FloorStructureController controller = new FloorStructureController(mockService.Object);

            // Act
            var actionResult = controller.GetByBuildingCode("");
            var contentResult = (BadRequestResult)actionResult;

            // Assert
            Assert.Equal(400, contentResult.StatusCode);
            Assert.NotNull(actionResult);
        }


        [Fact]
        public void Delete_Method_Should_Return_NoContent()
        {
            //Arrange
            var mockService = new Mock<IFloorStructureServices>();
            var controller = new FloorStructureController(mockService.Object);

            // Act
            IActionResult actionResult = controller.Delete(21);
            var contentresult = actionResult as NoContentResult;
            // Assert
            Assert.Equal(204, contentresult.StatusCode);
            Assert.NotNull(contentresult);

        }



        [Fact]
        public void Delete_Method_Should_Return_BadResult_When_Exception()
        {
            //Arrange
            FloorStructure floor = new FloorStructure() { FloorCode = 123 };
            var mockservice = new Mock<IFloorStructureServices>();
            mockservice.Setup(m => m.Delete(5)).Throws(new Exception());
            FloorStructureController floorController = new FloorStructureController(mockservice.Object);

            //Act
            var result = floorController.Delete(5);
            var contentResult = result as StatusCodeResult;

            //Assert
            Assert.Equal(400, contentResult.StatusCode);
            Assert.NotNull(result);
        }
    }
}
