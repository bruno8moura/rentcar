const { createServer } = require('http')

const configureServer = (handler) => {
  return createServer(handler).listen(3000, () => console.log('Server listening on port 3000'))
}

module.exports = configureServer
