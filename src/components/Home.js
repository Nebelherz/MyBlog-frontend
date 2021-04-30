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

const Home = () => {
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
}