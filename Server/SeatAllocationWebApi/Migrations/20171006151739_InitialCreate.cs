using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SeatAllocationWebApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApprovingAuthority",
                columns: table => new
                {
                    EmpCode = table.Column<string>(nullable: false),
                    EmpName = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true, defaultValue: "active")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovingAuthority", x => x.EmpCode);
                });

            migrationBuilder.CreateTable(
                name: "CcCodes",
                columns: table => new
                {
                    CcCodeId = table.Column<string>(nullable: false),
                    Status = table.Column<string>(nullable: true, defaultValue: "active")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CcCodes", x => x.CcCodeId);
                });

            migrationBuilder.CreateTable(
                name: "Entities",
                columns: table => new
                {
                    EntityId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EntityName = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true, defaultValue: "active")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entities", x => x.EntityId);
                });

            migrationBuilder.CreateTable(
                name: "LocationStructures",
                columns: table => new
                {
                    LocationCode = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CsoOwner = table.Column<int>(nullable: false),
                    CsoOwnerName = table.Column<string>(nullable: true),
                    LocationName = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true, defaultValue: "deactive"),
                    TotalSeats = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocationStructures", x => x.LocationCode);
                });

            migrationBuilder.CreateTable(
                name: "MasterLogs",
                columns: table => new
                {
                    Logid = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ActionTaken = table.Column<string>(nullable: true),
                    ChangeBy = table.Column<string>(nullable: true),
                    Modify = table.Column<string>(nullable: true),
                    NoChanged = table.Column<int>(nullable: false),
                    OnDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MasterLogs", x => x.Logid);
                });

            migrationBuilder.CreateTable(
                name: "MonthlyReports",
                columns: table => new
                {
                    ReportId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AbvSeats = table.Column<int>(nullable: false),
                    CcCode = table.Column<int>(nullable: false),
                    ClosedAllocatedSeats = table.Column<int>(nullable: false),
                    FloorCode = table.Column<int>(nullable: false),
                    OpenAllocatedSeats = table.Column<int>(nullable: false),
                    OpenVacantSeats = table.Column<int>(nullable: false),
                    SnapShotDate = table.Column<DateTime>(nullable: false),
                    TotalSeats = table.Column<int>(nullable: false),
                    TotalVacantSeats = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonthlyReports", x => x.ReportId);
                });

            migrationBuilder.CreateTable(
                name: "BuildingStructures",
                columns: table => new
                {
                    BuildingCode = table.Column<string>(nullable: false),
                    BuildingName = table.Column<string>(nullable: true),
                    LocationCode = table.Column<int>(nullable: false),
                    Status = table.Column<string>(nullable: true, defaultValue: "deactive"),
                    TotalSeats = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildingStructures", x => x.BuildingCode);
                    table.ForeignKey(
                        name: "FK_BuildingStructures_LocationStructures_LocationCode",
                        column: x => x.LocationCode,
                        principalTable: "LocationStructures",
                        principalColumn: "LocationCode",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FloorStructures",
                columns: table => new
                {
                    FloorCode = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AbvSeats = table.Column<int>(nullable: false),
                    BuildingCode = table.Column<string>(nullable: true),
                    ClosedAllocatedSeats = table.Column<int>(nullable: false),
                    FloorName = table.Column<string>(nullable: true),
                    OpenAllocatedSeats = table.Column<int>(nullable: false),
                    OpenVacantSeats = table.Column<int>(nullable: false),
                    Status = table.Column<string>(nullable: true, defaultValue: "deactive"),
                    TotalSeats = table.Column<int>(nullable: false),
                    TotalVacantSeats = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FloorStructures", x => x.FloorCode);
                    table.ForeignKey(
                        name: "FK_FloorStructures_BuildingStructures_BuildingCode",
                        column: x => x.BuildingCode,
                        principalTable: "BuildingStructures",
                        principalColumn: "BuildingCode",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Requests",
                columns: table => new
                {
                    RequestId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BuildingCode = table.Column<string>(nullable: true),
                    CcCode = table.Column<string>(nullable: true),
                    CurrentAllocatedseats = table.Column<int>(nullable: false),
                    EmpCode = table.Column<string>(nullable: true),
                    Entity = table.Column<string>(nullable: true),
                    LocationCode = table.Column<int>(nullable: false),
                    NoOfseats = table.Column<int>(nullable: false),
                    RequestedBy = table.Column<string>(nullable: true),
                    RequestedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    Status = table.Column<string>(nullable: true, defaultValue: "pending"),
                    ToDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Requests", x => x.RequestId);
                    table.ForeignKey(
                        name: "FK_Requests_BuildingStructures_BuildingCode",
                        column: x => x.BuildingCode,
                        principalTable: "BuildingStructures",
                        principalColumn: "BuildingCode",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    TransactionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateOfTransaction = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    FloorCode = table.Column<int>(nullable: true),
                    NoOfseats = table.Column<int>(nullable: true),
                    RequestId = table.Column<int>(nullable: false),
                    TotalSeatsInTheBuilding = table.Column<int>(nullable: true),
                    Transactor = table.Column<string>(nullable: true),
                    TypeOfTransaction = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.TransactionId);
                    table.ForeignKey(
                        name: "FK_Transactions_Requests_RequestId",
                        column: x => x.RequestId,
                        principalTable: "Requests",
                        principalColumn: "RequestId",
                        onDelete: ReferentialAction.Cascade);

                    table.ForeignKey(
                        name: "FK_Transactions_FloorStructure_FloorCode",
                        column: x => x.FloorCode,
                        principalTable: "FloorStructures",
                        principalColumn: "FloorCode",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BuildingStructures_LocationCode",
                table: "BuildingStructures",
                column: "LocationCode");

            migrationBuilder.CreateIndex(
                name: "IX_FloorStructures_BuildingCode",
                table: "FloorStructures",
                column: "BuildingCode");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_BuildingCode",
                table: "Requests",
                column: "BuildingCode");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_RequestId",
                table: "Transactions",
                column: "RequestId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApprovingAuthority");

            migrationBuilder.DropTable(
                name: "CcCodes");

            migrationBuilder.DropTable(
                name: "Entities");

            migrationBuilder.DropTable(
                name: "FloorStructures");

            migrationBuilder.DropTable(
                name: "MasterLogs");

            migrationBuilder.DropTable(
                name: "MonthlyReports");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "Requests");

            migrationBuilder.DropTable(
                name: "BuildingStructures");

            migrationBuilder.DropTable(
                name: "LocationStructures");
        }
    }
}
