const apiDocumentation = require('hydra-base/documentation')
const Group = require('./Group')
const Groups = require('./Groups')
const Status = require('../../lib/Status')

class Bridge {
  constructor (options) {
    this.baseUrl = options.baseUrl || '/'
    this.config = options.config

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
    return Promise.resolve()
  }
}

module.exports = Bridge
