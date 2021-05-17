import React from 'react'
import {Container } from 'react-bootstrap'

const Page404 = () => {

  const style = {
    margin: "2rem",
  }

  return(
    <Container>
      <h1 className = "text-center" style = {style}>
        404
      </h1>
    </Container>
  )
}

export default Page404