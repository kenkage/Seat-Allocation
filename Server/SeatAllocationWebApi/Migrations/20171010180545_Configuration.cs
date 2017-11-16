using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SeatAllocationWebApi.Migrations
{
    public partial class Configuration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "EmpCode",
                table: "Requests",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Requests_EmpCode",
                table: "Requests",
                column: "EmpCode");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_LocationCode",
                table: "Requests",
                column: "LocationCode");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_ApprovingAuthority_EmpCode",
                table: "Requests",
                column: "EmpCode",
                principalTable: "ApprovingAuthority",
                principalColumn: "EmpCode",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_LocationStructures_LocationCode",
                table: "Requests",
                column: "LocationCode",
                principalTable: "LocationStructures",
                principalColumn: "LocationCode",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_ApprovingAuthority_EmpCode",
                table: "Requests");

            migrationBuilder.DropForeignKey(
                name: "FK_Requests_LocationStructures_LocationCode",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_EmpCode",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_LocationCode",
                table: "Requests");

            migrationBuilder.AlterColumn<string>(
                name: "EmpCode",
                table: "Requests",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
