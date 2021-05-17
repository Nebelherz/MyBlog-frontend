import axios from 'axios'
import React, { useState, useContext } from 'react'
import { UserContext } from './userContext'
import { useHistory } from 'react-router'
import postService from '../services/postService'
import { Container, Form, Button, Alert } from 'react-bootstrap'

const Register = () => {
  const [user, setUser] = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()

    setErrorMessage('')
    if (username == '') {
      setErrorMessage('Введите имя пользователя')
      return
    }
    if (password !== passwordConfirm) {
      setErrorMessage('Пароли не совпадают')
      setPasswordConfirm('')
      return
    }
    if (!password || password.length < 5) {
      setErrorMessage('Пароль должен содержать минимум 5 символов')
      return
    }
    const newUser = {
      username,
      password
    }
    try {
      const response = await axios.post('/api/users', newUser)
      const user = response.data
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      console.log(user)
      postService.setToken(user.token)
      history.push('/')
    }
    catch (error) {
      if (error.response.data.error.includes('unique')) {
        setErrorMessage('Имя пользователя уже занято')
      }
      console.log(error.response);
    }

  }
  return (
    <Container className='justify-content-md-center'>
      <br/>
      <h3 className='text-center'>Создание аккаунта</h3>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control placeholder="username" onChange={({ target }) => setUsername(target.value)} value = {username} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="password" onChange={({ target }) => setPassword(target.value)} value={password} />
        </Form.Group>
        <Form.Group controlId="passwordConfirm">
          <Form.Label>Подтвердите пароль</Form.Label>
          <Form.Control type="password" placeholder="password" onChange={({ target }) => setPasswordConfirm(target.value)} value={passwordConfirm} />
        </Form.Group>
        <Button className="ml-auto" variant="success" type="submit">Создать аккаунт</Button>
      </Form>
    </Container>
  )

}

export default Register