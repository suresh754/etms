module.exports = {

  index: function(req,res) {
    Branch.find().populate('manager').exec(function(err,branches) {
      return res.view('branch/index',{branches:branches});
    });
  },
  createForm:function(req,res) {
    Employee.find({role:'MANAGER'}).exec(function(err,managers) {
      return res.view('branch/create',{managers:managers});
    });
  },

  create: function(req,res) {
    Branch.create({name:req.body.name,
      address:req.body.address,manager:req.body.manager}).exec(function(err,branch) {
      if(err) {
        sails.log.error("Error while creating branch: ",err);
        req.flash('errMsg',err.message);
      }
      return res.redirect('/branch');
    })
  }
};
