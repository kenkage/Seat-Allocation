using Microsoft.AspNetCore.Mvc;
using Moq;
using SeatAllocationWebApi.Controllers;
using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Services;
using System;
using System.Collections.Generic;
using Xunit;

namespace SeatAllocationTestCases
{
    public class RequestControllerTest
    {



        [Fact]
        public void Request_Controller_GetMethod_Should_Return_OkObjectResult()
        {
            List<Request> requests = new List<Request>();
            var request = new Request();
            request.RequestId = 1;
            requests.Add(request);
            var mockService = new Mock<IRequestService>();
            mockService.Setup(x => x.GetAll()).Returns(requests);
            RequestController obj = new RequestController(mockService.Object);
            var res = obj.Get();
            var result = res as ObjectResult;

            Assert.NotNull(res);

            Assert.Equal(200, result.StatusCode);

        }



        [Fact]
        public void Request_Controller_GetMethod_Should_Throw_Exception()
        {
            List<Request> requests = new List<Request>();
            var request = new Request();
            request.RequestId = 1;
            requests.Add(request);
            var mockService = new Mock<IRequestService>();
            mockService.Setup(x => x.GetAll()).Throws(new Exception());
            RequestController obj = new RequestController(mockService.Object);
            var res = obj.Get();
            var result = (StatusCodeResult) res;
            //Assert.IsType<List<Request>>(res);
            Assert.Equal(500, result.StatusCode);


        }

        [Fact]
        public void Request_Controller_GetMethod_Should_Throw_NullExpcetion_If_Data_Not_Found()
        {
            List<Request> requests = new List<Request>();
            //var request = new Request();
            requests = null;
            //request.RequestId = 1;
            //requests.Add(request);
            var mockService = new Mock<IRequestService>();
            mockService.Setup(x => x.GetAll()).Returns(requests);
            RequestController obj = new RequestController(mockService.Object);
            var res = obj.Get();
            var result = res as StatusCodeResult;
            Assert.Equal(204, result.StatusCode);

        }


        [Fact]
        public void GetByAuthority_ShouldReturn_True_NotNull_EqualList()
        {
            //Arrange
            List<Request> requests = new List<Request>();
            Request request = new Request() { RequestId = 23 };
            requests.Add(request);
            var mockService = new Mock<IRequestService>();
            mockService.Setup(m => m.getByAuthority(It.IsAny<string>())).Returns(requests);
            RequestController requestController = new RequestController(mockService.Object);
            //Act
            IActionResult requestStatus = requestController.GetByAuthority("5");
            OkObjectResult content = (OkObjectResult)requestStatus;
            //Assert
            Assert.IsType<OkObjectResult>(requestStatus);
            Assert.NotNull(requestStatus);
            Assert.Equal(requests, content.Value);
        }
        [Fact]
        public void GetByAuthority_ShouldReturnStatus200()
        {
            //Arrange
            var mockService = new Mock<IRequestService>();
            RequestController requestController = new RequestController(mockService.Object);
            //Act
            var requestStatus = requestController.GetByAuthority("6");
            var contentResult = requestStatus as OkObjectResult;
            //Assert
            Assert.Equal(200, contentResult.StatusCode);
        }
        [Fact]
        public void GetByAuthority_ShouldReturnStatus500()
        {
            //Arrange
            var mockService = new Mock<IRequestService>();
            mockService.Setup(m => m.getByAuthority("3")).Throws(new Exception());
            RequestController controller = new RequestController(mockService.Object);
            //Act
            var requestStatus = controller.GetByAuthority("3");
            var contentResult = requestStatus as StatusCodeResult;
            //Assert
            Assert.Equal(500, contentResult.StatusCode);
        }






