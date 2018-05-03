

const uuidv4 = require('uuid/v4');

module.exports = {

  attributes: {

    id: {
      type: 'string',
      primaryKey: true,
      defaultsTo: uuidv4()
    },

    designation: {
      type: 'string',
      required: true
    },
    numOfEmployees: {
      type: 'string',
      required: true
    },
    numOfDays: {
      type: 'string',
      required: true
    },
    experience: {
      type: 'string'
    },
    branch: {
      model: 'branch',
      required: true
    },
    transferType: {
      type: 'string',
      required: true
    }
  },
  autoPK: false
};

