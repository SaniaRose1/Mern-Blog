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
        <form onSubmit={handleSubmit} >
            <div>
                <label htmlFor='create-title'>Title: </label>
                <input
                    type='text'
                    name='create-title'
                    id='create-title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                />
            </div>

            <br />
           <label>Description : </label>
            <textarea
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                style={{height:"50px" , width:"250px" }}
            />

            <br />
            <br />

            <input
                type='submit'
                value={createPostMutation.isPending ? 'Creating...' : 'Create'}
                disabled={!title || createPostMutation.isPending}
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