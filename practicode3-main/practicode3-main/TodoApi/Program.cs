
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Pomelo.EntityFrameworkCore.MySql.Design.Internal;
using TodoApi;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("ToDoDB"),
        new MySqlServerVersion(new Version(8, 0, 41))
    )
);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin() 
              .AllowAnyMethod() 
              .AllowAnyHeader();
    });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
});

// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI();
// }
app.UseCors();

app.MapGet("/task", async (ToDoDbContext context) =>
{
    
    return await context.Tasks.ToListAsync();

});

app.MapPost("/task", async (ToDoDbContext context, TodoApi.Task newItem) =>
{
    context.Tasks.Add(newItem);
    await context.SaveChangesAsync();
    return Results.Created($"/tasks/{newItem.Id}", newItem);
});

app.MapPut("/task/{id}", async (ToDoDbContext context, int id) =>
{
    var existingItem = await context.Tasks.FindAsync(id);
    if (existingItem is null) return Results.NotFound();

    existingItem.IsComplete = !existingItem.IsComplete;

    await context.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/task/{id}", async (ToDoDbContext context, int id) =>
{
    var item = await context.Tasks.FindAsync(id);
    if (item is null) return Results.NotFound();

    context.Tasks.Remove(item);
    await context.SaveChangesAsync();
    return Results.Ok(item);
});

app.Run();

