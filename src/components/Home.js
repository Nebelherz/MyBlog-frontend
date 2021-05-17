import React, { useState, useEffect, useContext } from 'react'
import Post from './Post'
import postsService from '../services/postService'
import { UserContext } from './userContext'
import { Container } from 'react-bootstrap'
import { Switch, Route } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useContext(UserContext)

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