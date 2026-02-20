using App.Controllers;
using App.Data;
using App.StaticTools.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

bool useSwagger = args.Contains("--swagger");

builder.Services.AddControllers();

builder.Services.AddAppDbContext(builder.Configuration);

if (useSwagger)
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}

var app = builder.Build();

if (app.Environment.IsDevelopment() && useSwagger)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

await app.InitializeDatabaseAsync();

app.MapControllers();

app.Run();

