using AspReactTodo.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AspReactTodo.Server.Data
{
    public class PostsDbContext : DbContext
    {
        public DbSet<PostModel> Posts { get; set; }

        public PostsDbContext(DbContextOptions<PostsDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PostModel>().Property(x => x.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<PostModel>().Property(x => x.Title).HasMaxLength(50);
            modelBuilder.Entity<PostModel>().Property(x => x.Description).HasMaxLength(250);
        }
    }
}
