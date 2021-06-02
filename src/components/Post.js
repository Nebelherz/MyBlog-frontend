import React from 'react'
import { Link } from 'react-router-dom'
const Post = ({ post }) => (

  <div className="article-preview">
    <h3><Link to={'/posts/' + post.id}>{post.title}</Link></h3>
    <strong>{post.author.username}</strong>
  </div>
)

export default Post