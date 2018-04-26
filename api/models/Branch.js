

var bcrypt = require('bcrypt');
var uuidv4 = require('uuid/v4');

module.exports = {

  attributes: {

    id: {
      type: 'string',
      primaryKey: true,
      defaultsTo: uuidv4()
    },

    name: {
      type: 'string',
      required: true,
      unique:true
    },
    address: {
      type: 'string',
      required: true
    },
    manager: {
      model:'user'
    }
  },
  autoPK: false
};
