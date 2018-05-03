module.exports = {
  home: function (req,res) {
    return res.view('manager/home');
  },
  listTransfers:function (req,res) {
    return res.view('manager/listTransfer');
  },
  requestTransferForm:function(req,res) {
    return res.view('manager/requestTransferForm');
  },
  requestTransfer:function(req,res) {
    sails.log("inside request transfer : body: ",req.body);

    //return res.view('manager/requestTransferForm');
  }
};
