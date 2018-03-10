"use strict";
const errors = require("../errors");

module.exports = function fromNodeFactory(Navybird) {
  return function(fn, options) {
    return new Navybird(function fromCallbackPromise(resolve, reject) {
      const nodeback =
        options && options.multiArgs
          ? function fromCallbackPromiseMultipleArgsCallback(err, ...args) {
              if (err) return reject(errors.wrapAsOperationalError(err));
              return resolve(args);
            }
          : function fromCallbackPromiseSingleArgCallback(err, arg) {
              if (err) return reject(errors.wrapAsOperationalError(err));
              return resolve(arg);
            };
      try {
        fn(nodeback);
      } catch (e) {
        reject(e);
      }
    });
  };
};
