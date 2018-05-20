

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
    branchSrc: {
      model: 'branch',
      required: true
    },
    branchDest: {
      model: 'branch',
    },
    transferType: {
      type: 'string',
      enum: ['URGENT','PUNISHMENT'],
      required: true
    },
    status: {
      type: 'string',
      enum: ['REQUESTED','APPROVED','CANCELLED'],
      defaultsTo: 'REQUESTED'
    },
    createdAt: {
      type: 'datetime'
    }
  },
  autoPK: false
};

