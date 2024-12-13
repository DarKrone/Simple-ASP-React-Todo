using AspReactTodo.Server.Data;
using AspReactTodo.Server.Interfaces;
using AspReactTodo.Server.Models;

namespace AspReactTodo.Server.Services
{
    public class PostDbService : IPostsService
    {
        private PostsDbContext context;

        public PostDbService(PostsDbContext context)
        {
            this.context = context;
        }

        public PostModel Create(PostModel model)
        {
            context.Add(model);
            context.SaveChanges();
            return model;
        }

        public void Delete(int id)
        {
            PostModel model = context.Posts.Find(id)!;
            context.Remove(model);
            context.SaveChanges();
        }

        public PostModel Get(int id)
        {
            PostModel model = context.Posts.FirstOrDefault(x => x.Id == id)!;
            return model;
        }

        public List<PostModel> Get()
        {
            return context.Posts.ToList();
        }

        public PostModel Update(PostModel model)
        {
            PostModel newModel = context.Posts.FirstOrDefault(x => x.Id == model.Id)!;
            newModel.Title = model.Title;
            newModel.Description = model.Description;
            context.Posts.Update(newModel);
            context.SaveChanges();
            return newModel;
        }
    }
}
