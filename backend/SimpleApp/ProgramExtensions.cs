using System.Reflection;
using System.Security.Claims;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using NSwag;
using SimpleApp.Api.Base.Behaviors;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using SimpleApp.Persistence.Contexts;
using SimpleApp.Shared.Constants;
using SimpleApp.Shared.Extensions;

namespace SimpleApp;

internal static class ProgramExtensions
{
    public static void AddMediaR(this WebApplicationBuilder builder)
    {
        builder.Services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
            config.RegisterServicesFromAssemblyContaining<ApplicationAssemblyResolver>();
            
            config.AddOpenBehavior(typeof(CommandValidationBehavior<,>));
        });
        builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly(), includeInternalTypes: true);
    }
    
    internal static void AddApiDocs(this WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddOpenApiDocument(document =>
        {
            document.Title = "SimpleApp API";
            document.SchemaSettings.GenerateEnumMappingDescription = true;

            document.PostProcess = d =>
            {
                d.Info.TermsOfService = "Term of service";
                d.Info.Version = "v1.0";
                d.Info.License = new OpenApiLicense
                {
                    Url = "http://www.apache.org/licenses/LICENSE-2.0.html",
                    Name = "Apache 2.0"
                };
            };
            document.AddSecurity("openId", [], new OpenApiSecurityScheme
            {
                Type = OpenApiSecuritySchemeType.OpenIdConnect,
                OpenIdConnectUrl = "https://localhost/.well-known/openid-configuration",
                In = OpenApiSecurityApiKeyLocation.Header,
                Description = "Standard authorisation using the Bearer scheme. Example: \"bearer {token}\"",
            });
        });
    }

    internal static void ConfigureAuth(this WebApplicationBuilder builder)
    {
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddMicrosoftIdentityWebApi(options =>
        {
            builder.Configuration.Bind("AzureAdB2C", options);

            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters.NameClaimType = GlobalConstants.Claims.Name;

            options.Events = new JwtBearerEvents
            {
                OnTokenValidated = async ctx =>
                {
                    if (ctx.Principal is null)
                    {
                        ctx.Fail("Not possible to detect user context.");
                        return;
                    }

                    var userId = ctx.Principal.FindFirstValue(GlobalConstants.Claims.UserId);
                    if (userId.IsBlank())
                    {
                        ctx.Fail("Not possible to detect user_id.");
                        return;
                    }

                    var context = ctx.HttpContext.RequestServices.GetRequiredService<ReadOnlyDataContext>();
                    var appUser = await context.Users.FirstOrDefaultAsync(u => u.Id == new Guid(userId));

                    var claims = new List<Claim>
                    {
                        new(GlobalConstants.Claims.UserId, userId)
                    };

                    ctx.Principal.AddIdentity(new ClaimsIdentity(claims));
                }
            };
        }, options => { builder.Configuration.Bind("AzureAdB2C", options); });
    }
}