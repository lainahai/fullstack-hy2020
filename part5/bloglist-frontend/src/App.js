import React, { useState, useEffect } from 'react'
import Bloglist from './components/Bloglist'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)
  const usernameState = { username, handleChange: handleUsernameChange }
  const passwordState = { password, handleChange: handlePasswordChange }

  const setBlogsSort = (blogs) => {
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }

  const showError = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const showSuccess = (message) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogsSort(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showError('Invalid username or password')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    blogService.setToken('')
  }

  const blogFormRef = React.createRef()

  const BlogForm = () => (
    <Togglable buttonLabel='New blog' ref={blogFormRef}>
      <CreateBlogForm createNewBlog={createNewBlog} />
    </Togglable>
  )

  const createNewBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(newBlog)
      setBlogsSort(blogs.concat(returnedBlog))
      showSuccess(`Created new blog: ${returnedBlog.title}`)
    } catch (exception) {
      showError('Couldn\'t create blog, invalid data or token')
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      const blog = blogs.find((blog) => blog.id === id)
      setBlogsSort(blogs.filter((blog) => blog.id !== id))
      showSuccess(`${blog.title} deleted`)
    } catch (exception) {
      showError('Couldn\'t delete blog')
    }
  }

  if (user === null) {
    return (
      <>
        <Notification message={errorMessage} style={{ color: 'red' }} />
        {LoginForm({ usernameState, passwordState, handleLogin })}
      </>
    )
  }

  return (
    <div>
      <LoggedInUser user={user} handleLogout={handleLogout} />
      <Notification message={errorMessage} style={{ color: 'red' }} />
      <Notification message={successMessage} style={{ color: 'green' }} />
      <Bloglist blogs={blogs} handleDelete={deleteBlog} user={user} />
      <BlogForm />
    </div>
  )
}

const LoggedInUser = ({ user, handleLogout }) => (
  <div>
    <p>Logged in as {user.name}</p>
    <form onSubmit={handleLogout}>
      <button type="submit">Log out</button>
    </form>
  </div>
)

export default App