        [Fact]
        public void HistoryAuthority_ShouldReturn_True_NotNull_EqualList()
        {
            //Arrange
            List<Request> requests = new List<Request>();
            Request request = new Request() { RequestId = 23 };
            requests.Add(request);
            var mockService = new Mock<IRequestService>();
            mockService.Setup(m => m.HistoryAuthority(It.IsAny<string>())).Returns(requests);
            RequestController requestController = new RequestController(mockService.Object);
            //Act
            IActionResult requestStatus = requestController.HistoryAuthority("5");
            OkObjectResult content = (OkObjectResult)requestStatus;
            //Assert
            Assert.IsType<OkObjectResult>(requestStatus);
            Assert.NotNull(requestStatus);
            Assert.Equal(requests, content.Value);
        }
        [Fact]
        public void HistoryAuthority_ShouldReturnStatus200()
        {
            //Arrange
            var mockService = new Mock<IRequestService>();
            RequestController requestController = new RequestController(mockService.Object);
            //Act
            var requestStatus = requestController.HistoryAuthority("6");
            var contentResult = requestStatus as OkObjectResult;
            //Assert
            Assert.Equal(200, contentResult.StatusCode);
        }
        [Fact]
        public void HistoryAuthority_ShouldReturnStatus500()
        {
            //Arrange
            var mockService = new Mock<IRequestService>();
            mockService.Setup(m => m.HistoryAuthority("3")).Throws(new Exception());
            RequestController controller = new RequestController(mockService.Object);
            //Act
            var requestStatus = controller.HistoryAuthority("3");
            var contentResult = requestStatus as StatusCodeResult;
            //Assert
            Assert.Equal(500, contentResult.StatusCode);
        }
       



          [Fact]
        public void Request_Controller_PutMethod_Should_Returns_NoContentResult()
        {
            Request requests = new Request();
            requests = null;
            var mockService = new Mock<IRequestService>();
            mockService.Setup(x => x.Update(12, requests));
            RequestController obj = new RequestController(mockService.Object);
            var res = obj.Put(12, requests);
            var result = res as StatusCodeResult;
            //  var result = (OkObjectResult)res;
            Assert.Equal(204, result.StatusCode);


        }


        [Fact]
        public void Request_Controller_PutMethod_Throw_Exception()
        {
            List<Request> requests = new List<Request>();
            var request = new Request();
            request.RequestId = 1;
            requests.Add(request);
            var mockService = new Mock<IRequestService>();
            mockService.Setup(x => x.Update(12, request)).Throws(new Exception());
            RequestController obj = new RequestController(mockService.Object);
            var res = obj.Put(12, request);
            var result = (StatusCodeResult) res;
            Assert.Equal(500, result.StatusCode);



        }


        [Fact]
        public void Request_Controller_PutMethod_Should_Throw_Internal_Server_Error()
        {
            List<Request> requests = new List<Request>();
            var request = new Request();
            request.RequestId = 1;
            requests.Add(request);
            var mockService = new Mock<IRequestService>();
            mockService.Setup(x => x.Update(12, null));
            RequestController obj = new RequestController(mockService.Object);
            var res = (NoContentResult) obj.Put(1, null);
            Console.WriteLine("res");

            Assert.Equal(204, res.StatusCode);
        }

        [Fact]
        public void Cso_GetRequest_ShouldReturn_True_NotNull_EqualList()
        {
            //Arrange
            List<Request> requests = new List<Request>();
            Request request = new Request() {RequestId = 23};
            requests.Add(request);
            var mockService = new Mock<IRequestService>();
            mockService.Setup(m => m.GetByCso(It.IsAny<int>())).Returns(requests);
            RequestController requestController = new RequestController(mockService.Object);
            //Act
            IActionResult requestStatus = requestController.Get(5);
            OkObjectResult content = (OkObjectResult) requestStatus;
            //Assert
            Assert.IsType<OkObjectResult>(requestStatus);
            Assert.NotNull(requestStatus);
            Assert.Equal(requests, content.Value);
        }

        [Fact]
        public void Cso_GetRequest_ShouldReturnStatus200()
        {
            //Arrange
            var mockService = new Mock<IRequestService>();
            RequestController requestController = new RequestController(mockService.Object);
            //Act
            var requestStatus = requestController.Get(5);
            var contentResult = requestStatus as OkObjectResult;
            //Assert
            Assert.Equal(200, contentResult.StatusCode);
        }

        [Fact]
        public void Cso_GetRequest_ShouldReturnStatus500()
        {
            //Arrange
            var mockService = new Mock<IRequestService>();
            mockService.Setup(m => m.GetByCso(3)).Throws(new Exception());
            RequestController controller = new RequestController(mockService.Object);
            //Act
            var requestStatus = controller.Get(3);
            var contentResult = requestStatus as StatusCodeResult;
            //Assert
            Assert.Equal(500, contentResult.StatusCode);
        }

