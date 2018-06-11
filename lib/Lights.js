const HydraBase = require('hydra-base')

class Lights extends HydraBase {
  constructor (bridge) {
    super()

    this.bridge = bridge

    this['@id'] = `${this.bridge.baseUrl}light/${this.id}`
  }

  get () {
    return this.bridge.api.lights().then(result => {
      return {
        '@id': this['@id'],
        member: result.lights.map(light => {
          return {
            '@id': this['@id'] + light.id,
            label: light.name
          }
        })
      }
    })
  }

  static create (bridge) {
    return Promise.resolve(new Lights(bridge))
  }
}

module.exports = Lights
