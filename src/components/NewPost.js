import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import postService from '../services/postService'
import { useHistory } from 'react-router-dom'

const NewPost = (props) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const history = useHistory()

  const handleAdding = async (event) => {
    event.preventDefault()

    const post = {
      title,
      content,
    }

    try {
      const returnedPost = await postService.create(post)
      console.log(returnedPost)
      setContent(''); setTitle(''); history.push(`/posts/${returnedPost.id}`)
    }
    catch (e) {
      console.log(e);
    }
  }
  const style = {
    "height": "60vh",
  }

  return (
    <Container>
      <br />
      <h3>Добавить статью</h3>
      <Form onSubmit={handleAdding}>
        <Form.Group controlId="title">
          <Form.Label>Заголовок статьи:</Form.Label>
          <Form.Control type="text" autoComplete="off" onChange={({ target }) => setTitle(target.value)} />
        </Form.Group>

        <Form.Group controlId='content'>
          <Form.Label>Содержимое:</Form.Label>
          <Form.Control as="textarea" rows={13} style = {style} placeholder="Поддерживается Markdown" onChange={({ target }) => setContent(target.value)} />
        </Form.Group>
        <Button type="submit" variant='outline-success'>Создать</Button>
      </Form>
    </Container>
  )
}

export default NewPost