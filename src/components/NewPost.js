import React, { useState } from 'react'
import postService from '../services/postService'

const NewPost = (props) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleAdding = (event) => {

    event.preventDefault()
    const post = {
      title,
      content,
    }

    postService.create(post)
    .then(result => console.log(result))
    .then(() => {setContent(''); setTitle('')})
    
  }

  return (
    <div>
      <h2>Create new post</h2>
      <form onSubmit={handleAdding}>
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
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewPost