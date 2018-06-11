const context = require('./context')
const HydraBase = require('hydra-base')

function fromJSON (json) {
  return HydraBase.fromJSON(json, context)
}

module.exports = fromJSON
