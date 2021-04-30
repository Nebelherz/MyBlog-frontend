import React, { useContext } from 'react'
import { Button, Nav } from 'react-bootstrap'
import { UserContext } from './userContext'

const NavBar = () => {
  const [user, setUser] = useContext(UserContext)
  return (
    <Nav className="header">
      <Nav.Item className="flex-grow-1">
        <Nav.Link href="/">Главная</Nav.Link>
      </Nav.Item>
      {user && <Nav.Item>
        <div className="nav-link disabled">{user.username}</div>
      </Nav.Item>}
      <Nav.Item className="align-self-center mx-auto">
        {!user ?
          <Button href="/login" variant="outline-primary">Войти</Button>
          : <Button variant="outline-primary">Выйти</Button>
        }
      </Nav.Item>
    </Nav>
  )
}

export default NavBar