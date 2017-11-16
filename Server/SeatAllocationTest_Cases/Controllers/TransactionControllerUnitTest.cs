//using Microsoft.AspNetCore.Mvc;
//using Moq;
//using SeatAllocationWebApi.Controllers;
//using SeatAllocationWebApi.Model;
//using SeatAllocationWebApi.Services;
//using System;
//using Xunit;

//namespace SeatAllocationTest_Cases.Controllers
//{
//   public class TransactionControllerUnitTest
//    {
//        //[Fact]
//        //public void GetAll_Method_Should_Return_OKObjectResult()
//        //{   //Arrange
//        //    var mockService = new Mock<ITransactionServices>();
//        //    var controller = new TransactionController(mockService.Object);

//        //    // Act
//        //    IActionResult actionResult = controller.GetAll(12);
//        //    var contentResult = actionResult as OkObjectResult;

//        //    // Assert
//        //    Assert.Equal(200, contentResult.StatusCode);
//        //    Assert.NotNull(contentResult);

//        //}
//        [Fact]
//        public void GetAll_should_Return_BadRequestResult()
//        {
//            //Arrange
//            Transaction approvingAuthority = new Transaction() { TransactionId = 121 };
//            var mockservice = new Mock<ITransactionServices>();
//            mockservice.Setup(m => m.GetAll()).Throws(new Exception());
//            TransactionController transactionController = new TransactionController(mockservice.Object);

//            //Act
//            var result = transactionController.Get();
//            var contentResult = result as StatusCodeResult;

//            //Assert
//            Assert.Equal(400, contentResult.StatusCode);
//            Assert.NotNull(result);

//        }

//    }
//}
