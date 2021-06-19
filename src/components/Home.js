import React, { useState, useEffect } from 'react'
import Post from './Post'
import postsService from '../services/postService'
import { Container } from 'react-bootstrap'

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    postsService.getAll().then(posts =>
      setPosts(posts)
    )
  }, [])

  return (
    <Container>
      <h2 style={{padding: "1rem 0"}}>Статьи  </h2>
      {posts.map(post =>
        <Post key={post.id} post={post} />
      )}
    </Container>
  )
}

export default Home