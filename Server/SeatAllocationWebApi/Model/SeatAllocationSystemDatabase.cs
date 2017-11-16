using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeatAllocationWebApi.Model
{
    public class SeatAllocationSystemDatabase :DbContext
    {
        public SeatAllocationSystemDatabase(DbContextOptions options) :base(options)
        {
            var builder = new ConfigurationBuilder()              
                .AddJsonFile("configuration.json", optional: false, reloadOnChange: true);
            Configuration = builder.Build();
        }
        public IConfigurationRoot Configuration { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Request>()
                .Property(r => r.RequestedOn)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Transaction>()
                .Property(d => d.DateOfTransaction)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<ApprovingAuthority>()
                .Property(a => a.Status)
                .HasDefaultValue(Configuration["active"]);

            modelBuilder.Entity<BuildingStructure>()
                .Property(b => b.Status)
                .HasDefaultValue(Configuration["deactive"]);

            modelBuilder.Entity<CcCode>()
               .Property(c => c.Status)
               .HasDefaultValue(Configuration["active"]);

            modelBuilder.Entity<Entity>()
               .Property(c => c.Status)
               .HasDefaultValue(Configuration["active"]);

            modelBuilder.Entity<FloorStructure>()
               .Property(c => c.Status)
               .HasDefaultValue(Configuration["deactive"]);

            modelBuilder.Entity<LocationStructure>()
               .Property(c => c.Status)
               .HasDefaultValue(Configuration["deactive"]);

            modelBuilder.Entity<Request>()
               .Property(c => c.Status)
               .HasDefaultValue(Configuration["pending"]);

        }

        public DbSet<BuildingStructure> BuildingStructures { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<LocationStructure> LocationStructures { get; set; }
        public DbSet<FloorStructure> FloorStructures { get; set; }
        
        public DbSet<ApprovingAuthority> ApprovingAuthority { get; set; }
        public DbSet<MasterLog> MasterLogs { get; set; }
        public DbSet<CcCode> CcCodes { get; set; }
        public DbSet<Entity> Entities { get; set; }
        public DbSet<MonthlyReport> MonthlyReports { get; set; }

        public DbSet<Transaction> Transactions { get; set; }

    }
}
 