const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithThreeBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5e4ac03a9050e3174e3aee78',
    title: 'Pasi Anssin pelivinkit',
    author: 'Pasi Anssi',
    url: 'https://www.pasians.si',
    likes: 20,
    __v: 0
  },
  {
    _id: '5e4aca1f7a850e1bd68489d6',
    title: 'Mullan Alta',
    author: 'Ilari Aalto',
    url: 'https://mullanalta.blogspot.com/',
    likes: 9000,
    __v: 0
  }
]

const listWithThreeBlogsTwoAuthors = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5e4ac03a9050e3174e3affff',
    title: 'Musta Maa',
    author: 'Ilari Aalto',
    url: 'https://mustamaa.wordpress.com/',
    likes: 25,
    __v: 0
  },
  {
    _id: '5e4aca1f7a850e1bd68489d6',
    title: 'Mullan Alta',
    author: 'Ilari Aalto',
    url: 'https://mullanalta.blogspot.com/',
    likes: 9000,
    __v: 0
  }
]

describe('total likes', () => {
  

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has three blogs the total equals the sum of all likes', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    expect(result).toBe(9025)
  })

  test('When list is empty returns 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

})

describe('favourite blog', () => {
  
  test('when list has only one blog returns that blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when list has three blogs returns the one with most likes', () => {
    const result = listHelper.favouriteBlog(listWithThreeBlogs)
    expect(result).toEqual({
      title: 'Mullan Alta',
      author: 'Ilari Aalto',
      likes: 9000
    })
  })

  test('When list is empty returns null', () => {
    const result = listHelper.favouriteBlog([])
    expect(result).toBe(null)
  })

})

describe('most blogs', () => {
  test('when list has one blog return that author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('when list has three blogs and two authors return the author with more blogs', () => {
    const result = listHelper.mostBlogs(listWithThreeBlogsTwoAuthors)
    expect(result).toEqual({
      author: 'Ilari Aalto',
      blogs: 2
    })
  })

  test('when list is empty return null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

})

describe('most likes', () => {
  test('when list is empty return null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('when list has one blog return its author and likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when list has three blogs return the author with most likes', () => {
    result = listHelper.mostLikes(listWithThreeBlogsTwoAuthors)
    expect(result).toEqual({
      author: 'Ilari Aalto',
      likes: 9025
    })
  })
})