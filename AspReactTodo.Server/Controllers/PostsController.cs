using AspReactTodo.Server.Interfaces;
using AspReactTodo.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AspReactTodo.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PostsController : ControllerBase
    {
        private IPostsService _postsService;

        public PostsController(IPostsService postsService)
        {
            _postsService = postsService;
        }

        [HttpPost]
        public async Task<PostModel> CreateAsync(PostModel model)
        {
            PostModel newModel = await _postsService.CreateAsync(model);
            return newModel;
        }

        [HttpPatch]
        public async Task<PostModel> UpdateAsync(PostModel model)
        {
            PostModel newModel = await _postsService.UpdateAsync(model);
            return newModel;
        }

        [HttpGet("{id}")]
        public async Task<PostModel> GetAsync(int id)
        {
            PostModel model = await _postsService.GetAsync(id);
            return model;
        }

        [HttpGet]
        public async Task<IEnumerable<PostModel>> GetAllAsync()
        {
            List<PostModel> models = await _postsService.GetAsync();
            return models;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            await _postsService.DeleteAsync(id);
            return Ok();
        }
    }
}
