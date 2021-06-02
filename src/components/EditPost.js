import React, { useEffect, useState, useContext } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import postService from '../services/postService'
import { UserContext } from './userContext'
import { useHistory, useParams } from 'react-router-dom'
import {Preview} from './Preview'
import axios from 'axios'

const EditPost = () => {
  const [user, setUser] = useContext(UserContext)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const id = useParams().id
  const history = useHistory()

  useEffect(() => {
    axios.get(`/api/posts/${id}`).then(response => response.data)
      .then(data => { setTitle(data.title); setContent(data.content) })
  }, [])

  const handleAdding = async (event) => {
    event.preventDefault()

    const post = {
      title,
      content,
    }
    try {
      const returnedPost = await postService.put(id, post)
      console.log(returnedPost)
      setContent('');
      setTitle('');
      history.push(`/posts/${returnedPost.id}`)
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
      <h3>Редактировать статью</h3>
      <Form onSubmit={handleAdding}>
        <Form.Group controlId="title">
          <Form.Label>Заголовок статьи:</Form.Label>
          <Form.Control type="text" autoComplete="off" value={title} onChange={({ target }) => setTitle(target.value)} />
        </Form.Group>

        {!showPreview ? <Form.Group controlId='content'>
          <Form.Label>Содержимое:</Form.Label>
          <Form.Control as="textarea" style={style} value={content} onChange={({ target }) => setContent(target.value)} />
        </Form.Group> : <Preview text={content}/>}
        <Button type="submit" variant='outline-success' disabled={!user}>Сохранить</Button>
        <Button variant='outline-primary' onClick={()=>{setShowPreview(!showPreview)}} checked = {showPreview}>Предпросмотр</Button>
      </Form>
    </Container>
  )
}

export default EditPost