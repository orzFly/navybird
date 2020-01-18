import { GenericPromise, getPromiseConstructor } from '../helpers/getPromiseConstructor';

export interface BasePromisifyOptions {
  context?: any;
}

export interface MultiArgsPromisifyOptions extends BasePromisifyOptions {
  multiArgs: true;
  errorFirst?: true | null | undefined;
}

export interface NoErrorPromisifyOptions extends BasePromisifyOptions {
  multiArgs?: false | null | undefined;
  errorFirst: false;
}

export interface MultiArgsNoErrorPromisifyOptions extends BasePromisifyOptions {
  multiArgs: true;
  errorFirst: false;
}

export interface PromisifyOptions extends BasePromisifyOptions {
  multiArgs?: boolean | null | undefined;
  errorFirst?: boolean | null | undefined;
}

/**
 * Returns a function that will wrap the given `nodeFunction`.
 *
 * Instead of taking a callback, the returned function will return a promise whose fate is decided by the callback behavior of the given node function.
 * The node function should conform to node.js convention of accepting a callback as last argument and
 * calling that callback with error as the first argument and success value on the second argument.
 *
 * If the `nodeFunction` calls its callback with multiple success values, the fulfillment value will be an array of them.
 *
 * If you pass a `receiver`, the `nodeFunction` will be called as a method on the `receiver`.
 */

export function promisify<T extends any[]>(
  func: (callback: (...result: T) => void) => void,
  options: MultiArgsNoErrorPromisifyOptions
): () => GenericPromise<T>;
export function promisify<T extends any[], A1>(
  func: (arg1: A1, callback: (...result: T) => void) => void,
  options: MultiArgsNoErrorPromisifyOptions
): (arg1: A1) => GenericPromise<T>;
export function promisify<T extends any[], A1, A2>(
  func: (arg1: A1, arg2: A2, callback: (...result: T) => void) => void,
  options: MultiArgsNoErrorPromisifyOptions
): (arg1: A1, arg2: A2) => GenericPromise<T>;
export function promisify<T extends any[], A1, A2, A3>(
  func: (arg1: A1, arg2: A2, arg3: A3, callback: (...result: T) => void) => void,
  options: MultiArgsNoErrorPromisifyOptions
): (arg1: A1, arg2: A2, arg3: A3) => GenericPromise<T>;
export function promisify<T extends any[], A1, A2, A3, A4>(
  func: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (...result: T) => void) => void,
  options: MultiArgsNoErrorPromisifyOptions
): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => GenericPromise<T>;
export function promisify<T extends any[], A1, A2, A3, A4, A5>(
  func: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (...result: T) => void) => void,
  options: MultiArgsNoErrorPromisifyOptions
): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => GenericPromise<T>;

export function promisify<T>(
  func: (callback: (result?: T) => void) => void,
  options: NoErrorPromisifyOptions
): () => GenericPromise<T>;
export function promisify<T, A1>(
  func: (arg1: A1, callback: (result?: T) => void) => void,
  options: NoErrorPromisifyOptions
): (arg1: A1) => GenericPromise<T>;
export function promisify<T, A1, A2>(
  func: (arg1: A1, arg2: A2, callback: (result?: T) => void) => void,
  options: NoErrorPromisifyOptions
): (arg1: A1, arg2: A2) => GenericPromise<T>;
export function promisify<T, A1, A2, A3>(
  func: (arg1: A1, arg2: A2, arg3: A3, callback: (result?: T) => void) => void,
  options: NoErrorPromisifyOptions
): (arg1: A1, arg2: A2, arg3: A3) => GenericPromise<T>;
export function promisify<T, A1, A2, A3, A4>(
  func: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (result?: T) => void) => void,
  options: NoErrorPromisifyOptions
): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => GenericPromise<T>;
export function promisify<T, A1, A2, A3, A4, A5>(
  func: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (result?: T) => void) => void,
  options: NoErrorPromisifyOptions
): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => GenericPromise<T>;

export function promisify<T extends any[]>(
  func: (callback: (err: any, ...result: T) => void) => void,
  options: MultiArgsPromisifyOptions
): () => GenericPromise<T>;
export function promisify<T extends any[], A1>(
  func: (arg1: A1, callback: (err: any, ...result: T) => void) => void,
  options: MultiArgsPromisifyOptions
): (arg1: A1) => GenericPromise<T>;
export function promisify<T extends any[], A1, A2>(
  func: (arg1: A1, arg2: A2, callback: (err: any, ...result: T) => void) => void,
  options: MultiArgsPromisifyOptions
): (arg1: A1, arg2: A2) => GenericPromise<T>;
export function promisify<T extends any[], A1, A2, A3>(
  func: (arg1: A1, arg2: A2, arg3: A3, callback: (err: any, ...result: T) => void) => void,
  options: MultiArgsPromisifyOptions
): (arg1: A1, arg2: A2, arg3: A3) => GenericPromise<T>;
export function promisify<T extends any[], A1, A2, A3, A4>(
  func: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (err: any, ...result: T) => void) => void,
  options: MultiArgsPromisifyOptions
): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => GenericPromise<T>;
export function promisify<T extends any[], A1, A2, A3, A4, A5>(
  func: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (err: any, ...result: T) => void) => void,
  options: MultiArgsPromisifyOptions
): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => GenericPromise<T>;

export function promisify<T>(
  func: (callback: (err: any, result?: T) => void) => void,
  options?: PromisifyOptions
): () => GenericPromise<T>;
export function promisify<T, A1>(
  func: (arg1: A1, callback: (err: any, result?: T) => void) => void,
  options?: PromisifyOptions
): (arg1: A1) => GenericPromise<T>;
export function promisify<T, A1, A2>(
  func: (arg1: A1, arg2: A2, callback: (err: any, result?: T) => void) => void,
  options?: PromisifyOptions
): (arg1: A1, arg2: A2) => GenericPromise<T>;
export function promisify<T, A1, A2, A3>(
  func: (arg1: A1, arg2: A2, arg3: A3, callback: (err: any, result?: T) => void) => void,
  options?: PromisifyOptions
): (arg1: A1, arg2: A2, arg3: A3) => GenericPromise<T>;
export function promisify<T, A1, A2, A3, A4>(
  func: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (err: any, result?: T) => void) => void,
  options?: PromisifyOptions
): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => GenericPromise<T>;
export function promisify<T, A1, A2, A3, A4, A5>(
  func: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (err: any, result?: T) => void) => void,
  options?: PromisifyOptions
): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => GenericPromise<T>;

export function promisify(
  func: (...args: any[]) => void,
  options: PromisifyOptions = {}
): (...args: any[]) => GenericPromise<any> {
  const Promise = getPromiseConstructor(this);
  const { context, multiArgs, errorFirst } = Object.assign({
    context: undefined,
    multiArgs: false,
    errorFirst: true,
  }, options)

  return function (...args: any[]) {
    return new Promise((resolve, reject) => {
      if (multiArgs === true) {
        args.push((...result: any[]) => {
          if (errorFirst === false) {
            if (result[0]) {
              reject(result);
            } else {
              result.shift();
              resolve(result);
            }
          } else {
            resolve(result);
          }
        });
      } else if (errorFirst !== false) {
        args.push((error: any, result: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      } else {
        args.push(resolve);
      }

      func.apply(context === undefined ? this : context, args);
    });
  };
}
