using AspReactTodo.Server.Data;
using AspReactTodo.Server.Interfaces;
using AspReactTodo.Server.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddTransient<IPostsService, PostDbService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


string connectingString = builder.Configuration.GetConnectionString("DefaultConnection")!;
builder.Services.AddDbContext<PostsDbContext>(options =>
{
    options.UseSqlite(connectingString);
});


var app = builder.Build();

//app.Use(async (context, next) =>
//{
//    Console.WriteLine($"[{context.Request.Method} {context.Request.Path} {DateTime.UtcNow}] Started.");
//    await next();
//    Console.WriteLine($"[{context.Request.Method} {context.Request.Path} {DateTime.UtcNow}] Finished.");
//});

app.UseDefaultFiles();
app.UseStaticFiles();

//Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
