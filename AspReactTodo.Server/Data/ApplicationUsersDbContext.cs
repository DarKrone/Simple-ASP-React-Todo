using AspReactTodo.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AspReactTodo.Server.Data
{
    public class ApplicationUsersDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationUsersDbContext(DbContextOptions<ApplicationUsersDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
