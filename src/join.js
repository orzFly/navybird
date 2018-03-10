"use strict";

module.exports = function joinFactory(Navybird) {
  return function(...args) {
    const last = args.length - 1;
    if (last > 0 && typeof args[last] === "function") {
      const fn = args.pop();
      return Navybird.all(args).spread(fn);
    }
    return Navybird.all(args);
  };
};
