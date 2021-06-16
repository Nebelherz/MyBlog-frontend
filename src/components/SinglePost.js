import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './userContext'
import { Remarkable } from 'remarkable';
import { Button, Container } from 'react-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import postService from '../services/postService';


const SinglePost = () => {
  var md = new Remarkable();
  const [post, setPost] = useState(null)
  const [user, setUser] = useContext(UserContext)
  const history = useHistory()
  const id = useParams().id

  useEffect(() => {
    axios.get(`/api/posts/${id}`).then(response => response.data)
      .then(data => setPost(data))
  }, [])

  const getRawMarkup = () => {
    return { __html: md.render(post.content) };
  }

  const handleDeletion = async () => {
    if (!window.confirm(`Удалить статью "${post.title}"?`)) return
    await postService.deletePost(post.id)
    history.push('/')
  }
  const hStyle = {
    width: "55%",
  };
  if (post === null) return (<></>)
  
  return (
    <Container>
      <br />
      <div className="d-flex">
        <h1>{post.title}</h1>
        {(user && (user.id === post.author.id || user.role === 'admin')) &&
          <div className="ml-auto">
            {post &&
              <Link to={'/edit/' + post?.id}>
                <Button variant="outline-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                </Button>
              </Link>}
            <Button variant="outline-danger" onClick={handleDeletion}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
            </Button>
          </div>}
      </div>
      <div><Link to={`/users/${post.author.id}`}>{post.author.username}</Link></div>
      <div className="content" dangerouslySetInnerHTML={getRawMarkup()}></div>
    </Container >
  )
}

export default SinglePost