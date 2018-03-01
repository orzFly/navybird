// https://github.com/sindresorhus/p-map/blob/15347cbaa82d517258390d6b1df8ac415701ff5f/index.js
// https://github.com/sindresorhus/p-map/blob/15347cbaa82d517258390d6b1df8ac415701ff5f/license
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
// MIT License

'use strict';
module.exports = (Promise, apiRejection, FUNCTION_ERROR, classString) => {
  const map = (iterable, mapper, opts) => new Promise((resolve, reject) => {
    if (Promise.isPromise(iterable)) {
      return resolve(iterable.then((val) => map(val, mapper, opts)));
    }

    opts = Object.assign({
      concurrency: Infinity
    }, opts);

    if (typeof mapper !== 'function') {
      return resolve(apiRejection(FUNCTION_ERROR + classString(fn)));
    }

    const concurrency = opts.concurrency;

    if (!(typeof concurrency === 'number' && concurrency >= 1)) {
      throw new Promise.TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${concurrency}\` (${typeof concurrency})`);
    }

    const ret = [];
    const iterator = iterable[Symbol.iterator]();
    let isRejected = false;
    let iterableDone = false;
    let resolvingCount = 0;
    let currentIdx = 0;

    const next = () => {
      if (isRejected) {
        return;
      }

      const nextItem = iterator.next();
      const i = currentIdx;
      currentIdx++;

      if (nextItem.done) {
        iterableDone = true;

        if (resolvingCount === 0) {
          resolve(ret);
        }

        return;
      }

      resolvingCount++;

      Promise.resolve(nextItem.value)
        .then(el => mapper(el, i))
        .then(
          val => {
            ret[i] = val;
            resolvingCount--;
            next();
          },
          err => {
            isRejected = true;
            reject(err);
          }
        );
    };

    for (let i = 0; i < concurrency; i++) {
      next();

      if (iterableDone) {
        break;
      }
    }
  });

  return map;
}