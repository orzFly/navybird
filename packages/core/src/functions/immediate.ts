import { GenericPromise, getPromiseConstructor } from '../helpers/getPromiseConstructor';
import { Resolvable } from '../helpers/resolvable';

export function immediate<R>(value: Resolvable<R>): GenericPromise<R>;
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
