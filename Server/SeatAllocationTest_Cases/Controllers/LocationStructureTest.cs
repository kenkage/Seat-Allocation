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
    public class LocationStructureTest
    {
     
        // test case to check getall()method when it return error
        [Fact]
        public void Test_Case_To_Check_Return_404_StatusCode_of_Get_ALL_Function()
        {
            List<LocationStructure> list = new List<LocationStructure>();// 
            var mockobj = new Mock<ILocationStructureServices>();
            mockobj.Setup(x => x.GetAll()).Returns(list);
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            IActionResult result = obj1.Get();
            var result1 =(StatusCodeResult)result;
           Assert.Equal(404, result1.StatusCode);
        }
        // test case to check getall()method when it return error
        [Fact]
        public void Test_Case_To_Check_Return_List_Of_values_in_Get_ALL_Function()
        {

            List<LocationStructure> list = new List<LocationStructure>() { new LocationStructure() {LocationCode=101,LocationName="kjdc", CsoOwner=234} };
            var mockobj = new Mock<ILocationStructureServices>();
            mockobj.Setup(x => x.GetAll()).Returns(list);
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            var result = obj1.Get();
            Assert.IsType<OkObjectResult>(result);

        }

        // test case to check getall()method when it return error
        [Fact]
        public void Test_Case_To_Check_Return_500_StatusCode_of_Get_ALL_Function()
        {
            List<LocationStructure> list = new List<LocationStructure>();//
            var mockobj = new Mock<ILocationStructureServices>();
            mockobj.Setup(x => x.GetAll()).Throws(new Exception());
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            IActionResult result = obj1.Get();
            var result1 = (StatusCodeResult)result;
            Assert.Equal(500, result1.StatusCode);
        }

        // test case to check getall()method when it return error
        [Fact]
        public void Test_Case_To_Check_Return_List_Of_values_in_Get_by_id_Function()
        {

            LocationStructure list = new LocationStructure() { LocationCode = 101, LocationName = "pune", CsoOwner = 234 } ;
            var mockobj = new Mock<ILocationStructureServices>();
            mockobj.Setup(x => x.Getid(101)).Returns(list);
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            var result = obj1.Get(101);
                
            Assert.IsType<OkObjectResult>(result);

        }


        // test case to check getall()method when it return error
        [Fact]
        public void Test_Case_To_Check_Return_500_StatusCode_of_Get_by_id_Function()
        {
            LocationStructure list = new LocationStructure();// 
            var mockobj = new Mock<ILocationStructureServices>();
            mockobj.Setup(x => x.Getid(It.IsAny<int>())).Throws(new Exception());
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            IActionResult result = obj1.Get(It.IsAny<int>());
            var result1 = (StatusCodeResult)result;
            Assert.Equal(500, result1.StatusCode);
        }

        // test case to check getall()method when it return error
        [Fact]
        public void Test_Case_To_Check_Return_404_StatusCode_of_Add_Function()
        {
            LocationStructure list = new LocationStructure();
           // list.Equals() = null;
            var mockobj = new Mock<ILocationStructureServices>();
            mockobj.Setup(x => x.Add(list));
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            var result = obj1.Post(It.IsAny<LocationStructure>()); 
            var result1 = (StatusCodeResult)result;
            Assert.Equal(404, result1.StatusCode);
        }

        // test case to check getall()method when it return error
        [Fact]
        public void Test_Case_To_Check_Return_List_Of_values_in_Add_Function()
        {

            LocationStructure list = new LocationStructure() { LocationCode = 101, LocationName = "pune", CsoOwner = 234 };
            var mockobj = new Mock<ILocationStructureServices>();
            mockobj.Setup(x => x.Add(list));
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            var result = obj1.Post(list);

            Assert.IsType<OkObjectResult>(result);

        }


        // test case to check getall()method when it return error
        [Fact]
        public void Test_Case_To_Check_Return_500_StatusCode_of_Add_Function()
        {
            LocationStructure list = new LocationStructure();// { LocationCode = "101", LocationName = "kjdc", CsoOwner = 234 };
            var mockobj = new Mock<ILocationStructureServices>();
            mockobj.Setup(x => x.Add(list)).Throws(new Exception());
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            var result = obj1.Post(list);
            var result1 = (StatusCodeResult)result;
            Assert.Equal(500, result1.StatusCode);
        }


        // test case to check update method when it return error when data is null
        [Fact]
        public void Test_Case_To_Check_Return_404_StatusCode_of_Update_Function_When_value_Null()
        {
            LocationStructure list = new LocationStructure();
            int id = 101;
            var mockobj = new Mock<ILocationStructureServices>();
            mockobj.Setup(x => x.Update(id, list));
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            var result = obj1.Put(id, It.IsAny<LocationStructure>());
            var result1 = (StatusCodeResult)result;
            Assert.Equal(404, result1.StatusCode);
        }


        // test case to check update method when it return error when id is null
        [Fact]
        public void Test_Case_To_Check_Return_404_StatusCode_of_Update_Function_When_Id_null()
        {
            LocationStructure list = new LocationStructure() { LocationCode = 101, LocationName = "pune", CsoOwner = 234 };
            int id =0;
            var mockobj = new Mock<ILocationStructureServices>();
            mockobj.Setup(x => x.Update(id, list));
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            var result = obj1.Put(id, It.IsAny<LocationStructure>());
            var result1 = (StatusCodeResult)result;
            Assert.Equal(404, result1.StatusCode);
        }


        // test case to check update method when it return error
        [Fact]
        public void Test_Case_To_Check_Return_404_StatusCode_of_Update_Function()
        {
            LocationStructure list = new LocationStructure();
            int id = 0;
            var mockobj = new Mock<ILocationStructureServices>();
            mockobj.Setup(x => x.Update(id,list));
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            var result = obj1.Put(id,It.IsAny<LocationStructure>());
            var result1 = (StatusCodeResult)result;
            Assert.Equal(404, result1.StatusCode);
        }

        // test case to check update method when it return success
        [Fact]
        public void Test_Case_To_Check_Return_List_Of_values_in_Update_Function()
        {

            LocationStructure list = new LocationStructure() { LocationCode = 101, LocationName = "pune", CsoOwner = 234 };
            var mockobj = new Mock<ILocationStructureServices>();
            int id = 101;
            mockobj.Setup(x => x.Update(id,list));
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            var result = obj1.Put(id,list);

            Assert.IsType<OkObjectResult>(result);

        }


        // test case to check update method when it return internal server error
        [Fact]
        public void Test_Case_To_Check_Return_500_StatusCode_of_Update_Function()
        {
            LocationStructure list = new LocationStructure();// { LocationCode = "101", LocationName = "kjdc", CsoOwner = 234 };
            var mockobj = new Mock<ILocationStructureServices>();
            int id = 101;
            mockobj.Setup(x => x.Update(id,list)).Throws(new Exception());
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            var result = obj1.Put(id,list);
            var result1 = (StatusCodeResult)result;
            Assert.Equal(500, result1.StatusCode);
        }



        // test case to check delete method when it return success       
        [Fact]
        public void Test_Case_To_Check_Return_List_Of_values_in_Delete_Function()
        {

            LocationStructure list = new LocationStructure() { LocationCode = 101, LocationName = "pune", CsoOwner = 234 };
            var mockobj = new Mock<ILocationStructureServices>();
            int id = 101;
            mockobj.Setup(x => x.delete(id));
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            var result = obj1.Delete(id);

            Assert.IsType<OkObjectResult>(result);

        }


        // test case to check delete method when it return internal server error
        [Fact]
        public void Test_Case_To_Check_Return_500_StatusCode_of_Delete_Function()
        {
            LocationStructure list = new LocationStructure();
            var mockobj = new Mock<ILocationStructureServices>();
            int id = 101;
            mockobj.Setup(x => x.delete(id)).Throws(new Exception());
            LocationStructureController obj1 = new LocationStructureController(mockobj.Object);
            var result = obj1.Delete(id);
            var result1 = (StatusCodeResult)result;
            Assert.Equal(500, result1.StatusCode);
        }
    }
}
