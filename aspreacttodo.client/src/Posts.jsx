import { useEffect, useState } from 'react';
import ModalButton from './ModalBtn';
import { Form, Button, Stack } from 'react-bootstrap';

const URL = '/api/posts'

const Posts = () => {
    const [allPosts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = async () => {
        const options = {
            method: 'GET',
            headers: new Headers()
        }
        const result = await fetch(URL, options)
        if (result.ok) {
            const posts = await result.json();
            setPosts(posts);
            return posts;
        }
        return [];
    }

    const addPost = async () => {
        const titleFromUser = document.querySelector('#title').value;
        const descFromUser = document.querySelector('#description').value;
        const newPost = {
            title: titleFromUser,
            description: descFromUser
        }

        const headers = new Headers();
        headers.set('Content-Type', 'application/json')
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newPost),
        }

        const result = await fetch(URL, options)
        if (result.ok) {
            const post = await result.json();
            allPosts.push(post);
            setPosts(allPosts.slice());
        }
    }

    const updatePost = async (post) => {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json')
        const options = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(post),
        }

        const result = await fetch(URL, options)
        if (result.ok) {
            const updadetPostIndex = allPosts.findIndex(x => x.id === post.id);
            allPosts[updadetPostIndex] = post;
            setPosts(allPosts.slice());
        }
    }

    const deletePost = (id) => {
        const options = {
            method: 'DELETE',
            headers: new Headers(),
        }
        fetch(URL + `/${id}`, options)
        setPosts(allPosts.filter(x => x.id !== id))
    }

    return (
        <div>
            <div>
                <h4>Simple TODO List</h4>
                <Form.Label>Title</Form.Label>
                <Form.Control style={{margin: "10px"}} id="title"></Form.Control>
                <Form.Label>Description</Form.Label>
                <Form.Control style={{ margin: "10px" }} as="textarea" id="description"></Form.Control>
                <Button onClick={() => addPost()}>Add post</Button>
            </div>
            <div>
                {allPosts.map(x => <PostItem key={x.id} post={x} deleteAction={deletePost} updateAction={updatePost}></PostItem>)}
            </div>
        </div>
    )
}

const PostItem = ({ post, deleteAction, updateAction}) => {
    return (
        <div style={{ backgroundColor: 'whitesmoke', margin: '10px', borderRadius: '10px', padding: '10px' }}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <ModalButton btnName={'Update'} title={"Update post"}
                modalContet={
                    <div>
                        <Stack gap={2} className="col-md-10 mx-auto">
                            <Form.Label style={{textAlign: 'center'}}>Title</Form.Label>
                            <Form.Control style={{marginBottom: '10px'}} id="title" defaultValue={post.title} onChange={e => post.title = e.target.value}></Form.Control>
                            <Form.Label style={{ textAlign: 'center' }}>Description</Form.Label>
                            <Form.Control as="textarea" id="description" defaultValue={post.description} onChange={e => post.description = e.target.value}></Form.Control>
                            <Button style={{ marginTop: '10px' }} onClick={() => updateAction(post)}>Update post</Button>
                        </Stack>
                    </div>
                } />
            <Button style={{ marginTop: '10px' }} variant = "secondary" onClick={() => deleteAction(post.id)}>Delete</Button>
        </div>
    )
}
export default Posts;