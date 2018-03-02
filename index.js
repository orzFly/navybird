'use strict';

const delay = require('delay');
const pCatchIf = require('p-catch-if');

class NavybirdPromise extends Promise {
  caught(...args) {
    return Promise.prototype.catch.call(this, catchFn(args));
  }

  tap(fn) {
    const promiseConstructor = this.constructor;
    return this.then(function tapHandle(val) {
      return promiseConstructor.resolve(val)
        .then(fn)
        .then(function tapReturnValue() {
          return val;
        });
    });
  }

  tapCatch(...args) {
    const promiseConstructor = this.constructor;
    return this.catch(function tapCatchHandle(err) {
      return promiseConstructor.resolve(err)
        .then(catchFn(args))
        .then(function tapCatchValue() {
          return promiseConstructor.reject(err);
        });
    })
  }

  delay(ms) {
    return this.tap(function delayValue() {
      return delay(ms)
    });
  }

  thenReturn(value) {
    return this.then(function thenReturnValue() {
      return value
    });
  }

  spread(fn) {
    if (typeof fn !== "function") {
      return apiRejection(FUNCTION_ERROR + classString(fn));
    }
    return this.then(function spreadValue(val) {
      return fn(...val)
    });
  }

  all() {
    const promiseConstructor = this.constructor;
    return this.then(function allValue(val) {
      return promiseConstructor.all(val)
    });
  }
}

module.exports = NavybirdPromise;

const FUNCTION_ERROR = "expecting a function but got ";

const apiRejection = function (msg) {
  return NavybirdPromise.reject(new NavybirdPromise.TypeError(msg));
};

const classString = function (obj) {
  return {}.toString.call(obj);
}

const resolveWrapper = function (fn) {
  return function () {
    return NavybirdPromise.resolve(fn.apply(this, arguments))
  }
}

const catchFn = function (args) {
  if (args.length > 2) {
    return pCatchIf(args.slice(0, args.length - 1), args[args.length - 1])
  } else if (args.length == 2) {
    return pCatchIf(args[0], args[1]);
  }
  return args[0];
}

NavybirdPromise.TypeError = TypeError;
NavybirdPromise.prototype['catch'] = NavybirdPromise.prototype.caught;
NavybirdPromise.prototype['return'] = NavybirdPromise.prototype.thenReturn;
NavybirdPromise.delay = resolveWrapper(delay);
NavybirdPromise.isPromise = require('p-is-promise');
NavybirdPromise.map = require('./src/map')(NavybirdPromise, apiRejection, FUNCTION_ERROR, classString);

NavybirdPromise.defer = function () {
  let resolve, reject;
  const promise = new NavybirdPromise(function deferPromiseCapturer(_resolve, _reject) {
    resolve = _resolve;
    reject = _reject;
  });
  return {
    resolve: resolve,
    reject: reject,
    promise: promise
  };
}

NavybirdPromise.join = function (...args) {
  const last = args.length - 1;
  if (last > 0 && typeof args[last] === 'function') {
    const fn = args.pop();
    return NavybirdPromise.all(args).spread(fn);
  }
  return NavybirdPromise.all(args);
}