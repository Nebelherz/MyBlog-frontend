import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import postsService from './services/postService'
import LoginForm from './components/LoginForm'
import NewPost from './components/NewPost'
import Logged from './components/Logged'


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
    <div>
      {!user &&
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>}
      <div style={showWhenVisible}>
        {!user && <LoginForm setUser={setUser} />}
        {!user &&<button onClick={() => setLoginVisible(false)}>cancel</button>}
      </div>
      {user && <Logged setUser={setUser} user={user} />}
      {user && <NewPost />}
      <h2>Статьи  </h2>
      {posts.map(post =>
        <Blog key={post.id} blog={post} />
      )}
    </div>
  )
}

export default App