// Generated by CoffeeScript 1.10.0
var Bill, cozydb;

cozydb = require('cozydb');

module.exports = Bill = cozydb.getModel('Bill', {
  type: String,
  subtype: String,
  date: Date,
  vendor: String,
  amount: Number,
  plan: String,
  pdfurl: String,
  binaryId: String,
  fileId: String,
  content: String,
  isRefund: Boolean
});

Bill.all = function(callback) {
  return Bill.request('byDate', callback);
};
