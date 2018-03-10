"use strict";
const constants = require("../constants");

module.exports = function inspectableFactory(Navybird) {
  const NavybirdInspection = Symbol.for("NavybirdInspection");

  return function(promise) {
    if (promise[NavybirdInspection]) return promise;

    const inspection = new Navybird.PromiseInspection(promise);
    const result = inspection.target();
    result[NavybirdInspection] = inspection;
    result.isFulfilled = inspection.isFulfilled.bind(inspection);
    result.isPending = inspection.isPending.bind(inspection);
    result.isRejected = inspection.isRejected.bind(inspection);
    result.value = inspection.value.bind(inspection);
    result.reason = inspection.reason.bind(inspection);

    return result;
  };
};
