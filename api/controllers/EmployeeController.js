
const bcrypt = require('bcrypt');

module.exports = {

  index: function(req,res) {
    let authUser = req.session.user ;
    let findCriteria = {};
    if(authUser.role === 'MANAGER') {
      findCriteria['branch'] = authUser.branch;
    }
    Employee.find(findCriteria).populate('branch').exec(function(err,employees) {
      return res.view('employee/index',{employees});
    });
  },

  createForm: function(req,res) {
    Branch.find().exec(function(err,branches) {
      return res.view('employee/create',{branches:branches});
    });
  },

  create: function(req,res) {
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let email = req.body.email;
    let role = (req.body.make_manager && req.body.make_manager === 'on')?'MANAGER':'EMP';
    let designation = req.body.designation;
    let branch = req.body.branch;
    let password = req.body.firstname.toLowerCase();



    let employeeData ={
      firstname:firstName,
      lastname:lastName,
      email:email,
      role:role,
      designation:designation,
      branch:branch,
      password:password
    };

    Employee.create(employeeData).exec(function(err,employee) {
      if(err) {
        req.flash('errMsg',err.message);
        sails.log.error('Error while creating new employee: ',err);
      }
      if(role === 'MANAGER') {
        Branch.update({id:branch},{manager:employee.id}).exec(function(err,updatedBranch) {
          if(err) {
            req.flash('errMsg',err.message);
            sails.log.error('Error while updating branch : ',err);
          }
          return res.redirect('/employee');
        });
      } else {
        return res.redirect('/employee');
      }

    })

    /*bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(firstName, salt, function(err, hash) {*/

     /* });
    });*/



  },

  editForm : function(req,res) {
    Employee.findOne({id:req.param('id')}).exec(function(err,employee) {
      Branch.find().exec(function (err, branches) {
        return res.view('employee/edit', {employee:employee,branches: branches});
      });
    });
  },

  update : function(req,res) {
    sails.log("id inside update: ",req.body.id);
    let employeeData ={
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      role:(req.body.make_manager && req.body.make_manager === 'on')?'MANAGER':'EMP',
      designation:req.body.designation,
      branch:req.body.branch,
    };

    Employee.update({id:req.body.id},employeeData).exec(function(err,employee) {
      if (err) {
        req.flash('errMsg', err.message);
        sails.log.error('Error while updating employee ' + req.param("id") + ' : ', err);
      }
      if(employeeData.role === 'MANAGER') {
        sails.log("employee updated: ", employee);
        Branch.update({id:req.body.branch},{manager:employee[0].id}).exec(function(err,updatedBranch) {
          if(err) {
            req.flash('errMsg',err.message);
            sails.log.error('Error while updating branch : ',err);
          }
          return res.redirect('/employee');
        });
      } else {
        return res.redirect('/employee');
      }
    });
  },

  delete : function(req,res) {

    Employee.findOne({id:req.param('id')}).exec(function(err,employee) {
      if(err) {
        req.flash('errMsg',err.message);
        sails.log.error('Error while finding employee for delete'+req.param("id")+' : ',err);
        return res.redirect('/employee');
      }
      if(employee.role === 'MANAGER') {
        req.flash('errMsg','This employee is a manager so cannot be deleted right now');
        return res.redirect('/employee');
      }
      employee.destroy(function(err) {
        if(err) {
          req.flash('errMsg',err.message);
          sails.log.error('Error while deleting employee '+req.param("id")+' : ',err);
        }
        return res.redirect('/employee');
      });
    })
  }

};
