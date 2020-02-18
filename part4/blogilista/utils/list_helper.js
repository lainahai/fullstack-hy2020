
const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const strip = (blog) => {
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }
  }

  const reducer = (favourite, blog) => {
    if(blog.likes > favourite.likes) {
      return blog
    }
    return favourite
  }

  if(blogs.length === 0){
    return null
  } 

  const favourite = blogs.reduce(reducer, blogs[0])
  return strip(favourite)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogsByAuthor = lodash.countBy(blogs, (blog) => blog.author)
  
  const blogsByAuthorList = Object.keys(blogsByAuthor).map(author => {
    return {
      author: author,
      blogs: blogsByAuthor[author]
    }
  })
  
  const mostBlogsCounter = (mostBlogsAuthor, author) => {
    if(mostBlogsAuthor.blogs > author.blogs) {
      return mostBlogsAuthor
    }
    return author
  }

  return blogsByAuthorList.reduce(mostBlogsCounter, blogsByAuthorList[0])
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogsByAuthor = lodash.groupBy(blogs, blog => blog.author)

  const countLikes = blogs => {
    const reducer = (sum, blog) => {
      return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
  }

  let mostLikedAuthor = { author: 'none', likes: 0 }
  lodash.forEach(blogsByAuthor, (value, key) => {
    const likes = countLikes(value)
    if(likes > mostLikedAuthor.likes) {
      mostLikedAuthor = {author: key, likes: likes}
    }
  })

  return mostLikedAuthor
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}