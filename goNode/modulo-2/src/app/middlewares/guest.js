module.exports = (req, res, next) => {
  if (req.session && !req.session.user) {
    next()
  }

  res.redirect('/app/dashboard')
}
