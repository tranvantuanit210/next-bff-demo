using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using SimpleApp;
using SimpleApp.Api.Base.Extensions;
using SimpleApp.Extensions;
using SimpleApp.Persistence.Contexts;

var builder = WebApplication.CreateBuilder(args);

var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
optionsBuilder.UseNpgsql("Host=postgres;Port=5432;Database=simple-db;Username=postgres;Password=postgres;Pooling=true;MaxPoolSize=100;Connection Idle Lifetime=180",
    npgsqlOptionsAction: sqlOptions =>
    {
        sqlOptions.MigrationsHistoryTable("__MigrationsHistory");
    });

await using var context = new DataContext(optionsBuilder.Options);

await context.Database.MigrateAsync();    

builder.AddConfiguration();
builder.AddApiDocs();
builder.AddMediaR();
builder.ConfigureAuth();
builder.Services.AddDatabase(builder.Configuration);

builder.Services.AddEndpoints();

var app = builder.Build();
if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    app.UseOpenApi();
    app.UseReDoc();
}

app.MapEndpoints();

app.Run();

