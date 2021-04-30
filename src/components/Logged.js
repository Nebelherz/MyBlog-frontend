import React, { useContext } from 'react'
import postService from '../services/postService'
import {UserContext} from './userContext'

const Logged = (props) => {
  const [user, setUser] = useContext(UserContext)
  const handleLogout = () => {
    setUser(null)
    postService.setToken(null)
    window.localStorage.removeItem('loggedUser')
  }
  return(
      <div>
        Logged in as {user.username}
        <button type ="submit" onClick = {handleLogout}>
          logout 
        </button>
      </div>
  )
} 

export default Logged