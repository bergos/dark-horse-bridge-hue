const context = require('./context')
const HydraBase = require('hydra-base')

class Groups extends HydraBase {
  constructor (bridge) {
    super()

    this.bridge = bridge

    this['@id'] = `${this.bridge.baseUrl}group/`
  }

  get () {
    return this.bridge.api.groups().then(result => {
      return new HydraBase(context).fromJSON({
        '@id': this['@id'],
        member: result.map(group => {
          return {
            '@id': this['@id'] + group.id,
            '@type': context.Group,
            label: group.name
          }
        })
      })
    })
  }

  static create (bridge) {
    return Promise.resolve(new Groups(bridge))
  }
}

module.exports = Groups
