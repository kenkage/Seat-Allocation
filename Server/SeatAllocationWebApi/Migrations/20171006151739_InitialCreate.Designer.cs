using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using SeatAllocationWebApi.Model;

namespace SeatAllocationWebApi.Migrations
{
    [DbContext(typeof(SeatAllocationSystemDatabase))]
    [Migration("20171006151739_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SeatAllocationWebApi.Model.ApprovingAuthority", b =>
                {
                    b.Property<string>("EmpCode");

                    b.Property<string>("EmpName");

                    b.Property<string>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue("active");

                    b.HasKey("EmpCode");

                    b.ToTable("ApprovingAuthority");
                });

            modelBuilder.Entity("SeatAllocationWebApi.Model.BuildingStructure", b =>
                {
                    b.Property<string>("BuildingCode");

                    b.Property<string>("BuildingName");

                    b.Property<int>("LocationCode");

                    b.Property<string>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue("deactive");

                    b.Property<int>("TotalSeats");

                    b.HasKey("BuildingCode");

                    b.HasIndex("LocationCode");

                    b.ToTable("BuildingStructures");
                });

            modelBuilder.Entity("SeatAllocationWebApi.Model.CcCode", b =>
                {
                    b.Property<string>("CcCodeId");

                    b.Property<string>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue("active");

                    b.HasKey("CcCodeId");

                    b.ToTable("CcCodes");
                });

            modelBuilder.Entity("SeatAllocationWebApi.Model.Entity", b =>
                {
                    b.Property<int>("EntityId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("EntityName");

                    b.Property<string>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue("active");

                    b.HasKey("EntityId");

                    b.ToTable("Entities");
                });

            modelBuilder.Entity("SeatAllocationWebApi.Model.FloorStructure", b =>
                {
                    b.Property<int>("FloorCode")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AbvSeats");

                    b.Property<string>("BuildingCode");

                    b.Property<int>("ClosedAllocatedSeats");

                    b.Property<string>("FloorName");

                    b.Property<int>("OpenAllocatedSeats");

                    b.Property<int>("OpenVacantSeats");

                    b.Property<string>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue("deactive");

                    b.Property<int>("TotalSeats");

                    b.Property<int>("TotalVacantSeats");

                    b.HasKey("FloorCode");

                    b.HasIndex("BuildingCode");

                    b.ToTable("FloorStructures");
                });

            modelBuilder.Entity("SeatAllocationWebApi.Model.LocationStructure", b =>
                {
                    b.Property<int>("LocationCode")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CsoOwner");

                    b.Property<string>("CsoOwnerName");

                    b.Property<string>("LocationName");

                    b.Property<string>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue("deactive");

                    b.Property<int>("TotalSeats");

                    b.HasKey("LocationCode");

                    b.ToTable("LocationStructures");
                });

            modelBuilder.Entity("SeatAllocationWebApi.Model.MasterLog", b =>
                {
                    b.Property<int>("Logid")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ActionTaken");

                    b.Property<string>("ChangeBy");

                    b.Property<string>("Modify");

                    b.Property<int>("NoChanged");

                    b.Property<DateTime>("OnDate");

                    b.HasKey("Logid");

                    b.ToTable("MasterLogs");
                });

            modelBuilder.Entity("SeatAllocationWebApi.Model.MonthlyReport", b =>
                {
                    b.Property<int>("ReportId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AbvSeats");

                    b.Property<int>("CcCode");

                    b.Property<int>("ClosedAllocatedSeats");

                    b.Property<int>("FloorCode");

                    b.Property<int>("OpenAllocatedSeats");

                    b.Property<int>("OpenVacantSeats");

                    b.Property<DateTime>("SnapShotDate");

                    b.Property<int>("TotalSeats");

                    b.Property<int>("TotalVacantSeats");

                    b.HasKey("ReportId");

                    b.ToTable("MonthlyReports");
                });

            modelBuilder.Entity("SeatAllocationWebApi.Model.Request", b =>
                {
                    b.Property<int>("RequestId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BuildingCode");

                    b.Property<string>("CcCode");

                    b.Property<int>("CurrentAllocatedseats");

                    b.Property<string>("EmpCode");

                    b.Property<string>("Entity");

                    b.Property<int>("LocationCode");

                    b.Property<int>("NoOfseats");

                    b.Property<string>("RequestedBy");

                    b.Property<DateTime>("RequestedOn")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getdate()");

                    b.Property<string>("Status")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue("pending");

                    b.Property<DateTime>("ToDate");

                    b.HasKey("RequestId");

                    b.HasIndex("BuildingCode");

                    b.ToTable("Requests");
                });

            modelBuilder.Entity("SeatAllocationWebApi.Model.Transaction", b =>
                {
                    b.Property<int>("TransactionId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateOfTransaction")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("getdate()");

                    b.Property<int>("FloorCode");

                    b.Property<int>("NoOfseats");

                    b.Property<int>("RequestId");

                    b.Property<int>("TotalSeatsInTheBuilding");

                    b.Property<string>("Transactor");

                    b.Property<string>("TypeOfTransaction");

                    b.HasKey("TransactionId");

                    b.HasIndex("RequestId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("SeatAllocationWebApi.Model.BuildingStructure", b =>
                {
                    b.HasOne("SeatAllocationWebApi.Model.LocationStructure")
                        .WithMany("BuidingStructures")
                        .HasForeignKey("LocationCode")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SeatAllocationWebApi.Model.FloorStructure", b =>
                {
                    b.HasOne("SeatAllocationWebApi.Model.BuildingStructure", "BuildingStructures")
                        .WithMany("FloorStructures")
                        .HasForeignKey("BuildingCode");
                });

            modelBuilder.Entity("SeatAllocationWebApi.Model.Request", b =>
                {
                    b.HasOne("SeatAllocationWebApi.Model.BuildingStructure", "BuildingStructures")
                        .WithMany()
                        .HasForeignKey("BuildingCode");
                });

            modelBuilder.Entity("SeatAllocationWebApi.Model.Transaction", b =>
                {
                    b.HasOne("SeatAllocationWebApi.Model.Request", "Requests")
                        .WithMany("TransactionList")
                        .HasForeignKey("RequestId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
