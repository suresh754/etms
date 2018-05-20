module.exports = {
  branch:function(req,res) {
    Branch.find().populate('manager').exec(function(err,branches) {
      return res.view('admin/branch',{branches:branches});
    });
  },
  createBranchForm:function(req,res) {
    return res.view('admin/createBranchForm');
  }
};