        [Fact]
        public void Cso_UpdateRequest_ShouldReturn_Type_NotNull()
        {
            //Arrange
            Request request = new Request();
            request.RequestId = 3;
            var mockservice = new Mock<IRequestService>();
            mockservice.Setup(m => m.Update(It.IsAny<int>(), request));
            RequestController requestcontroller = new RequestController(mockservice.Object);
            //Act
            var result = requestcontroller.Put(2, request);
            var content = result as OkResult;
            //Assert
            Assert.IsType<OkResult>(result);
            Assert.NotNull(content);
        }

        [Fact]
        public void Cso_UpdateRequest_ShouldReturn200()
        {
            //Arrange
            Request request = new Request() {RequestId = 123};
            var mockservice = new Mock<IRequestService>();
            mockservice.Setup(m => m.Update(5, request));
            RequestController requestcontroller = new RequestController(mockservice.Object);
            //Act
            var result = requestcontroller.Put(5, request);
            var contentResult = result as StatusCodeResult;
            //Assert
            Assert.Equal(200, contentResult.StatusCode);
        }

        [Fact]
        public void Cso_UpdateRequest_ShouldReturn500()
        {
            //Arrange
            Request request = new Request() {RequestId = 123};
            var mockservice = new Mock<IRequestService>();
            mockservice.Setup(m => m.Update(5, request)).Throws(new Exception());
            RequestController requestcontroller = new RequestController(mockservice.Object);

            //Act
            var result = requestcontroller.Put(5, request);
            var contentResult = result as StatusCodeResult;
            //Assert
            Assert.Equal(500, contentResult.StatusCode);
        }

        [Fact]
        public void Cso_UpdateRequest_ShouldReturn204()
        {
            //Arrange
            Request request = new Request() {RequestId = 123};
            var mockservice = new Mock<IRequestService>();
            mockservice.Setup(m => m.Update(5, request)).Throws(new Exception());
            RequestController requestcontroller = new RequestController(mockservice.Object);
            //Act
            var result = requestcontroller.Put(5, null);
            var contentResult = result as StatusCodeResult;
            //Assert
            Assert.Equal(204, contentResult.StatusCode);
        }

        [Fact]
        public void Cso_RejectRequest_ShouldReturn200()
        {
            //Assert
            var mockService = new Mock<IRequestService>();
            mockService.Setup(m => m.Delete(It.IsAny<int>()));
            RequestController requestController = new RequestController(mockService.Object);
            //Act
            var requestStatus = requestController.Delete(3);
            var contentResult = requestStatus as StatusCodeResult;
            //Action
            Assert.Equal(200, contentResult.StatusCode);
        }

        [Fact]
        public void Cso_RejectRequest_ShouldReturn500()
        {
            //Assert
            var mockService = new Mock<IRequestService>();
            mockService.Setup(m => m.Delete(It.IsAny<int>())).Throws(new Exception());
            RequestController requestController = new RequestController(mockService.Object);
            //Act
            var requestStatus = requestController.Delete(3);
            var contentResult = requestStatus as StatusCodeResult;
            //Action
            Assert.Equal(500, contentResult.StatusCode);
        }

        [Fact]
        public void PostAction_WithValidInput_ShouldReturnOkResultObject_StatusCode200()
        {
            //Arrange
            var mockService = new Mock<IRequestService>();
            Request request = new Request()
            {
                RequestId = 1,
                RequestedBy = "123",
                BuildingCode = "657",
                CcCode = "234",
                Entity = "76432",
                LocationCode = 87,
                EmpCode = "843"
            };
            mockService.Setup(service => service.Add(It.IsAny<Request>()));

            RequestController requestController = new RequestController(mockService.Object);

            //Act
            var result = requestController.Post(request);
            var result1 = (ObjectResult) result;

            //Assert           
            Assert.NotNull(result);
            Assert.Equal(200, result1.StatusCode);

        }


