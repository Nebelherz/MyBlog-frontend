import React, { useContext } from 'react'
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import { UserContext } from './userContext'
import postService from '../services/postService'
import { useHistory } from 'react-router'

const Header = () => {
  const [user, setUser] = useContext(UserContext)
  const history = useHistory()

  const handleLogout = () => {
    setUser(null)
    postService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    history.push('/')
  }

  const style = {
    fontSize: "large",
  };

  return (
    <div>
      <Navbar bg="nav" variant="dark" expand="lg">
        <Navbar.Brand href="/" >Стандарты W3C</Navbar.Brand>
        {user && user.role === "admin" && <Nav.Link className="nav-link" href='/users'>Пользователи</Nav.Link>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">

          {user && <Navbar.Text>{user.username}</Navbar.Text>}

          {/* <Button variant="success" href='/newpost'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </Button> */}

          {user && <Button variant="success" href='/newpost' >
            Добавить пост
                  </Button>}
          {!user ?
            <Button href="/login" variant="success">Войти</Button>
            : <Button variant="success" type="submit" onClick={handleLogout}>Выйти</Button>
          }
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header