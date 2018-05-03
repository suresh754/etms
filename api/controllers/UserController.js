
const bcrypt = require('bcrypt');

module.exports = {

  create: function(req,res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let role = req.body.role;
    let branchId = req.body.branchId;

    let userData ={
      firstName:firstName,
      lastName:lastName,
      email:email,
      role:role,
      branchId:branchId
    };

    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(firstName, salt, function(err, hash) {
        User.create(userData).exec(function(err,user) {
          if(err) {
            return sails.log('Error while creating new user: ',err);
          }
          //todo: return ideal view with response data
        })
      });
    });



  },

  login: function(req,res) {
    //let empId = req.body.empId;
    let loginId = req.param('loginId');
    //let password = req.body.password;
    let password = req.param('password');


    User.findOne({loginId:loginId}).exec(function(err,user) {
      if(err) {
        return sails.log('Error while finding Employee: ',err);
      }

      if(!user) {
        req.flash('errMsg','User does not exist');
        sails.log('errMsg','User does not exist');
        return res.redirect('/');
      }


      bcrypt.compare(password, user.password, function(err, match) {
        sails.log("res:",res);
        if(match === true) {
          req.session.user = user;
          switch(user.role) {
            case 'ADMIN':
              return res.view('admin/home');
              break;
            case 'MANAGER':
              return res.view('manager/home');
              break;
            case 'EMP':
              break;
          }
        } else if(match === false) {
          //password not match
        }
      });





    });

  }








};
