using AspReactTodo.Server.Models;

namespace AspReactTodo.Server.Interfaces
{
    public interface IPostsService
    {
        Task<PostModel> CreateAsync(PostModel model);
        Task<PostModel> UpdateAsync(PostModel model);
        Task<PostModel> GetAsync(int id);
        Task<List<PostModel>> GetAsync();
        Task DeleteAsync(int id);
    }
}
