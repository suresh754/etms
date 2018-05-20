module.exports = {

  index: function(req,res) {
    let authUser = req.session.user;
    let findCriteria = {};
    let view = 'empTransfer/admin/index';
    if(authUser.role === 'MANAGER') {
      findCriteria['branchSrc'] = authUser.branch;
      view = 'empTransfer/index';
    }
    EmpTransfer.find(findCriteria).populate(['branchSrc','branchDest']).exec(function(err,transfers) {
        return res.view(view,{transfers:transfers});
    });
  },
  createForm:function(req,res) {
    Branch.find().exec(function(err,branches) {
      return res.view('empTransfer/create',{branches:branches});
    });
  },

  create: function(req,res) {
    let authUser = req.session.user ;
    let transferData ={
      designation:req.body.designation,
      numOfEmployees:req.body.numOfEmployees,
      numOfDays:req.body.numOfDays,
      //experience:req.body.experience,
      transferType:req.body.transferType,
      branchSrc:authUser.branch,
      branchDest:req.body.branchDest?req.body.branchDest:'',
    };

    EmpTransfer.create(transferData).exec(function(err,transfers) {
      if(err) {
        req.flash('errMsg',err.message);
        sails.log.error('Error while creating new employee transfer request: ',err);
      }
      return res.redirect('/transfer');
    })
  },

  approve: function(req,res) {
    EmpTransfer.update({id:req.param('id')},{status:'APPROVED'}).exec(function(err,transfer) {
      if(err) {
        req.flash('errMsg',err.message);
        sails.log.error('Error while approving employee transfer request: ',err);
      }
      return res.redirect('/transfer');
    });
  },

  cancel: function(req,res) {
    EmpTransfer.update({id:req.param('id')},{status:'CANCELLED'}).exec(function(err,transfer) {
      if(err) {
        req.flash('errMsg',err.message);
        sails.log.error('Error while cancelling employee transfer request: ',err);
      }
      return res.redirect('/transfer');
    });
  }
};
