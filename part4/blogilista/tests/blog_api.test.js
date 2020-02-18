const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')

const app = require('../app')

const api = supertest(app)

describe('when there is initially one blog in the database', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blog = new Blog({
      title: 'Mullan Alta',
      author: 'Ilari Aalto',
      url: 'https://mullanalta.blogspot.com/',
      likes: 9000
    })
    await blog.save()
  })

  test('correct number of blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const blogs = response.body
    expect(blogs.length).toBe(1)
  })

  test('blog contains field "id"', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
    expect(response.body[0].id).toBeDefined()
  })


  test('blog can be created with post', async () => {
    const newBlog = {
      title: 'Musta Maa',
      author: 'Ilari Aalto',
      url: 'https://mustamaa.wordpress.com/',
      likes: 25,
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    expect(response.body.id).toBeDefined()
    expect(response.body.title).toContain('Musta Maa')
  })

  test('if likes are not set then it is set to 0', async () => {
    const blog = {
      title: 'Testblog',
      author: 'testauthor',
      url: 'test url'
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
    
    expect(response.body.likes).toBe(0)
  })

})


afterAll(() => {
  mongoose.connection.close()
})