const apiFromJSON = require('./apiFromJSON')
const HydraBase = require('hydra-base')

class Status extends HydraBase {}

Status.api(apiFromJSON({
  '@id': 'http://ns.bergnet.org/dark-horse/light#Status',
  label: 'status of a light or a group of lights',
  supportedClass: [{
    '@id': 'http://ns.bergnet.org/dark-horse/light#On',
    label: 'on'
  }, {
    '@id': 'http://ns.bergnet.org/dark-horse/light#Off',
    label: 'off'
  }],
  supportedProperty: [{
    property: 'http://ns.bergnet.org/dark-horse/light#color',
    class: 'http://ns.bergnet.org/dark-horse/light#Color'
  }, {
    property: {
      '@id': 'http://ns.bergnet.org/dark-horse/light#on',
      label: 'turn the light on and off',
      in: [{
        '@id': 'http://ns.bergnet.org/dark-horse/light#On'
      }, {
        '@id': 'http://ns.bergnet.org/dark-horse/light#Off'
      }]
    }
  }]
}))

module.exports = Status
