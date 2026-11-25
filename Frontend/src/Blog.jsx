
import './App.css'
import { CreatePost } from './Component/CreatePost.jsx'
import { Post } from './Component/Post.jsx'
import { PostFilter } from './Component/PostFilter.jsx'
import { PostList } from './Component/PostList.jsx'
import { PostSorting } from './Component/PostSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from './Api/posts.js'
import { useState } from 'react'

export function Blog() {
const [author, setAuthor] = useState('')
const [sortBy, setSortBy] = useState('createdAt')
const [sortOrder, setSortOrder] = useState('descending')
const postsQuery = useQuery({
 queryKey: ['posts', { author, sortBy, sortOrder }],
 queryFn: () => getPosts({ author, sortBy, sortOrder }),
 })

 
return (
    <>
<CreatePost/>
<Post/>
<PostFilter
 field='author'
 value={author}
 onChange={(value) => setAuthor(value)}
 />
 <br />
 <PostSorting
 fields={['createdAt', 'updatedAt']}
 value={sortBy}
 onChange={(value) => setSortBy(value)}
 orderValue={sortOrder}
 onOrderChange={(orderValue) => setSortOrder(orderValue)}
 />
  <br/>

  {postsQuery.isLoading && <p>Loading posts...</p>}

      {postsQuery.isError && <p>Error: {postsQuery.error.message}</p>}

      {postsQuery.isSuccess && (
        <PostList posts={postsQuery.data} />
      )}
    </>
  )
}


