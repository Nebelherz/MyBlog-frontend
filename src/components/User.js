import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from './userContext'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import Post from './Post'
import { Container } from 'react-bootstrap'

export const User = () => {
  const [AuthenticadedUser] = useContext(UserContext)
  const [user, setUser] = useState('')
  const [posts, setPosts] = useState([])
  const id = useParams().id
  const history = useHistory()

  useEffect(()=> {
    axios.get('/api/users/'+id).then(response => response.data).then(user => {setUser(user); setPosts(user.posts); console.log(user);})
  }, [id])
  
  return(
    <Container>
      <br/>
      <h2>{user?.username}{AuthenticadedUser && (AuthenticadedUser.id === user.id) && '\uD83D\uDE00'}</h2>
      {posts.map(post =>
        <Post key={post.id} post={post} />
      )}
    </Container>
  )
}