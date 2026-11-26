import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPosts } from '../Api/createPosts.js'

export function CreatePost() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [contents, setContents] = useState('')

    const queryClient = useQueryClient()

    const createPostMutation = useMutation({
        mutationFn: createPosts,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            setTitle('')
            setAuthor('')
            setContents('')
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        createPostMutation.mutate({ title, author, contents })
    }

    return (
        <form onSubmit={handleSubmit} style={{backgroundColor:"lightgoldenrodyellow"  , color:"red" , fontSize:"20px" , fontWeight:"bold"}}>
            <h1 style={{color:"purple" , fontStyle:"italic"}}>CREATE POSTS</h1>
            <div>
                <label htmlFor='create-title'>Title: </label>
                <input
                    type='text'
                    name='create-title'
                    id='create-title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{height:"30px", width:"200px" , borderRadius:"20px"}}
                />
            </div>

            <br />

            <div>
                <label htmlFor='create-author'>Author: </label>
                <input
                    type='text'
                    name='create-author'
                    id='create-author'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                     style={{height:"30px", width:"200px" , borderRadius:"20px"}}
                />
            </div>

            <br />
           <label>Description : </label>
            <textarea
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                style={{height:"50px" , width:"250px" , borderRadius:"20px"}}
                
            />

            <br />
            <br />

            <input
                type='submit'
                value={createPostMutation.isPending ? 'Creating...' : 'Create'}
                disabled={!title || createPostMutation.isPending}
                style={{height:"40px" , width:"150px" , backgroundColor:"green" , color:"red" , borderRadius:"10px" , fontSize:"20px" , fontWeight:"bold"}}
            />
            
            {createPostMutation.isError && (
                <p>Error: {createPostMutation.error.message}</p>
            )}
            
            {createPostMutation.isSuccess && (
                <p>Post created successfully!</p>
            )}

            
        </form>
    )
}