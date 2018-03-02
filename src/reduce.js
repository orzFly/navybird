// https://github.com/sindresorhus/p-reduce/blob/0655834c3bda535784027d818d257f17e992e705/index.js
// https://github.com/sindresorhus/p-reduce/blob/0655834c3bda535784027d818d257f17e992e705/license
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
// MIT License

"use strict";
module.exports = function mapFactory(Promise) {
  const reduce = function reduce(iterable, reducer, initVal) {
    return new Promise(function reducePromise(resolve, reject) {
      if (Promise.isPromise(iterable)) {
        return resolve(
          iterable.then(function reduceIterableWaiter(val) {
            return reduce(val, reducer, initVal);
          })
        );
      }

      const iterator = iterable[Symbol.iterator]();
      let i = 0;

      const next = function reduceNext(total) {
        const el = iterator.next();

        if (el.done) {
          resolve(total);
          return;
        }

        Promise.all([total, el.value])
          .then(function reduceWrapper(value) {
            next(reducer(value[0], value[1], i++));
          })
          .catch(reject);
      };

      if (initVal === undefined) {
        const el = iterator.next();
        if (el.done) {
          resolve(undefined);
          return;
        }
        next(el.value);
      } else {
        next(initVal);
      }
    });
  };

  return reduce;
};
