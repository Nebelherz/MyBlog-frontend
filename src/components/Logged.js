import React from 'react'
import postService from '../services/postService'

const Logged = (props) => {

  const handleLogout = () => {
    props.setUser(null)
    postService.setToken(null)
    window.localStorage.removeItem('loggedUser')
  }
  return(
      <div>
        Logged in as {props.user.username}
        <button type ="submit" onClick = {handleLogout}>
          logout 
        </button>
      </div>
  )
}

export default Logged