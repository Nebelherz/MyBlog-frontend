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

  return (
    <Container>
      <br />
      <h3>Добавить статью</h3>
      <Form onSubmit={handleAdding}>
        <Form.Group controlId="title">
          <Form.Label>Заголовок статьи:</Form.Label>
          <Form.Control type="text" onChange={({ target }) => setTitle(target.value)} />
        </Form.Group>

        <Form.Group controlId='content'>
          <Form.Label>Содержимое:</Form.Label>
          <Form.Control as="textarea" rows={13} placeholder="Поддерживается Markdown" onChange={({ target }) => setContent(target.value)} />
        </Form.Group>
        <Button type="submit" variant='outline-success'>Создать</Button>
      </Form>

      {/*<form onSubmit={handleAdding}>
        <div>
          Title:
          <input type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <div>Content: </div>
          <textarea
            type="textarea"
            value={content}
            name="Content"
            onChange={({ target }) => setContent(target.value)} />
        </div>
  </form>*/}
    </Container>
  )
}

export default NewPost