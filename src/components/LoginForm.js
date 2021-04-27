import React, { useState } from 'react'
import loginService from '../services/login'
import postService from '../services/postService'

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
  

  const handleLogin = async (event) => {

    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      props.setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      console.log(user)
      postService.setToken(user.token)
      setSuccessMessage(`Logged in with user ${user.username}`)
      setTimeout(() => {setSuccessMessage(null)}, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={succesMessage} />
      <Notification message={errorMessage} type='error' />
      <h3>Log in</h3>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

}

export default LoginForm