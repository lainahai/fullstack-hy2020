const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

// base url = /api/blogs/
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const newBlog = request.body
  if (!newBlog.likes) {
    newBlog['likes'] = 0
  }

  const token = request.token
  const decodedToken = jwt.decode(token, process.env.SECRET)
  if(!token || !decodedToken.id) {
    response.status(401).json({ error: 'missing or invalid token' })
  }
  const user = await User.findById(decodedToken.id)

  newBlog['user'] = user._id.toString()

  const blog = new Blog(newBlog)
  const result = await blog.save()

  user.blogs = user.blogs.concat(result.toJSON().id)
  await user.save()
  
  response.status(201).json(result.toJSON())
})

blogsRouter.delete('/:id' , async (request, response) => {
  const token = request.token
  const decodedToken = jwt.decode(token, process.env.SECRET)
  logger.info(decodedToken)
  if(!token || !decodedToken.id) {
    response.status(401).json({ error: 'missing or invalid token' })
  }
  
  const id = request.params.id
  const blog = await Blog.findById(id)

  if (blog.user.toString() === decodedToken.id.toString()) {
    const user = await User.findById(blog.user.toString())
    await Blog.findByIdAndRemove(id)

    user.blogs = user.blogs.filter(b => b.id.toString() !== id)
    await user.save()
    response.status(204).end()
  }
  response.status(401).json({ error: 'delete your own blogs you fool'})

})

module.exports = blogsRouter
