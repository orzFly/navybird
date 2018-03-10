// https://github.com/sindresorhus/p-timeout/blob/7fc1cb3dd20ee3368901725f76e20295350873e9/index.js
// https://github.com/sindresorhus/p-timeout/blob/7fc1cb3dd20ee3368901725f76e20295350873e9/license
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
// MIT License

"use strict";
const errors = require("../errors");

module.exports = function timeout(promise, ms, fallback) {
  return new promise.constructor(function timeoutPromise(resolve, reject) {
    if (typeof ms !== "number" || ms < 0) {
      throw new TypeError("Expected `ms` to be a positive number");
    }

    const timer = setTimeout(function timeoutChecker() {
      if (typeof fallback === "function") {
        try {
          resolve(fallback());
        } catch (err) {
          reject(err);
        }
        return;
      }

      const message =
        typeof fallback === "string"
          ? fallback
          : `Promise timed out after ${ms} milliseconds`;
      const err =
        fallback instanceof Error ? fallback : new errors.errors.TimeoutError(message);

      if (typeof promise.cancel === "function") {
        promise.cancel();
      }

      reject(err);
    }, ms);

    promise.then(resolve, reject).finally(function timeoutFinally() {
      clearTimeout(timer);
    });
  });
};
