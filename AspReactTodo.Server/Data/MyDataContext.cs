using AspReactTodo.Server.Models;

namespace AspReactTodo.Server.Data
{
    public class MyDataContext
    {
        public List<PostModel> Posts { get; set; }

        public MyDataContext()
        {
            Posts = new List<PostModel>();
        }
    }
}
