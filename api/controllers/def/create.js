module.exports = function create(req, res) {
  var name = req.param('name');
  return res.json(`Welcome ${name} !!`).send()
}
