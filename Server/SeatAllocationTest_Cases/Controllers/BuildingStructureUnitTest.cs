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
    public class BuildingStructureComponent
    {
        [Fact]
        public void TestingTheGetMethodThatReturnsOkResult()
        {
            //Arrange
            BuildingStructure buildingStructrue = new BuildingStructure();
            var mockService = new Mock<IBuildingStructureServices>();
            mockService.Setup(x => x.Getid("testing")).Returns(buildingStructrue);
            BuildingStructureController obj = new BuildingStructureController(mockService.Object);

            //Act
            var res = (OkObjectResult)obj.Get("testing");

            //Assert
            Assert.Equal(200, res.StatusCode);
        }
        [Fact]
        public void TestingTheGetAllMethodthatreturnTimeOutException()
        {
           //Arrange
            var mockservice = new Mock<IBuildingStructureServices>();
            mockservice.Setup(n => n.GetAll()).Throws(new TimeoutException());

            //act
            BuildingStructureController buildingController = new BuildingStructureController(mockservice.Object);

            //Assert
            var res = buildingController.Get();
           var result =  (StatusCodeResult)res;
           Assert.Equal(102,result.StatusCode);
           
        }
        [Fact]
        public void TestingTheGetAllMethodthatreturnOk()
        {
            //Arrange
            var mockservice = new Mock<IBuildingStructureServices>();
            mockservice.Setup(n => n.GetAll()).Throws(new Exception());

            //act
            BuildingStructureController buildingController = new BuildingStructureController(mockservice.Object);

            //Assert
            var res = buildingController.Get();
            var result = (NotFoundObjectResult)res;
           Assert.Equal("Result Not Found", result.Value);
        }

        [Fact]
        public void TestingThegetAllMethodThatReturnsOk()
        {
            //Arrange
            List<BuildingStructure> list = new List<BuildingStructure>();
            BuildingStructure b=new BuildingStructure();
            b.BuildingCode = "23";
            list.Add(b);
            var mockservice = new Mock<IBuildingStructureServices>();
            mockservice.Setup(n => n.GetAll()).Returns(list);
            //Act
            BuildingStructureController vc = new BuildingStructureController(mockservice.Object);
           
            var res = vc.Get();
            var data = (ObjectResult)res;
           //assert
           Assert.Equal(list, data.Value);
          
        }

        [Fact]
      
            public void TestingTheGetAllMethodthatreturnNoContentresult()
            {
                //Arrange
                List<BuildingStructure> list=new List<BuildingStructure>();
           
                var mockservice = new Mock<IBuildingStructureServices>();
                mockservice.Setup(n => n.GetAll()).Returns(list);

                //act
                BuildingStructureController buildingController = new BuildingStructureController(mockservice.Object);

                //Assert
                var res = buildingController.Get();
                var result = (StatusCodeResult) res;
                Assert.Equal(204, result.StatusCode);
                
            
    }

        [Fact]
        public void TestingThegetAllMethodThatreturnsOk()
        {
            //Arrange
            List<BuildingStructure> ls = new List<BuildingStructure>();
            var mockservice1 = new Mock<IBuildingStructureRepository>();
            var mockservice2 = new Mock<ILocationStructureRepository>();
            mockservice1.Setup(n => n.GetAll()).Returns(ls);
            BuildingStructureServices buildingServices = new BuildingStructureServices(mockservice1.Object, mockservice2.Object);
            var res1 = buildingServices.GetAll();
            Assert.IsType<List<BuildingStructure>>(res1);
        }

        [Fact]
        public void TestingThegetByLocationIdMethodThatreturnsOk()
        {
            //Arrange
            List<BuildingStructure> list = new List<BuildingStructure>();
            BuildingStructure b = new BuildingStructure();
            b.BuildingCode = "12";
            list.Add(b);
            var mockservice = new Mock<IBuildingStructureServices>();
            //Act
            mockservice.Setup(n => n.GetByLocationId(It.IsAny<int>())).Returns(list);

            BuildingStructureController vc = new BuildingStructureController(mockservice.Object);
            //Assert
            var res = vc.GetByLocationId(1);
            var data = (ObjectResult)res;
            Assert.Equal(list, data.Value);
        }
        [Fact]
        public void TestingTheGetByLocationIdMethodthatreturnBadRequest()
        {
            //Arrange
            List<BuildingStructure> list = new List<BuildingStructure>();
            BuildingStructure b = new BuildingStructure();
            b.BuildingCode = "23";
            list.Add(b);
            var mockservice = new Mock<IBuildingStructureServices>();
            mockservice.Setup(n => n.GetByLocationId(It.IsAny<int>())).Throws(new Exception());
            //Act
            BuildingStructureController vc = new BuildingStructureController(mockservice.Object);

            //Assert
            var res = vc.GetByLocationId(1);
            var result = (StatusCodeResult)res;
            Assert.Equal(400, result.StatusCode);
        }

        [Fact]
        public void TestingThePostMethodthatReturnsOk()
        {
            //Arrange
            BuildingStructure buildingStructure = new BuildingStructure();
            var mockservice = new Mock<IBuildingStructureServices>();
            mockservice.Setup(m => m.Add(It.IsAny<BuildingStructure>()));

            //Act
            var controller = new BuildingStructureController(mockservice.Object);
            IActionResult action = controller.Post(buildingStructure);
            //Assert
            action = (OkResult)action;
            Assert.IsType(typeof(OkResult), action);
           

        }

        [Fact]
        public void TestingThePostMethodthatReturnsBadRequestException()
        {
            //Arrange
            BuildingStructure buildingStructure = new BuildingStructure() { BuildingCode = "12", BuildingName = "tower A", LocationCode =1 };
            var mockservice = new Mock<IBuildingStructureServices>();
            mockservice.Setup(m => m.Add(It.IsAny<BuildingStructure>())).Throws(new Exception());

            //Act
            var controller = new BuildingStructureController(mockservice.Object);
            //Assert
            IActionResult action = controller.Post(buildingStructure);
            var  result = (StatusCodeResult)action;
            Assert.Equal(400,result.StatusCode);
        }

        [Fact]
        public void TestingthePutMethodThatReturnsOkResult()
        {
            //Arrange
            BuildingStructure buildingStructure = new BuildingStructure() {BuildingCode = "123"};
            var mockService = new Mock<IBuildingStructureServices>();

            //Act
            mockService.Setup(m => m.Update("7", buildingStructure));
            BuildingStructureController brc=new BuildingStructureController(mockService.Object);

            //Assert
            var req = brc.Put("7", buildingStructure);
            var result = req as ObjectResult;
            Assert.Equal(200,result.StatusCode);
        }
        [Fact]
        public void TestingthePutMethodThatReturnsBadRequest()
        {
            //Arrange
            BuildingStructure buildingStructure = new BuildingStructure() { BuildingCode = "123" };
            var mockService = new Mock<IBuildingStructureServices>();

            //Act
            mockService.Setup(m => m.Update("7", buildingStructure)).Throws(new Exception());
            BuildingStructureController buildingStructureController = new BuildingStructureController(mockService.Object);

            //Assert
            var req = buildingStructureController.Put("7", buildingStructure);
            var result = (StatusCodeResult)req;
            Assert.Equal(400, result.StatusCode);
        }

        [Fact]
        public void TestingTheDeleteMethodThatReturnsOk()
        {
            var mockservice = new Mock<IBuildingStructureServices>();
            var controller = new BuildingStructureController(mockservice.Object);

            IActionResult action = controller.Delete("10");
            var action1 = action as ObjectResult;

            Assert.Equal(200,action1.StatusCode);

        }
        [Fact]
        public void TestingtheDeletemethodThatReturnsBadRequest()
        {
            //Arrange
            var mockservice = new Mock<IBuildingStructureServices>();
            mockservice.Setup(m => m.Delete(It.IsAny<string>())).Throws(new Exception());
            var controller = new BuildingStructureController(mockservice.Object);
            //Act
            IActionResult action = controller.Delete("10");
            var action1 = action as StatusCodeResult;

            //Assert
            Assert.Equal(400,action1.StatusCode);
        }
        [Fact]
        public void TestingTheDeleteMethodthatReturns404Result()
        { 
            //Arrange
            string id = null;
            var mockobj = new Mock<IBuildingStructureServices>();
            //Act
            mockobj.Setup(x => x.Delete(id));
            BuildingStructureController obj1 = new BuildingStructureController(mockobj.Object);
            var result = obj1.Delete(id);
            //Assert
            var result1 = (StatusCodeResult)result;
            Assert.Equal(404, result1.StatusCode);
        }
       


        [Fact]
        public void TestingtheGetMethodThatReturnsBadRequest()
        {

            BuildingStructure buildingStructrue = new BuildingStructure();

            var mockService = new Mock<IBuildingStructureServices>();
            mockService.Setup(x => x.Getid("testing")).Throws(new Exception());
            BuildingStructureController obj = new BuildingStructureController(mockService.Object);
            var res = (BadRequestObjectResult)obj.Get("testing");

            Assert.Equal(400, res.StatusCode);
        }







    }
}
