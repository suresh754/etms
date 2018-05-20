
const bcrypt = require('bcrypt');

module.exports = {

  login: function (req, res) {
    //let empId = req.body.empId;
    let email = req.param('loginId');
    //let password = req.body.password;
    let password = req.param('password');


    Employee.findOne({email: email}).exec(function (err, user) {
      if (err) {
        sails.log('Error while finding employee: ', err);
        req.flash('errMsg', err.message);
        return res.redirect('/');
      }

      if (!user) {
        req.flash('errMsg', 'User does not exist');
        sails.log('errMsg', 'User does not exist');
        return res.redirect('/');
      }


      bcrypt.compare(password, user.password, function (err, match) {
        if (match === true) {
          req.session.user = user;
          return res.redirect('/home');
        } else if (match === false) {
          req.flash('errMsg', 'Wrong Password');
          sails.log('errMsg', 'Wrong Password');
          return res.redirect('/');
        }
      });
    });
  },

  logout: function (req, res) {
    req.session.destroy();
    sails.log.info('User Logged out');
    return res.redirect('/');
  },

  'home':function(req,res) {
    let user = req.session.user;
    switch (user.role) {
      case 'ADMIN':
        return res.view('admin/home');
        break;
      case 'MANAGER':
        return res.view('manager/home');
        break;
      case 'EMP':
        return res.view('home');
        break;
    }
  }

};
