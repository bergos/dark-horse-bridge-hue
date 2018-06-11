const colorMath = require('rawdevjs-math-color')
const lightState = require('node-hue-api').lightState

function fromXy (status) {
  const state = lightState.create()

  if (status.on === 'http://ns.bergnet.org/dark-horse/light#Off') {
    state.off()
  } else {
    state.on()
  }

  if (status.color) {
    state.xy(status.color.x, status.color.y).bri(status.brightness * 255)
  }

  return state
}

function toXy (state) {
  if (state.colormode === 'ct') {
    const max = 6500
    const min = 2000
    const kelvin = max - (state.ct - 153.0) * (max - min) / 500
    const xy = colorMath.xyFromTemperature(kelvin, 0)

    xy.brightness = state.bri / 255

    return xy
  }

  if (state.colormode === 'xy') {
    return {
      x: state.xy[0],
      y: state.xy[1],
      brightness: state.bri / 255
    }
  }
}

module.exports = {
  fromXy,
  toXy
}
