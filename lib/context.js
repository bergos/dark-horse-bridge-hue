const hydraContext = require('simplerdf-hydra/context')

const context = {
  Color: 'http://ns.bergnet.org/dark-horse/light#Color',
  Group: 'http://ns.bergnet.org/dark-horse/light#Group',
  Off: 'http://ns.bergnet.org/dark-horse/light#Off',
  On: 'http://ns.bergnet.org/dark-horse/light#On',
  class: {
    '@id': 'http://www.w3.org/ns/shacl#class',
    '@type': '@id'
  },
  color: 'http://ns.bergnet.org/dark-horse/light#color',
  x: 'http://ns.bergnet.org/dark-horse/light#colorspace-xy-x',
  y: 'http://ns.bergnet.org/dark-horse/light#colorspace-xy-y',
  brightness: 'http://ns.bergnet.org/dark-horse/light#brightness',
  on: {
    '@id': 'http://ns.bergnet.org/dark-horse/light#on',
    '@type': '@id'
  },
  in: {
    '@id': 'http://www.w3.org/ns/shacl#in',
    '@container': '@set'
  }
}

module.exports = Object.assign({}, hydraContext, context)
