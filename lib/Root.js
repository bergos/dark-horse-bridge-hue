const apiFromJSON = require('hydra-base/fromJSON')
const context = require('./context')
const HydraBase = require('hydra-base')

class Root extends HydraBase {
  constructor (bridge) {
    super()

    this.bridge = bridge

    this['@id'] = `${this.bridge.baseUrl}`
  }

  get () {
    return Promise.resolve(new HydraBase(context).fromJSON({
      '@id': this['@id'],
      '@type': context.Container,
      label: 'Philips Hue Linked Data bridge',
      member: [{
        '@id': this['@id'] + 'group/'
      }/*, {
        '@id': this['@id'] + 'light/'
      }*/]
    }))
  }

  static create (bridge) {
    return Promise.resolve(new Root(bridge))
  }
}

Root.api(apiFromJSON({
  '@id': context.Group,
  label: 'Philips Hue Linked Data bridge',
  supportedOperation: [{
    method: 'GET',
    label: 'retrieves a list of available links',
    returns: context.Container
  }]
}))

module.exports = Root
