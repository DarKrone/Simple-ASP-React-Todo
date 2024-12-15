using AspReactTodo.Server.Data;
using AspReactTodo.Server.Interfaces;
using AspReactTodo.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AspReactTodo.Server.Services
{
    public class PostDbService : IPostsService
    {
        private PostsDbContext context;

        public PostDbService(PostsDbContext context)
        {
            this.context = context;
        }

        public async Task<PostModel> CreateAsync(PostModel model)
        {
            await context.AddAsync(model);
            await context.SaveChangesAsync();
            return model;
        }

        public async Task DeleteAsync(int id)
        {
            await context.Posts.Where(p => p.Id == id).ExecuteDeleteAsync();
        }

        public async Task<PostModel> GetAsync(int id)
        {
            PostModel? model = await context.Posts.FirstOrDefaultAsync(x => x.Id == id);
            return model!;
        }

        public async Task<List<PostModel>> GetAsync()
        {
            return await context.Posts.ToListAsync();
        }

        public async Task<PostModel> UpdateAsync(PostModel model)
        {
            context.Posts.Update(model);
            await context.SaveChangesAsync();
            return model;
        }
    }
}
