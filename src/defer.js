"use strict";

module.exports = function deferFactory(Navybird) {
  class NavybirdDefer {
    constructor() {
      const self = this;
      this.promise = new Navybird(function deferPromiseCapturer(resolve, reject) {
        self.resolve = resolve;
        self.reject = reject;
      });
    }

    get fulfill() {
      return this.resolve;
    }
  }

  return function() {
    return new NavybirdDefer();
  };
};
