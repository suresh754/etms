module.exports = {
  branch:function(req,res) {
    return res.view('admin/branch');
  },
  createBranchForm:function(req,res) {
    return res.view('admin/createBranchForm');
  }
};
