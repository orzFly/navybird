"use strict";
const constants = require("./constants");
const utils = require("./utils");
const errors = require("./errors");
const implementations = {
  catch: require("./src/catch"),
  delay: require("delay"),
};

class Navybird extends Promise {
  caught(...args) {
    return Promise.prototype.catch.call(this, implementations.catch(args));
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
        .then(implementations.catch(args))
        .then(function tapCatchValue() {
          return promiseConstructor.reject(err);
        });
    });
  }

  delay(ms) {
    return this.tap(function delayValue() {
      return implementations.delay(ms);
    });
  }

  thenReturn(value) {
    return this.then(function thenReturnValue() {
      return value;
    });
  }

  spread(fn) {
    if (typeof fn !== "function") {
      return utils.apiRejection(constants.FUNCTION_ERROR + utils.classString(fn));
    }
    return this.then(function spreadValue(val) {
      return fn(...val);
    });
  }

  each(iterator) {
    const promiseConstructor = this.constructor;
    return this.then(function eachValue(val) {
      return promiseConstructor.each(val, iterator);
    });
  }

  eachSeries(iterator) {
    const promiseConstructor = this.constructor;
    return this.then(function eachSeriesValue(val) {
      return promiseConstructor.eachSeries(val, iterator);
    });
  }

  map(mapper, opts) {
    const promiseConstructor = this.constructor;
    return this.then(function mapValue(val) {
      return promiseConstructor.map(val, mapper, opts);
    });
  }

  mapSeries(mapper) {
    const promiseConstructor = this.constructor;
    return this.then(function mapSeriesValue(val) {
      return promiseConstructor.mapSeries(val, mapper);
    });
  }

  reduce(reducer, initVal) {
    const promiseConstructor = this.constructor;
    return this.then(function reduceValue(val) {
      return promiseConstructor.reduce(val, reducer, initVal);
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
    const inspection = new this.constructor.PromiseInspection(this);
    const val = function reflectValue() {
      return inspection;
    };
    return inspection.target().then(val, val);
  }
}

module.exports = Navybird;
utils.setNavybird(Navybird);

Object.assign(Navybird, errors.errors);

Navybird.prototype["catch"] = Navybird.prototype.caught;
Navybird.prototype["return"] = Navybird.prototype.thenReturn;
Navybird.prototype["lastly"] = Navybird.prototype.finally;

Navybird.delay = utils.resolveWrapper(implementations.delay);
Navybird.isPromise = require("p-is-promise");

Navybird.map = require("./src/map")(Navybird);
Navybird.reduce = require("./src/reduce")(Navybird);
Navybird.defer = require("./src/defer")(Navybird);
Navybird.eachSeries = Navybird.each = require("./src/eachSeries")(Navybird);
Navybird.mapSeries = require("./src/mapSeries")(Navybird);
Navybird.fromCallback = Navybird.fromNode = require("./src/fromCallback")(Navybird);
Navybird.join = require("./src/join")(Navybird);
Navybird.PromiseInspection = require("./src/inspection")(Navybird);
Navybird.inspectable = require("./src/inspectable")(Navybird);

Navybird.cast = Navybird.resolve.bind(Navybird);
Navybird.fulfilled = Navybird.resolve.bind(Navybird);
Navybird.rejected = Navybird.reject.bind(Navybird);
Navybird.pending = Navybird.defer.bind(Navybird);

Object.keys(Navybird).forEach(function(key) {
  utils.notEnumerableProp(Navybird, key, Navybird[key]);
});
