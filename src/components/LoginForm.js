import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Alert, Container } from 'react-bootstrap'
import loginService from '../services/login'
import postService from '../services/postService'
import { UserContext } from './userContext'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className={props.type === 'error' ? 'error' : 'succes'}>
      {props.message}
    </div>
  )
}

const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [succesMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useContext(UserContext)

  const handleLogin = async (event) => {
    event.preventDefault()
    setErrorMessage(null)
    if (username === '') {
      setErrorMessage('No username')
      return
    }
    if (password === '') {
      setErrorMessage('No password')
      return
    }
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      console.log(user)
      postService.setToken(user.token)
      setSuccessMessage(`Logged in with user ${user.username}`)
      setTimeout(() => { setSuccessMessage(null) }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
    }
  }

  return (
    <Container>
      <Notification message={succesMessage} />
      <h3>Войти</h3>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {succesMessage && <Alert variant="success">{succesMessage}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter username" onChange={({ target }) => setUsername(target.value)} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={({ target }) => setPassword(target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">login</Button>
      </Form>
      <br />
    </Container>
  )
}

export default LoginForm