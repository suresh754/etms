
module.exports = function(req, res, next) {

  if (req.session.user.role === 'MANAGER') {
    return next();
  }
  return res.forbidden('Only MANAGER can perform this action.');
};
