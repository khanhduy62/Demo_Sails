const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  async hashPassword(myPlaintextPassword) {
    return await bcrypt.hash(myPlaintextPassword, saltRounds)
  },

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
  }
}