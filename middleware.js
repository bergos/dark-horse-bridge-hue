const api = require('hydra-middleware/api')
const context = require('./lib/context')
const hydraFactory = require('hydra-middleware').factory
const once = require('lodash/once')
const url = require('url')
const Bridge = require('./lib/Bridge')
const { Router } = require('express')

function middleware (host, user, baseUrl = '/') {
  const router = new Router({ strict: true })

  const init = once(async () => {
    const bridge = new Bridge({ host, user, devicetype: 'darkhorse#test', baseUrl })

    await bridge.connect()

    // add api Link header and serve the documentation
    router.use(api(bridge.apiDocumentation()))

    const factory = hydraFactory(iri => {
      return new Promise(resolve => {
        bridge.object(url.parse(iri).pathname).then(object => {
          resolve(object)
        }).catch(() => {
          resolve(null)
        })
      })
    }, context)

    // use Hydra factory to dynamically load the requested object
    router.use((req, res, next) => {
      // TODO:
      req.baseUrl = req.url

      factory(req, res, next)
    })
  })

  router.use((req, res, next) => {
    init().then(() => {
      next()
    }).catch(err => {
      next(err)
    })
  })

  return router
}

module.exports = middleware
