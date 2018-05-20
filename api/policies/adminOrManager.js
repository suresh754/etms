
module.exports = function(req, res, next) {

  if (req.session.user.role === 'ADMIN' || req.session.user.role === 'MANAGER') {
    return next();
  }
  return res.forbidden('Only ADMIN or MANAGER can perform this action.');
};
