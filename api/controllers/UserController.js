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
    try {
      const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      })
      // validate the email and password
      const params = await Joi.validate(req.allParams(), schema)
      const user = await User.findOne({email: params.email});

      if (!user) {
        return res.notFound({err: 'user not found'})
      }

      const isValidPassword = await UtilServices.comparePassword(params.password, user.password)

      if (!isValidPassword) {
        return res.badRequest({err: 'username or password is wrong'});
      }

      const token = await JWTServices.issuer({user: user.id}, '1 day');
      return res.ok({token})
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.badRequest({err})
      }
      return res.serverError(err)
    }
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
      const encryptedPassword = await UtilServices.hashPassword(params.password)
      const user = await User.create({
        email: params.email,
        password: encryptedPassword
      }).fetch();
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

