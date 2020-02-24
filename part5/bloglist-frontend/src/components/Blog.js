import React, { useState } from 'react'
import decode from 'jwt-decode'
import PropTypes from 'prop-types'


const Blog = ({ blog, handleDelete, user }) => {

  const [expand, setExpand] = useState(false)

  const showWhenExpanded = { display: expand ? '' : 'none' }
  const buttonTitle = expand ? 'hide' : 'show'

  const toggleExpand = () => {
    setExpand(!expand)
  }

  const decodedUser = decode(user.token)
  const deleteButtonVisible = { display: (expand && decodedUser.id === blog.user) ? '' : 'none' }
  console.log(deleteButtonVisible)

  const deleteBlog = () => {
    if (window.confirm(`Are you sure you want to delete\n${blog.title}?`)) {
      handleDelete(blog.id)
    }
  }

  return (
    <div>
      <ul style={{ listStyleType: 'none' }}>
        <li>
          {blog.title} {blog.author}
          <button onClick={toggleExpand}>{buttonTitle}</button>
        </li>
        <li style={showWhenExpanded}>{blog.url}</li>
        <li style={showWhenExpanded}>
          Likes: {blog.likes}
          <button>Like</button>
        </li>
        <li style={deleteButtonVisible}>
          <button onClick={deleteBlog}>Delete</button>
        </li>
      </ul>
    </div>
  )
}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
