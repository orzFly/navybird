"use strict";

module.exports = function immediateFactory(Navybird) {
  return function immediate(val) {
    return new Navybird((resolve) => {
      setImmediate(() => {
        resolve(val);
      });
    });
  };
};
