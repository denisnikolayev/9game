﻿using Game.Model;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Game.Services.Stores;
using Game.Services.Model;
using Autofac;
using System;
using Autofac.Extensions.DependencyInjection;
using Game.Services;
using Microsoft.AspNet.Authentication.OAuth;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Authentication.Cookies;
using Microsoft.AspNet.Http.Authentication;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
using System.Linq;

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
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            services.AddSignalR(options =>
            {
                options.Hubs.EnableDetailedErrors = true;                
                options.Hubs.EnableJavaScriptProxies = false;
            });
            services.AddCors();
            services.AddAuthentication(options=>options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme);

            // Init autofac
            var containerBuilder = new ContainerBuilder();
            containerBuilder.Populate(services);
            containerBuilder.RegisterModule<ConfigurationModule>();
            var container = containerBuilder.Build();

            return container.Resolve<IServiceProvider>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors(builder => builder.WithOrigins("http://localhost:3002").AllowAnyHeader().AllowAnyMethod().AllowCredentials());

            app.UseIISPlatformHandler();

            app.UseCookieAuthentication(options =>
            {
                options.AutomaticAuthenticate = true;
                options.AutomaticChallenge = true;
            });           

            app.UseOAuthAuthentication(new OAuthOptions
            {
                AuthenticationScheme = "Vk",
                DisplayName = "Vk",
                ClientId = "5378050",
                ClientSecret = "gG5K1DsC9vcGZZRtHdPJ",
                CallbackPath = new PathString("/signin-vkontakte"),
                AuthorizationEndpoint = "https://oauth.vk.com/authorize",
                TokenEndpoint = "https://oauth.vk.com/access_token",
                Scope = {"profile" },
                Events = new OAuthEvents()
                {
                    OnCreatingTicket = async (context) =>
                    {
                        var userId = context.TokenResponse.Response["user_id"].ToString();

                        string userInfoLink = "https://api.vk.com/method/" + "users.get.json" +
                                      "?user_ids=" + Uri.EscapeDataString(userId) +
                                      "&fields=" + Uri.EscapeDataString("nickname,screen_name,photo_50,photo_medium");

                        var request = new HttpRequestMessage(HttpMethod.Get, userInfoLink);
                        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);
                        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                        var response = await context.Backchannel.SendAsync(request, context.HttpContext.RequestAborted);
                        response.EnsureSuccessStatusCode();

                        var user = JObject.Parse(await response.Content.ReadAsStringAsync()).Property("response").First().First();

                        var identifier = user.Value<string>("uid");
                        if (!string.IsNullOrEmpty(identifier))
                        {
                            context.Identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, identifier));
                        }
                    },
                     OnTicketReceived = (ticket) =>
                     {
                         return Task.FromResult(0);
                     }
                }
            });

            app.Map("/login", sign =>
            {
                sign.Run(async context =>
                {
                    var authType = context.Request.Query["authscheme"];
                    if (!string.IsNullOrEmpty(authType))
                    {
                        // By default the client will be redirect back to the URL that issued the challenge (/login?authtype=foo),
                        // send them to the home page instead (/).
                        await context.Authentication.ChallengeAsync(authType, new AuthenticationProperties() { RedirectUri = "/" });
                        return;
                    }
                });
            });

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
