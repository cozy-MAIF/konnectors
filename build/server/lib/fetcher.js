// Generated by CoffeeScript 1.10.0
var Fetcher, ware;

ware = require('ware');

Fetcher = (function() {
  function Fetcher() {
    this.ware = ware();
  }

  Fetcher.prototype.args = function() {
    this.args = arguments;
    return this;
  };

  Fetcher.prototype.use = function(operation) {
    this.ware.use(operation);
    return this;
  };

  Fetcher.prototype.fetch = function(callback) {
    var args;
    args = [].slice.call(this.args);
    args.push(callback);
    return this.ware.run.apply(this.ware, args);
  };

  Fetcher.prototype.getLayers = function() {
    return this.ware.fns;
  };

  return Fetcher;

})();

module.exports = {
  "new": function() {
    return new Fetcher;
  }
};
