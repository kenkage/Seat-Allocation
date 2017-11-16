using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using SeatAllocationWebApi.Services;
using SeatAllocationWebApi.Repository;
using SeatAllocationWebApi.Model;
using Microsoft.AspNetCore.Routing;

namespace SeatAllocationWebApi
{
    public partial  class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddDbContext<SeatAllocationSystemDatabase>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            
           
            services.AddScoped<IBuildingStructureServices, BuildingStructureServices>();
            services.AddScoped<ILocationStructureServices, LocationStructureServices>();
            services.AddScoped<IFloorStructureServices, FloorStructureServices>();
            services.AddScoped<IRequestService, RequestService>();
            services.AddScoped<ICcCodeServices, CcCodeService>();
            services.AddScoped<IEntityService, EntityService>();
            services.AddScoped<IRequestTransactionService, RequestTransactionService>();
            services.AddScoped<ITransactionServices, TransactionServices>();
            services.AddScoped<IApprovingAuthorityServices, ApprovingAuthorityService>();

            services.AddScoped<IRequestRepository, RequestRepository>();           
            services.AddScoped<ILocationStructureRepository, LocationStructureRepository>();          
            services.AddScoped<IFloorStructureRepository, FloorStructureRepository>();          
            services.AddScoped<IBuildingStructureRepository, BuildingStructureRepository>();
            services.AddScoped<ICcCodeRepository, CcCodeRepository>();
            services.AddScoped<IEntityRepository, EntityRepository>();
            services.AddScoped<IRequestTransactionRepository, RequestTransactionRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();
            services.AddScoped<IApprovingAuthorityRepository, ApprovingAuthorityRepository>();



            services.AddMvc()
              .AddJsonOptions(
                    options => options.SerializerSettings.ReferenceLoopHandling
                        = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            ConfigureJwtAuthService(services);
            
            services.AddMvc();
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            app.UseAuthentication();
            app.UseMvc();
        }
        private void ConfigureRoutes(IRouteBuilder obj)
        {
            obj.MapRoute("default", "{controller}/{action?}/{id?}");
            //obj.MapRoute()

        }
    }
}
