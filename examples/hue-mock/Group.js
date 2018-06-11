const apiFromJSON = require('hydra-base/fromJSON')
const context = require('../../lib/context')
const HydraBase = require('hydra-base')

class Group extends HydraBase {
  constructor (bridge, id) {
    super()

    this.bridge = bridge
    this.id = id
    this.config = this.bridge.config.groups[this.id]
    this.config.on = this.config.on || false
    this.config.color = this.config.color || {x: 0, y: 0}

    this['@id'] = `${this.bridge.baseUrl}group/${this.id}`
  }

  get () {
    return Promise.resolve(new HydraBase(context).fromJSON({
      '@id': this['@id'],
      '@type': context.Group,
      label: this.config.label,
      on: this.config.on ? context.On : context.Off,
      color: this.config.color
    }))
  }

  post (status) {
    if (status.on) {
      this.config.on = status.on === context.On
    }

    if (status.color) {
      this.config.color.x = status.color.x
      this.config.color.y = status.color.y
    }

    console.log(`updated status for group ${this.id}`)
    console.log(`on: ${this.config.on}`)
    console.log(`color: ${this.config.color.x}, ${this.config.color.y}`)

    return Promise.resolve()
  }

  static create (bridge, id) {
    return new Promise((resolve, reject) => {
      if (!(id in bridge.config.groups)) {
        reject(new Error('not found'))
      } else {
        resolve(new Group(bridge, id))
      }
    })
  }
}

Group.api(apiFromJSON({
  '@id': context.Group,
  label: 'group of lights',
  supportedOperation: [{
    method: 'GET',
    label: 'retrieves a group of lights',
    returns: context.Group
  }, {
    method: 'POST',
    label: 'turns the group of lights on and off and changes the color',
    expects: 'http://ns.bergnet.org/dark-horse/light#Status'
  }]
}))

module.exports = Group
