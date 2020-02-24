import React, { useState } from 'react'

const CreateBlogForm = ({ createNewBlog }) => {


  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleBlogTitleChange = (event) => setNewBlogTitle(event.target.value)
  const handleBlogAuthorChange = (event) => setNewBlogAuthor(event.target.value)
  const handleBlogUrlChange = (event) => setNewBlogUrl(event.target.value)

  const handleCreateBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    createNewBlog(newBlog)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        Title:
        <input value={newBlogTitle} onChange={handleBlogTitleChange} />
      </div>
      <div>
        Author:
        <input value={newBlogAuthor} onChange={handleBlogAuthorChange} />
      </div>
      <div>
        Url:
        <input value={newBlogUrl} onChange={handleBlogUrlChange} />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default CreateBlogForm