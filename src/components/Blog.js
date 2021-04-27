import React from 'react'
const Blog = ({blog}) => (
  <div>
    {blog.title} <strong>by</strong> {blog.author.username}
  </div>  
)

export default Blog