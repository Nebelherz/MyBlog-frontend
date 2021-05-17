import React from 'react'
import { Link } from 'react-router-dom'
const Post = ({ post }) => (

  <div className="article-preview">
    <h3><a href={'/posts/' + post.id}> {post.title}</a> </h3>
    <strong>{post.author.username}</strong>
    {/* <Link to={`/posts/${post.id}`}>
      {post.title} <strong>by</strong> {post.author.username}
</Link> */}
  </div>
)

export default Post