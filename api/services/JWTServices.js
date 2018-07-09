const jwt = require('jsonwebtoken');
const SECRET_KEY = sails.config.custom.SECRET_KEY;
module.exports = {
  async verify(token) {
    return jwt.verify(token, SECRET_KEY)
  },

  async issuer(payload, expiresIn) {
    return jwt.sign(payload, SECRET_KEY, {
      expiresIn
    })
  }
}