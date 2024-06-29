using AspReactTodo.Server.Models;

namespace AspReactTodo.Server.Interfaces
{
    public interface IPostsService
    {
        PostModel Create(PostModel model);
        PostModel Update(PostModel model);
        PostModel Get(int id);
        List<PostModel> Get();
        void Delete(int id);
    }
}
