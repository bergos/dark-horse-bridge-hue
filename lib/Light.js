const color = require('./color')
const HydraBase = require('hydra-base')

class Light extends HydraBase {
  constructor (bridge, id) {
    super()

    this.bridge = bridge
    this.id = id

    this['@id'] = `${this.bridge.baseUrl}light/${this.id}`
  }

  get () {
    return this.bridge.api.lights().then(result => {
      const light = result.lights.filter(light => light.id === this.id).shift()

      return {
        '@id': light.id,
        label: light.name,
        power: light.state.on,
        color: color.toXy(light.state)
      }
    })
  }

  post (input) {
    return this.bridge.api.setLightState(this.id, color.fromXy(input))
  }

  static create (bridge, id) {
    return new Promise((resolve, reject) => {
      bridge.api.lightStatus(id).then(() => {
        resolve(new Light(bridge, id))
      }).catch(() => {
        reject(new Error('not found'))
      })
    })
  }
}

module.exports = Light
