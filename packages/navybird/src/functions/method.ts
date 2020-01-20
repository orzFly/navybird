import { TypeError } from '../errors/TypeError';
import { GenericPromise, getPromiseConstructor } from '../helpers/getPromiseConstructor';

export function method<T, Args extends any[]>(fn: (...args: Args) => T | PromiseLike<T>): (...args: Args) => GenericPromise<T> {
  const Promise = getPromiseConstructor(this);
  if (typeof fn !== "function") {
    throw new TypeError(`fn is not function`);
    // TODO: return errors.TypeError(constants.FUNCTION_ERROR + utils.classString(fn));
  }

  return function () {
    try {
      return Promise.resolve(fn.apply(this, arguments));
    } catch (e) {
      return Promise.reject(e);
    }
  }
}