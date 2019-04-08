import { getPromiseConstructor, GenericPromise } from '../helpers/getPromiseConstructor';

export function immediate<R>(value: R | PromiseLike<R>): GenericPromise<R>;
export function immediate(): GenericPromise<void>;

export function immediate(
  value?: any
): GenericPromise<any> {
  const Promise = getPromiseConstructor(this);

  return new Promise(function immediatePromiseExecutor(resolve) {
    setImmediate(function immediateTimeoutCallback() {
      resolve(value);
    });
  });
};
