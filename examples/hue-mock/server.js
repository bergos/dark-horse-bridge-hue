const api = require('hydra-middleware/api')
const context = require('../../lib/context')
const express = require('express')
const fs = require('fs')
const hydraFactory = require('hydra-middleware').factory
const morgan = require('morgan')
const path = require('path')
const url = require('url')
const Bridge = require('./Bridge')

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'mock.json')))

const app = express()

app.use(morgan('combined'))

const bridge = new Bridge({
  baseUrl: process.env.BASE_URL,
  config
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
