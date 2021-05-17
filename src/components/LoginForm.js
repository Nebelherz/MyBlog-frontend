import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Alert, Container } from 'react-bootstrap'
import { useHistory } from 'react-router'
import loginService from '../services/login'
import postService from '../services/postService'
import { UserContext } from './userContext'
import {Link} from 'react-router-dom'


const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [succesMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useContext(UserContext)
  const history = useHistory()

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
      const user = await loginService.login({ username, password, })
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      console.log(user)
      postService.setToken(user.token)
      history.goBack()
    } catch (e) {
      setPassword('')
      setErrorMessage('Wrong credentials')
    }

  }

  return (
    <Container>
     <br/>
      <h3 className="text-center">Войти</h3>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {/*succesMessage && <Alert variant="success">{succesMessage}</Alert>*/}
      <Form onSubmit={handleLogin}>
       <div className = 'text-center'>Нет аккаунта? <Link to = '/register'>Создать.</Link></div>
        <Form.Group controlId="username">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control placeholder="username" onChange={({ target }) => setUsername(target.value)} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="password" onChange={({ target }) => setPassword(target.value)} value = {password}/>
        </Form.Group>
        <Button className="pull-right" variant="success" type="submit">Войти</Button>
      </Form> 
      <br />
    </Container>
  )
}

export default LoginForm