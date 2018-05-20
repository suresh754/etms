


module.exports = {

  generateLoginId : function(callback) {

  }

};


function generate(count, k) {
  let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890' ;
  let str = '';

  for(var i = 0; i < count; i++) {
    str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  base.getID(str, function(err, res) {
    if(!res.length) {
      k(str)                   // use the continuation
    } else generate(count, k)  // otherwise, recurse on generate
  });
}
