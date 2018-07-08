/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require('joi')
module.exports = {
  

  /**
   * `UserController.login()`
   */
  login: async function (req, res) {
    return res.ok("login")
  },

  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      })
      // validate the email and password
      const params = await Joi.validate(req.allParams(), schema)
      // create user
      const user = await User.create(params).fetch();
      // send the new user in response
      return res.ok(user)
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.badRequest({err})
      }
      return res.serverError(err)
    }
  }

};

