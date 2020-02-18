const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method, request.path)
  if(request.method === 'POST') {
    logger.info('Body:', request.body)
  }
  logger.info()
  next()
}

const tokenExtractor = (request, response, next) => { 
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) { 
    request.token = authorization.substring(7) 
  } 
  next()
}


module.exports = {
  requestLogger,
  tokenExtractor
}