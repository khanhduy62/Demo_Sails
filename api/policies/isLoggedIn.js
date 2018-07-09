module.exports = async function (req, res, next) {
  if (!req.headers || !req.headers.authorization) {
    return res.badRequest({err: 'authorization header is missing'})
  }
  console.log("headers ", req.headers)
  const tokenParam = req.headers.authorization;
  console.log("tokenParam ", tokenParam)
  const decodeToken = await JWTServices.verify(tokenParam);
  console.log("decode:::: ", decodeToken)
  const user = await User.findOne({
    id: decodeToken.user
  })

  if (!user) {
    return next({err: 'invalid credentials provided'});
  }

  req.user = user.id;

  next();
}