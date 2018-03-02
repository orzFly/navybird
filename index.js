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
Navybird.prototype["lastly"] = Navybird.prototype.finally;
Navybird.delay = resolveWrapper(delay);
Navybird.isPromise = require("p-is-promise");
Navybird.map = require("./src/map")(
  Navybird,
  apiRejection,
  FUNCTION_ERROR,
  classString
);

Navybird.defer = function() {
  let resolve, reject;
  const promise = new Navybird(function deferPromiseCapturer(
    _resolve,
    _reject
  ) {
    resolve = _resolve;
    reject = _reject;
  });
  return {
    resolve: resolve,
    reject: reject,
    promise: promise,
  };
};

Navybird.join = function(...args) {
  const last = args.length - 1;
  if (last > 0 && typeof args[last] === "function") {
    const fn = args.pop();
    return Navybird.all(args).spread(fn);
  }
  return Navybird.all(args);
};

Navybird.inspectable = function(promise) {
  if (promise.isFulfilled && promise.isPending && promise.isRejected)
    return promise;

  let isPending = true;
  let isRejected = false;
  let isFulfilled = false;
  let value = undefined;
  let reason = undefined;

  const result = promise.then(
    function inspectableResolvedHandle(v) {
      isFulfilled = true;
      isPending = false;
      value = v;
      return v;
    },
    function inspectableRejectedHandle(e) {
      isRejected = true;
      isPending = false;
      reason = e;
      throw e;
    }
  );

  result.isFulfilled = function() {
    return isFulfilled;
  };
  result.isPending = function() {
    return isPending;
  };
  result.isRejected = function() {
    return isRejected;
  };
  result.isResolved = function() {
    return !isPending;
  };
  result.value = function() {
    if (isFulfilled) return value;
    throw new Navybird.TypeError(INSPECTION_VALUE_ERROR);
  };
  result.reason = function() {
    if (isRejected) return reason;
    throw new Navybird.TypeError(INSPECTION_REASON_ERROR);
  };

  return result;
};
