using Game.Model;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Game.Hubs.Services;
using Game.Hubs.Services.Store;
using Game.Services.Stores;
using Game.Services.Model;

namespace Game
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            services.AddSignalR(options =>
            {
                options.Hubs.EnableDetailedErrors = true;                
                options.Hubs.EnableJavaScriptProxies = false;
            });

            services.AddCors();
            services.AddSingleton<GamesStore>();
            services.AddSingleton<UsersStore>();
            services.AddSingleton<GameBuildersStore>();
            services.AddSingleton<ComputerBrain>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors(builder => builder.WithOrigins("http://localhost:3002").AllowAnyHeader().AllowAnyMethod().AllowCredentials());

            app.UseIISPlatformHandler();
            
            app.UseStaticFiles();
            app.UseWebSockets();
            app.UseSignalR();

           

            app.UseMvc();
            //html5mode routing
            app.Run(context =>
            {                
                context.Response.Redirect("/");
                return Task.FromResult<object>(null);
            });

        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
