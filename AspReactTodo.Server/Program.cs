using AspReactTodo.Server.Data;
using AspReactTodo.Server.Interfaces;
using AspReactTodo.Server.Models;
using AspReactTodo.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddTransient<IPostsService, PostDbService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


string postsConnectionString = builder.Configuration.GetConnectionString("PostsConnection")!;
builder.Services.AddDbContext<PostsDbContext>(options =>
{
    options.UseSqlite(postsConnectionString);
});

string UsersConnectionString = builder.Configuration.GetConnectionString("UsersConnection")!;
builder.Services.AddDbContext<ApplicationUsersDbContext>(options =>
{
    options.UseSqlite(UsersConnectionString);
});


builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<ApplicationUser>().AddEntityFrameworkStores<ApplicationUsersDbContext>();

var app = builder.Build();

app.MapIdentityApi<ApplicationUser>();
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapPost("/logout", async (SignInManager<ApplicationUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    return Results.Ok();
}).RequireAuthorization();

app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email);
    return Results.Json(new { Email = email });
}).RequireAuthorization();

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
