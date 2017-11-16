using Moq;
using SeatAllocationWebApi.Model;
using SeatAllocationWebApi.Services;
using SeatAllocationWebApi.Repository;
using Xunit;

namespace SeatAllocationTest_Cases.Services
{
   public class RequestTransactionUnitTest
    {
        [Fact]
        public void Addmethod__RepositoryReturnTrue_ShouldReturnTrue()
        {
            //Arrange
            var mockRepoTrans = new Mock<IRequestTransactionRepository>();
            mockRepoTrans.Setup(x => x.Add(It.IsAny<RequestTransaction>())).Returns(true);
            RequestTransactionService obj = new RequestTransactionService(mockRepoTrans.Object);

            //Act
            var res = obj.Add(new RequestTransaction() { TransactionId = 1 });
  
            //Assert
            Assert.Equal(true,res);


        }
        [Fact]
        public void Addmethod__RepositoryReturnFalse_ShouldReturnFalse()
        {
            //Arrange
            var mockRepoTrans = new Mock<IRequestTransactionRepository>();
            mockRepoTrans.Setup(x => x.Add(It.IsAny<RequestTransaction>())).Returns(false);
            RequestTransactionService obj = new RequestTransactionService(mockRepoTrans.Object);

            //Act
            var res = obj.Add(new RequestTransaction() { TransactionId = 1 });

            //Assert
            Assert.Equal(false, res);

        }

        [Fact]
        public void Addmethod__NullObjectIsPassed_ShouldReturnFalse()
        {
            //Arrange
            var mockRepoTrans = new Mock<IRequestTransactionRepository>();
            mockRepoTrans.Setup(x => x.Add(It.IsAny<RequestTransaction>())).Returns(true);
            RequestTransactionService obj = new RequestTransactionService(mockRepoTrans.Object);
            RequestTransaction reqTran = null;
           
            //Act
            var res = obj.Add(reqTran);

            //Assert
            Assert.Equal(false, res);

        }


    }
}