        [Fact]
        public void PostAction_WithValidInput_ServiceThrowsExeception_ShouldReturnStatusCode500()
        {
            //Arrange
            var mockService = new Mock<IRequestService>();
            Request request = new Request()
            {
                RequestId = 1,
                RequestedBy = "123",
                BuildingCode = "657",
                CcCode = "234",
                Entity = "76432",
                LocationCode = 87,
                EmpCode = "843"
            };
            mockService.Setup(service => service.Add(It.IsAny<Request>())).Throws(new Exception());

            RequestController requestController = new RequestController(mockService.Object);

            //Act
            var result = requestController.Post(request);
            var result1 = (StatusCodeResult) result;

            //Assert
            Assert.NotNull(result);
            Assert.Equal(500, result1.StatusCode);
        }

        [Fact]
        public void PostAction_WithNullInput_ShouldReturnStatusCode404()
        {
            //Arrange
            var mockService = new Mock<IRequestService>();
            Request request = new Request();
            mockService.Setup(service => service.Add(It.IsAny<Request>()));

            RequestController requestController = new RequestController(mockService.Object);

            //Act
            var result = requestController.Post(request);
            var result1 = (StatusCodeResult) result;
            //Assert

            Assert.NotNull(result);
            Assert.Equal(404, result1.StatusCode);
        }


        [Fact]
        public void GetByRequestedByAction_WithValidInput_ShouldReturnOkResult_StatusCode200()
        {
            //Arrange
            var mockService = new Mock<IRequestService>();
            Request request = new Request()


                {RequestId = 123, RequestedBy = "aabhaas"};

            List<Request> requests = new List<Request>();

            requests.Add(request);


            mockService.Setup(service => service.getByRequestedBy(It.IsAny<String>())).Returns(requests);
            RequestController requestController = new RequestController(mockService.Object);

            //Act
            var result = requestController.GetByRequestedBy("123245");
            var result1 = (OkObjectResult) result;

            //Assert
            Assert.Equal(200, result1.StatusCode);
            Assert.Equal(requests, result1.Value);

        }

        [Fact]
        public void GetByRequestedBy_WithUnAvailableRequestedBy_ShouldReturn404()
        {
            //Arrange
            var mockService = new Mock<IRequestService>();
            Request request = new Request();
            List<Request> list = new List<Request>();

            mockService.Setup(service => service.getByRequestedBy(It.IsAny<String>())).Returns(list);
            RequestController requestController = new RequestController(mockService.Object);
            //Act
            var result = requestController.GetByRequestedBy("23");
            var result1 = (NotFoundResult) result;
            //Assert
            Assert.Equal(404, result1.StatusCode);



        }

        [Fact]
        public void GetByRequestedBy_WithValidInput_ServiceThrowsException()
        {
            //Arrange
            var mockService = new Mock<IRequestService>();

            mockService.Setup(service => service.getByRequestedBy(It.IsAny<String>())).Throws(new Exception());

            RequestController requestController = new RequestController(mockService.Object);

            //Act
            var result = requestController.GetByRequestedBy("a");
            var result1 = (StatusCodeResult) result;
            //var result 
            //Assert
            Assert.NotNull(result1);
            Assert.Equal(500, result1.StatusCode);



        }


        [Fact]
        public void Test_Case_To_Check_Return_500_StatusCode_of_Delete_Function()
        {
            //Arrange
            var mockobj = new Mock<IRequestService>();
            int id = 101;
            mockobj.Setup(x => x.Delete(id)).Throws(new Exception());
            RequestController obj1 = new RequestController(mockobj.Object);
            //Act
            var result = obj1.Delete(id);
             var result1 = (StatusCodeResult)result;
            //Assert
            Assert.Equal(500, result1.StatusCode);
            

        }
        [Fact]
        public void Test_Case_To_Check_Return_List_Of_values_in_Delete_Function()
        {

            //Arrange
            var mockobj = new Mock<IRequestService>();
           mockobj.Setup(x => x.Delete(It.IsAny<int>()));
            RequestController requestController = new RequestController(mockobj.Object);
            //Act
            var result = requestController.Delete(12);
            var result1 = (OkResult)result;

            //Assert
            Assert.Equal(200,result1.StatusCode);

        }





    }


}
    

