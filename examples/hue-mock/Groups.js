const context = require('../../lib/context')
const HydraBase = require('hydra-base')

class Groups extends HydraBase {
  constructor (bridge) {
    super()

    this.bridge = bridge

    this['@id'] = `${this.bridge.baseUrl}group/`
  }

  get () {
    return Promise.resolve(new HydraBase(context).fromJSON({
      '@id': this['@id'],
      member: Object.entries(this.bridge.config.groups).map(([id, group]) => {
        return {
          '@id': this['@id'] + id,
          '@type': context.Group,
          label: group.label
        }
      })
    }))
  }

  static create (bridge) {
    return Promise.resolve(new Groups(bridge))
  }
}

module.exports = Groups
