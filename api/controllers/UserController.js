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
    let empId = req.body.empId;
    let password = req.body.password;

    User.findOne({id:empId}).exec(function(err,user) {
      if(err) {
        return sails.log('Error while finding Employee: ',err);
      }

      if(!user) {
        req.flash('errMsg','User does not exist');
        return res.redirect('login');
      }


      bcrypt.compare(password, user.password, function(err, res) {
        if(res === true) {
          //password match
        } else if(res === false) {
          //password not match
        }
      });





    });

  }








};
