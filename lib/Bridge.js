const apiDocumentation = require('hydra-base/documentation')
const hue = require('node-hue-api')
const Group = require('./Group')
const Groups = require('./Groups')
const HueApi = require('node-hue-api').HueApi
const Light = require('./Light')
const Lights = require('./Lights')
const Status = require('./Status')

class Bridge {
  constructor (options) {
    this.host = options.host
    this.user = options.user
    this.devicetype = options.devicetype
    this.baseUrl = options.baseUrl || '/'

    this.lights = new Lights(this)
    this.groups = new Groups(this)
  }

  apiDocumentation (pathname) {
    pathname = pathname || 'api'

    return apiDocumentation(this.baseUrl + pathname, [
      Group,
      Status
    ])
  }

  object (path) {
    const light = path.match(new RegExp('/light/(.*)'))

    if (light) {
      if (light[1]) {
        return Light.create(this, light[1])
      } else {
        return Lights.create(this)
      }
    }

    const group = path.match(new RegExp('/group/(.*)'))

    if (group) {
      if (group[1]) {
        return Group.create(this, parseInt(group[1]))
      } else {
        return Groups.create(this)
      }
    }

    return Promise.reject(new Error('not found'))
  }

  connect () {
    return Promise.resolve().then(() => {
      if (!this.host) {
        return this.find().then((host) => {
          this.host = host
        })
      }
    }).then(() => {
      if (!this.user) {
        return this.register().then((user) => {
          this.user = user

          console.log(`registered new user: ${this.user}`)
        })
      }
    }).then(() => {
      this.api = new HueApi(this.host, this.user)
    })
  }

  find () {
    return hue.nupnpSearch().then((result) => {
      console.log('bridges detected:')
      console.log(JSON.stringify(result, null, ' '))

      if (result.length !== 1) {
        return Promise.reject(new Error('can\' detect bridge automatically'))
      }

      return result[0].ipaddress
    })
  }

  register () {
    const bridge = new HueApi()

    return bridge.createUser(this.host, this.devicetype)
  }
}

module.exports = Bridge
