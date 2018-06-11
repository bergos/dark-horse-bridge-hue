const apiFromJSON = require('hydra-base/fromJSON')
const color = require('./color')
const context = require('./context')
const HydraBase = require('hydra-base')

class Group extends HydraBase {
  constructor (bridge, id) {
    super()

    this.bridge = bridge
    this.id = id

    this['@id'] = `${this.bridge.baseUrl}group/${this.id}`
  }

  get () {
    return this.bridge.api.getGroup(this.id).then(result => {
      return new HydraBase(context).fromJSON({
        '@id': this['@id'],
        '@type': context.Group,
        label: result.name,
        member: result.lights.map(id => {
          return {
            '@id': '/light/' + id
          }
        }),
        color: color.toXy(result.lastAction)
      })
    })
  }

  post (status) {
    return this.bridge.api.setGroupLightState(this.id, color.fromXy(status)).then(() => null)
  }

  static create (bridge, id) {
    return new Promise((resolve, reject) => {
      bridge.api.getGroup(id).then(() => {
        resolve(new Group(bridge, id))
      }).catch(() => {
        reject(new Error('not found'))
      })
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
