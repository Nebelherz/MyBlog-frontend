  import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NavBar from "./components/NavBar"
import postsService from './services/postService'
import LoginForm from './components/LoginForm'
import NewPost from './components/NewPost'
import Logged from './components/Logged'
import { UserContext } from './components/userContext'
import { Button, Container } from 'react-bootstrap'
import { Switch, Route } from "react-router-dom";

const App = () => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    postsService.getAll().then(blogs =>
      setPosts(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      postsService.setToken(user.token)
    }
  }, [])

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }


  return (
    <UserContext.Provider value={[user, setUser]}>
      <Container>
        <NavBar />
        {!user &&
          <div style={hideWhenVisible}>
            <Button onClick={() => setLoginVisible(true)}>log in</Button>
          </div>}
        <div style={showWhenVisible}>
          {!user && <LoginForm />}
          {!user && <Button variant="outline-primary" onClick={() => setLoginVisible(false)}>cancel</Button>}
        </div>
        {user && <Logged />}
        {user && <NewPost />}
        <h2>Статьи  </h2>
        {posts.map(post =>
          <Blog key={post.id} blog={post} />
        )}
      </Container>
      <Switch>
        <Route path = "/login" >
          <LoginForm/>
        </Route>
      </Switch>
    </UserContext.Provider>

  )
}

export default App