"use strict";

const delay = require("delay");
const pCatchIf = require("p-catch-if");

class Navybird extends Promise {
  caught(...args) {
    return Promise.prototype.catch.call(this, catchFn(args));
  }

  tap(fn) {
    const promiseConstructor = this.constructor;
    return this.then(function tapHandle(val) {
      return promiseConstructor
        .resolve(val)
        .then(fn)
        .then(function tapReturnValue() {
          return val;
        });
    });
  }

  tapCatch(...args) {
    const promiseConstructor = this.constructor;
    return this.catch(function tapCatchHandle(err) {
      return promiseConstructor
        .resolve(err)
        .then(catchFn(args))
        .then(function tapCatchValue() {
          return promiseConstructor.reject(err);
        });
    });
  }

  delay(ms) {
    return this.tap(function delayValue() {
      return delay(ms);
    });
  }

  thenReturn(value) {
    return this.then(function thenReturnValue() {
      return value;
    });
  }

  spread(fn) {
    if (typeof fn !== "function") {
      return apiRejection(FUNCTION_ERROR + classString(fn));
    }
    return this.then(function spreadValue(val) {
      return fn(...val);
    });
  }

  map(mapper, opts) {
    const promiseConstructor = this.constructor;
    return this.then(function allValue(val) {
      return promiseConstructor.map(val, mapper, opts);
    });
  }

  all() {
    const promiseConstructor = this.constructor;
    return this.then(function allValue(val) {
      return promiseConstructor.all(val);
    });
  }

  finally(onFinally) {
    const promiseConstructor = this.constructor;
    onFinally = onFinally || function() {};

    return this.then(
      function finallyResolvedHandle(val) {
        return promiseConstructor
          .resolve(onFinally())
          .then(function finallyResolvedValue() {
            return val;
          });
      },
      function finallyRejectedHandle(err) {
        return promiseConstructor
          .resolve(onFinally())
          .then(function finallyRejectedValue() {
            throw err;
          });
      }
    );
  }

  inspectable() {
    return this.constructor.inspectable(this);
  }

  reflect() {
    const inspection = new PromiseInspection(this);
    const val = function reflectValue() {
      return inspection;
    };
    return inspection.target().then(val, val);
  }
}

module.exports = Navybird;

const FUNCTION_ERROR = "expecting a function but got ";

const INSPECTION_VALUE_ERROR =
  "cannot get fulfillment value of a non-fulfilled promise\n\n\
    See http://goo.gl/MqrFmX\n";

const INSPECTION_REASON_ERROR =
  "cannot get rejection reason of a non-rejected promise\n\n\
    See http://goo.gl/MqrFmX\n";

const apiRejection = function(msg) {
  return Navybird.reject(new Navybird.TypeError(msg));
};

const classString = function(obj) {
  return {}.toString.call(obj);
};

const resolveWrapper = function(fn) {
  return function() {
    return Navybird.resolve(fn.apply(this, arguments));
  };
};

const catchFn = function(args) {
  if (args.length > 2) {
    return pCatchIf(args.slice(0, args.length - 1), args[args.length - 1]);
  } else if (args.length == 2) {
    return pCatchIf(args[0], args[1]);
  }
  return args[0];
};

Navybird.TypeError = TypeError;
Navybird.prototype["catch"] = Navybird.prototype.caught;
Navybird.prototype["return"] = Navybird.prototype.thenReturn;
Navybird.prototype.lastly = Navybird.prototype.finally;

Navybird.delay = resolveWrapper(delay);
Navybird.isPromise = require("p-is-promise");
Navybird.map = require("./src/map")(
  Navybird,
  apiRejection,
  FUNCTION_ERROR,
  classString
);

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

Navybird.defer = function() {
  return new NavybirdDefer();
};

Navybird.cast = Navybird.resolve.bind(Navybird);
Navybird.fulfilled = Navybird.resolve.bind(Navybird);
Navybird.rejected = Navybird.reject.bind(Navybird);
Navybird.pending = Navybird.defer.bind(Navybird);

Navybird.join = function(...args) {
  const last = args.length - 1;
  if (last > 0 && typeof args[last] === "function") {
    const fn = args.pop();
    return Navybird.all(args).spread(fn);
  }
  return Navybird.all(args);
};

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

    throw new Navybird.TypeError(INSPECTION_VALUE_ERROR);
  }

  reason() {
    if (this.isRejected()) return this._reason;

    throw new Navybird.TypeError(INSPECTION_REASON_ERROR);
  }
}

Navybird.PromiseInspection = PromiseInspection;
const NavybirdInspection = Symbol.for("NavybirdInspection");

Navybird.inspectable = function(promise) {
  if (promise[NavybirdInspection]) return promise;

  const inspection = new PromiseInspection(promise);
  const result = inspection.target();
  result[NavybirdInspection] = inspection;
  result.isFulfilled = inspection.isFulfilled.bind(inspection);
  result.isPending = inspection.isPending.bind(inspection);
  result.isRejected = inspection.isRejected.bind(inspection);
  result.value = inspection.value.bind(inspection);
  result.reason = inspection.reason.bind(inspection);

  return result;
};
