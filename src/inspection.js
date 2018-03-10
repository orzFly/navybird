"use strict";
const constants = require("../constants");

module.exports = function inspectionFactory(Navybird) {
  class PromiseInspection {
    constructor(target) {
      const self = this;

      this._isPending = true;
      this._isRejected = false;
      this._isFulfilled = false;
      this._value = undefined;
      this._reason = undefined;

      this._target = target.then(
        function inspectableResolvedHandle(v) {
          self._isFulfilled = true;
          self._isPending = false;
          self._value = v;
          return v;
        },
        function inspectableRejectedHandle(e) {
          self._isRejected = true;
          self._isPending = false;
          self._reason = e;
          throw e;
        }
      );
    }

    target() {
      return this._target;
    }

    isFulfilled() {
      return this._isFulfilled;
    }

    isRejected() {
      return this._isRejected;
    }

    isPending() {
      return this._isPending;
    }

    value() {
      if (this.isFulfilled()) return this._value;

      throw new Navybird.TypeError(constants.INSPECTION_VALUE_ERROR);
    }

    reason() {
      if (this.isRejected()) return this._reason;

      throw new Navybird.TypeError(constants.INSPECTION_REASON_ERROR);
    }
  }

  return PromiseInspection;
};
