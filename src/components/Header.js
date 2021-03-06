import React, { useContext } from 'react'
import { Button, Navbar, Nav} from 'react-bootstrap'
import { UserContext } from './userContext'
import postService from '../services/postService'
import { useHistory, Link } from 'react-router-dom'

const Header = () => {
  const [user, setUser] = useContext(UserContext)
  const history = useHistory()

  const handleLogout = () => {
    setUser(null)
    postService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    history.push('/')
  }

  return (
    <div>
      <Navbar bg="nav" variant="dark" expand="lg">
        <Navbar.Brand><Link to='/' className='link-unstyled'><h4>Myblog</h4></Link></Navbar.Brand>
        {user && user.role === "admin" && <Nav.Link ><Link to='/users' className="nav-link">Пользователи</Link></Nav.Link>}
       { <Navbar.Toggle aria-controls="basic-navbar-nav" />}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {user && <Navbar.Text><Link className='link-unstyled' to={`/users/${user.id}`}>{user.username}</Link></Navbar.Text>}
          {user &&
            <Link to='/newpost'>
              <Button variant="success">
                Добавить пост
              </Button>
            </Link>}
          {!user ?
             <Link to="/login"><Button variant="success" >Войти</Button></Link>
            : <Button variant="success" type="submit" onClick={handleLogout}>Выйти</Button>
          }
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header