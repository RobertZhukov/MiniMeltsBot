const kb = require('./keyboardButtons');

module.exports = {
  main: [
    [kb.main.conditions],
    [kb.main.brand, kb.main.iceCreamType],
    [kb.main.equipment, kb.main.contacts],
    [kb.main.order],
  ],
  info: [
    [kb.info.advantages],
    [kb.info.makeProcess],
  ]
}