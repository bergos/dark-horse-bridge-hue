const api = require('hydra-middleware/api')
const context = require('./lib/context')
const express = require('express')
const hydraFactory = require('hydra-middleware').factory
const morgan = require('morgan')
const url = require('url')
const Bridge = require('./lib/Bridge')

const app = express()

app.use(morgan('combined'))

const bridge = new Bridge({
  host: process.env.HUE_HOST,
  user: process.env.HUE_USER,
  devicetype: 'darkhorse#test',
  baseUrl: 'http://192.168.1.64:3000/'
})

bridge.connect().then(() => {
  // add api Link header and serve the documentation
  app.use(api(bridge.apiDocumentation()))

  // use Hydra factory to dynamically load the requested object
  app.use(hydraFactory((iri) => {
    return new Promise(resolve => {
      bridge.object(url.parse(iri).pathname).then(object => {
        resolve(object)
      }).catch(() => {
        resolve(null)
      })
    })
  }, context))

  return new Promise((resolve, reject) => {
    const server = app.listen(url.parse(bridge.baseUrl).port, (err) => {
      if (err) {
        return reject(err)
      }

      const address = server.address().address
      const port = server.address().port

      console.log(`listening at: http://${address}:${port}`)

      resolve()
    })
  })
}).catch((err) => {
  console.error(err.stack || err.message)
})
