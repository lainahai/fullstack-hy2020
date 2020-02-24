import React from 'react'
import Blog from './Blog'

const Bloglist = ({ blogs, handleDelete, user }) => (
  <div>
    <h2>Blogs</h2>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} handleDelete={handleDelete} user={user} />)}
  </div>
)

export default Bloglist