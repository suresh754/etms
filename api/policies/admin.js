
module.exports = function(req, res, next) {

  if (req.session.user.role === 'ADMIN') {
    return next();
  }
  return res.forbidden('Only ADMIN can perform this action.');
};
