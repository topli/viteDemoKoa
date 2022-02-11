const mqtt = require('../serve/mqtt')

const pub = (topic, payload) => {
  mqtt.publish({ topic, payload: JSON.stringify(payload) })
}

module.exports = {
  pub
}