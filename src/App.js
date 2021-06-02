import React, { useState, useEffect } from 'react'
import Header from "./components/Header"
import postsService from './services/postService'
import LoginForm from './components/LoginForm'
import NewPost from './components/NewPost'
import { UserContext } from './components/userContext'
import { Container } from 'react-bootstrap'
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home"
import SinglePost from "./components/SinglePost"
import EditPost from "./components/EditPost"
import Users from './components/Users'
import Register from './components/Register'
import Page404 from './components/Page404'


const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      postsService.setToken(user.token)
    }
  }, [])

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Container >
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/posts/:id" >
            <SinglePost />
          </Route>
          <Route path="/edit/:id">
            <EditPost />
          </Route>
          <Route path="/login" >
            <LoginForm />
          </Route>
          <Route path="/register" >
            <Register />
          </Route>
          <Route exact path="/users" >
            <Users />
          </Route>
          <Route path='/newpost'>
            <NewPost />
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Container>
    </UserContext.Provider >
  )
}

export default App