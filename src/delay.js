"use strict";

module.exports = function delayFactory(Navybird) {
  return function delay(ms, val) {
    return new Navybird((resolve) => {
      setTimeout(() => {
        resolve(val);
      }, ms);
    });
  };
};
