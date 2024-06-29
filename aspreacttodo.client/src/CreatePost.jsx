const CreatePost = () => {
    return (
        <div>
            <p>Create post</p>
            <div style={{ margin: '10px' }}>
                <input id="title" type="text" />
            </div>
            <div style={{ margin: '10px' }}>
                <textarea id = 'description' />
            </div>
            <button onClick={() => addPost()}> Add post</button>
        </div>
    )
}

const addPost = async () => {
    const titleFromUser = document.querySelector('#title').value;
    const descFromUser = document.querySelector('#description').value;
    const newPost = {
        title: titleFromUser,
        description: descFromUser
    }

    const options = {
        method: 'POST',
        headers: new Headers(),
        body: JSON.stringify(newPost)
    }

    const result = await fetch('api/posts', options)
    if (result.ok) {
        const post = await result.json();
        setPosts(posts.);
    }
}
export default CreatePost;