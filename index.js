'use strict';

const delay = require('delay');
const pCatchIf = require('p-catch-if');

const catchFn = (args) => {
  if (args.length > 2) {
    return pCatchIf(args.slice(0, args.length - 1), args[args.length - 1])
  } else if (args.length == 2) {
    return pCatchIf(args[0], args[1]);
  }
  return args[0];
}

class NavybirdPromise extends Promise {
  caught(...args) {
    return Promise.prototype.catch.call(this, catchFn(args));
  }

  tap(fn) {
    return this.then((val) => {
      const ret = () => val;
      return this.constructor.resolve(val).then(fn).then(ret);
    })
  }

  tapCatch(...args) {
    return this.catch((err) => {
      const ret = () => Promise.reject(err);
      return Promise.resolve(err).then(catchFn(args)).then(ret);
    })
  }

  delay(ms, value) {
    return this.tap(() => delay(ms, value));
  }

  thenReturn(value) {
    return this.then(() => value)
  }
}
module.exports = NavybirdPromise;

const resolveWrapper = function (fn) {
  return function () {
    return NavybirdPromise.resolve(fn.apply(this, arguments))
  }
}

NavybirdPromise.prototype['catch'] = NavybirdPromise.prototype.caught;
NavybirdPromise.prototype['return'] = NavybirdPromise.prototype.thenReturn;
NavybirdPromise.delay = resolveWrapper(delay);
NavybirdPromise.map = require('./vendor/p-map')(NavybirdPromise);
NavybirdPromise.isPromise = require('p-is-promise');