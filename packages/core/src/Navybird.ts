import * as errors from './errors';
import { originatesFromRejection } from './errors/OperationalError';
import { catchIf } from './functions/catchIf';
import { catchReturn } from './functions/catchReturn';
import { catchThrow } from './functions/catchThrow';
import { CatchFilter, caught } from './functions/caught';
import { Defer, defer } from './functions/defer';
import { delay } from './functions/delay';
import { eachSeries } from './functions/eachSeries';
import { fromCallback, FromCallbackOptions } from './functions/fromCallback';
import { immediate } from './functions/immediate';
import { isPromise } from './functions/isPromise';
import { isPromiseLike } from './functions/isPromiseLike';
import { join } from './functions/join';
import { lastly } from './functions/lastly';
import { ConcurrencyOption, map } from './functions/map';
import { mapSeries } from './functions/mapSeries';
import { nodeify, SpreadOption } from './functions/nodeify';
import { reduce } from './functions/reduce';
import { tapCatch } from './functions/tapCatch';
import { timeout } from './functions/timeout';
import { notEnumerableProp } from './helpers/notEnumerableProp';
import { PromiseLikeValueType, Resolvable } from './helpers/types';

export class Navybird<T> extends Promise<T> {
  static default = Navybird
  static Navybird = Navybird

  static isPromise: typeof isPromise = isPromise
  static isPromiseLike: typeof isPromiseLike = isPromiseLike

  /**
   * @$TypeExpand typeof defer
   * @$$Eval (str) => str.replace(/Defer</g, "NavybirdDefer<")
   */
  static defer: <T = any>() => NavybirdDefer<T> = defer as any

  /**
   * @$TypeExpand typeof delay
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
   */
  static delay: { <R>(ms: number, value: Resolvable<R>): Navybird<R>; (ms: number): Navybird<void>; } = delay as any

  /**
   * @$TypeExpand typeof eachSeries
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
   */
  static each: <R, U>(iterable: Resolvable<Iterable<Resolvable<R>>>, iterator: (item: R, index: number, arrayLength: number) => Resolvable<U>) => Navybird<R[]> = eachSeries as any

  /**
   * @$TypeExpand typeof eachSeries
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
   */
  static eachSeries: <R, U>(iterable: Resolvable<Iterable<Resolvable<R>>>, iterator: (item: R, index: number, arrayLength: number) => Resolvable<U>) => Navybird<R[]> = eachSeries as any

  /**
   * @$TypeExpand typeof immediate
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
   */
  static immediate: { <R>(value: Resolvable<R>): Navybird<R>; (): Navybird<void>; } = immediate as any

  /**
   * @$TypeExpand typeof fromCallback
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
   */
  static fromCallback: { (resolver: (callback: (err: any, result?: any) => void) => void, options?: FromCallbackOptions): Navybird<any>; <T>(resolver: (callback: (err: any, result?: T) => void) => void, options?: FromCallbackOptions): Navybird<T>; } = fromCallback as any

  /**
   * @$TypeExpand typeof fromCallback
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
   */
  static fromNode: { (resolver: (callback: (err: any, result?: any) => void) => void, options?: FromCallbackOptions): Navybird<any>; <T>(resolver: (callback: (err: any, result?: T) => void) => void, options?: FromCallbackOptions): Navybird<T>; } = fromCallback as any

  /**
   * @$TypeExpand typeof join
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
   */
  static join: { <R, A1>(arg1: Resolvable<A1>, handler: (arg1: A1) => Resolvable<R>): Navybird<R>; <R, A1, A2>(arg1: Resolvable<A1>, arg2: Resolvable<A2>, handler: (arg1: A1, arg2: A2) => Resolvable<R>): Navybird<R>; <R, A1, A2, A3>(arg1: Resolvable<A1>, arg2: Resolvable<A2>, arg3: Resolvable<A3>, handler: (arg1: A1, arg2: A2, arg3: A3) => Resolvable<R>): Navybird<R>; <R, A1, A2, A3, A4>(arg1: Resolvable<A1>, arg2: Resolvable<A2>, arg3: Resolvable<A3>, arg4: Resolvable<A4>, handler: (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Resolvable<R>): Navybird<R>; <R, A1, A2, A3, A4, A5>(arg1: Resolvable<A1>, arg2: Resolvable<A2>, arg3: Resolvable<A3>, arg4: Resolvable<A4>, arg5: Resolvable<A5>, handler: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Resolvable<R>): Navybird<R>; <R>(...values: Resolvable<R>[]): Navybird<R[]>; } = join as any

  /**
   * @$TypeExpand typeof map
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
   */
  static map: <R, U>(iterable: Resolvable<Iterable<Resolvable<R>>>, mapper: (item: R, index: number, arrayLength: number) => Resolvable<U>, opts?: ConcurrencyOption) => Navybird<U[]> = map as any

  /**
   * @$TypeExpand typeof mapSeries
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
   */
  static mapSeries: <R, U>(iterable: Resolvable<Iterable<Resolvable<R>>>, iterator: (item: R, index: number, arrayLength: number) => Resolvable<U>) => Navybird<U[]> = mapSeries as any

  /**
   * @$TypeExpand typeof reduce
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
   */
  static reduce: { <R, U>(iterable: Resolvable<Iterable<Resolvable<R>>>, reducer: (memo: U, current: R, index: number, arrayLength: number) => Resolvable<U>, initialValue?: U): Navybird<U>; <R>(iterable: Resolvable<Iterable<Resolvable<R>>>, reducer: (memo: R, current: R, index: number, arrayLength: number) => Resolvable<R>): Navybird<R>; } = reduce as any

  // #region Instance Methods

  /**
   * @$TypeExpand typeof caught
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird").replace(/promise:/g, "this:")
   */
  catch!: { <P extends PromiseLike<any>>(this: P, onReject: (error: any) => PromiseLikeValueType<P> | PromiseLike<PromiseLikeValueType<P>>): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U>(this: P, onReject: (error: any) => U | PromiseLike<U>): Navybird<U | PromiseLikeValueType<P>>; <P extends PromiseLike<any>, E1, E2, E3, E4, E5>(this: P, filter1: CatchFilter<E1>, filter2: CatchFilter<E2>, filter3: CatchFilter<E3>, filter4: CatchFilter<E4>, filter5: CatchFilter<E5>, onReject: (error: E1 | E2 | E3 | E4 | E5) => PromiseLikeValueType<P> | PromiseLike<PromiseLikeValueType<P>>): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U, E1, E2, E3, E4, E5>(this: P, filter1: CatchFilter<E1>, filter2: CatchFilter<E2>, filter3: CatchFilter<E3>, filter4: CatchFilter<E4>, filter5: CatchFilter<E5>, onReject: (error: E1 | E2 | E3 | E4 | E5) => U | PromiseLike<U>): Navybird<U | PromiseLikeValueType<P>>; <P extends PromiseLike<any>, E1, E2, E3, E4>(this: P, filter1: CatchFilter<E1>, filter2: CatchFilter<E2>, filter3: CatchFilter<E3>, filter4: CatchFilter<E4>, onReject: (error: E1 | E2 | E3 | E4) => PromiseLikeValueType<P> | PromiseLike<PromiseLikeValueType<P>>): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U, E1, E2, E3, E4>(this: P, filter1: CatchFilter<E1>, filter2: CatchFilter<E2>, filter3: CatchFilter<E3>, filter4: CatchFilter<E4>, onReject: (error: E1 | E2 | E3 | E4) => U | PromiseLike<U>): Navybird<U | PromiseLikeValueType<P>>; <P extends PromiseLike<any>, E1, E2, E3>(this: P, filter1: CatchFilter<E1>, filter2: CatchFilter<E2>, filter3: CatchFilter<E3>, onReject: (error: E1 | E2 | E3) => PromiseLikeValueType<P> | PromiseLike<PromiseLikeValueType<P>>): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U, E1, E2, E3>(this: P, filter1: CatchFilter<E1>, filter2: CatchFilter<E2>, filter3: CatchFilter<E3>, onReject: (error: E1 | E2 | E3) => U | PromiseLike<U>): Navybird<U | PromiseLikeValueType<P>>; <P extends PromiseLike<any>, E1, E2>(this: P, filter1: CatchFilter<E1>, filter2: CatchFilter<E2>, onReject: (error: E1 | E2) => PromiseLikeValueType<P> | PromiseLike<PromiseLikeValueType<P>>): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U, E1, E2>(this: P, filter1: CatchFilter<E1>, filter2: CatchFilter<E2>, onReject: (error: E1 | E2) => U | PromiseLike<U>): Navybird<U | PromiseLikeValueType<P>>; <P extends PromiseLike<any>, E1>(this: P, filter1: CatchFilter<E1>, onReject: (error: E1) => PromiseLikeValueType<P> | PromiseLike<PromiseLikeValueType<P>>): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U, E1>(this: P, filter1: CatchFilter<E1>, onReject: (error: E1) => U | PromiseLike<U>): Navybird<U | PromiseLikeValueType<P>>; }

  caught!: Navybird<T>['catch']

  /**
   * Like `.catch` but instead of catching all types of exceptions, it only catches those that don't originate from thrown errors but rather from explicit rejections.
   */
  error<U>(onReject: (reason: any) => U | PromiseLike<U>) {
    return this.then(null, catchIf(originatesFromRejection, onReject))
  }

  finally!: Navybird<T>['lastly']

  /**
   * @$TypeExpand typeof lastly
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird").replace(/promise:/g, "this:")
   */
  lastly!: <P extends PromiseLike<any>>(this: P, handler: () => any) => P

  tap<U>(onFulFill: (value: T) => Resolvable<U>) {
    return this.then(function tapHandle(val) {
      return Promise
        .resolve(val)
        .then(onFulFill)
        .then(function tapReturnValue() {
          return val;
        });
    });
  }

  /**
   * @$TypeExpand typeof tapCatch
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird").replace(/promise:/g, "this:")
   */
  tapCatch!: { <P extends PromiseLike<any>, U>(this: P, onReject: (error?: any) => U | PromiseLike<U>): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U, E1, E2, E3, E4, E5>(this: P, filter1: CatchFilter<E1>, filter2: CatchFilter<E2>, filter3: CatchFilter<E3>, filter4: CatchFilter<E4>, filter5: CatchFilter<E5>, onReject: (error: E1 | E2 | E3 | E4 | E5) => U | PromiseLike<U>): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U, E1, E2, E3, E4>(this: P, filter1: CatchFilter<E1>, filter2: CatchFilter<E2>, filter3: CatchFilter<E3>, filter4: CatchFilter<E4>, onReject: (error: E1 | E2 | E3 | E4) => U | PromiseLike<U>): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U, E1, E2, E3>(this: P, filter1: CatchFilter<E1>, filter2: CatchFilter<E2>, filter3: CatchFilter<E3>, onReject: (error: E1 | E2 | E3) => U | PromiseLike<U>): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U, E1, E2>(this: P, filter1: CatchFilter<E1>, filter2: CatchFilter<E2>, onReject: (error: E1 | E2) => U | PromiseLike<U>): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U, E1>(this: P, filter1: CatchFilter<E1>, onReject: (error: E1) => U | PromiseLike<U>): Navybird<PromiseLikeValueType<P>>; }

  delay(ms: number) {
    return this.tap(function delayValue() {
      return delay(ms);
    });
  }

  immediate() {
    return this.tap(immediate);
  }

  /**
   * @$TypeExpand typeof timeout
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird").replace(/promise:/g, "this:")
   */
  timeout!: { <T>(this: PromiseLike<T> | (PromiseLike<T> & { cancel(): any; }), ms: number, fallback?: string | Error): Navybird<T>; <T, R>(this: PromiseLike<T> | (PromiseLike<T> & { cancel(): any; }), ms: number, fallback: () => Resolvable<R>): Navybird<R>; }

  /**
   * @$TypeExpand typeof nodeify
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird").replace(/promise:/g, "this:")
   */
  nodeify!: { <P extends PromiseLike<any>>(this: P, callback: (err: any, value?: PromiseLikeValueType<P>) => void, options?: SpreadOption): P; <P extends PromiseLike<any>>(this: P, ...sink: any[]): P; }

  /**
   * @$TypeExpand typeof nodeify
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird").replace(/promise:/g, "this:")
   */
  asCallback!: { <P extends PromiseLike<any>>(this: P, callback: (err: any, value?: PromiseLikeValueType<P>) => void, options?: SpreadOption): P; <P extends PromiseLike<any>>(this: P, ...sink: any[]): P; }

  // FIXME: reflect

  return(): Navybird<void>;
  return<U>(value: U): Navybird<U>;
  return(value?: any) {
    return this.then(function thenReturnValue() {
      return value;
    });
  }

  thenReturn(): Navybird<void>;
  thenReturn<U>(value: U): Navybird<U>;
  thenReturn(value?: any) {
    return this.then(function thenReturnValue() {
      return value;
    });
  }

  throw(reason: Error): Navybird<never> {
    return this.then(function thenThrowReason() {
      throw reason;
    });
  }

  thenThrow(reason: Error): Navybird<never> {
    return this.then(function thenThrowReason() {
      throw reason;
    });
  }

  /**
   * @$TypeExpand typeof catchReturn
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird").replace(/promise:/g, "this:")
   */
  catchReturn!: { <P extends PromiseLike<any>, U>(this: P, value: U): Navybird<U | PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U>(this: P, filter1: CatchFilter<Error>, filter2: CatchFilter<Error>, filter3: CatchFilter<Error>, filter4: CatchFilter<Error>, filter5: CatchFilter<Error>, value: U): Navybird<U | PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U>(this: P, filter1: CatchFilter<Error>, filter2: CatchFilter<Error>, filter3: CatchFilter<Error>, filter4: CatchFilter<Error>, value: U): Navybird<U | PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U>(this: P, filter1: CatchFilter<Error>, filter2: CatchFilter<Error>, filter3: CatchFilter<Error>, value: U): Navybird<U | PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U>(this: P, filter1: CatchFilter<Error>, filter2: CatchFilter<Error>, value: U): Navybird<U | PromiseLikeValueType<P>>; <P extends PromiseLike<any>, U>(this: P, filter1: CatchFilter<Error>, value: U): Navybird<U | PromiseLikeValueType<P>>; }

  /**
   * @$TypeExpand typeof catchThrow
   * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird").replace(/promise:/g, "this:")
   */
  catchThrow!: { <P extends PromiseLike<any>>(this: P, reason: Error): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>>(this: P, filter1: CatchFilter<Error>, filter2: CatchFilter<Error>, filter3: CatchFilter<Error>, filter4: CatchFilter<Error>, filter5: CatchFilter<Error>, reason: Error): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>>(this: P, filter1: CatchFilter<Error>, filter2: CatchFilter<Error>, filter3: CatchFilter<Error>, filter4: CatchFilter<Error>, reason: Error): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>>(this: P, filter1: CatchFilter<Error>, filter2: CatchFilter<Error>, filter3: CatchFilter<Error>, reason: Error): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>>(this: P, filter1: CatchFilter<Error>, filter2: CatchFilter<Error>, reason: Error): Navybird<PromiseLikeValueType<P>>; <P extends PromiseLike<any>>(this: P, filter1: CatchFilter<Error>, reason: Error): Navybird<PromiseLikeValueType<P>>; }

  /**
   * Like calling `.then`, but the fulfillment value or rejection reason is assumed to be an array, which is flattened to the formal parameters of the handlers.
   */
  spread<U, Q>(this: Navybird<T & Iterable<Q>>, fulfilledHandler: (...values: Q[]) => Resolvable<U>): Navybird<U> {
    return this.then(function spreadOnFulfilled(val) {
      if (typeof fulfilledHandler !== "function") {
        throw new errors.TypeError(
          `fulfilledHandler is not function`
        );
        // TODO: return utils.apiRejection(constants.FUNCTION_ERROR + utils.classString(fn));
      }
      return fulfilledHandler(...val);
    });
  }

  /**
   * Same as calling `Promise.all(thisPromise)`.
   */
  all(this: Navybird<Iterable<{}>>): Navybird<T>;

  /**
   * Same as calling `Promise.all(thisPromise)`.
   */
  all(): Navybird<never>;

  all(): Navybird<any> {
    const args = arguments
    const promiseConstructor = this.constructor as typeof Navybird;
    return this.then(function allOnFulfilled(val: any) {
      return promiseConstructor.all.call(promiseConstructor, val, ...args);
    });
  }

  /**
   * Same as calling `Promise.map(thisPromise, mapper)`.
   */
  map<U, Q>(this: Navybird<T & Iterable<Q>>, mapper: (item: Q, index: number, arrayLength: number) => Resolvable<U>, options?: ConcurrencyOption): Navybird<U[]>;

  map(): Navybird<any> {
    const args = arguments
    const promiseConstructor = this.constructor as typeof Navybird;
    return this.then(function mapOnFulfilled(val: any) {
      return promiseConstructor.map.call(promiseConstructor, val, ...args);
    });
  }

  /**
   * Same as calling ``Promise.mapSeries(thisPromise, iterator)``.
   */
  mapSeries<U, Q>(this: Navybird<T & Iterable<Q>>, iterator: (item: Q, index: number, arrayLength: number) => Resolvable<U>): Navybird<U[]>;

  mapSeries(): Navybird<any> {
    const args = arguments
    const promiseConstructor = this.constructor as typeof Navybird;
    return this.then(function mapSeriesOnFulfilled(val: any) {
      return promiseConstructor.mapSeries.call(promiseConstructor, val, ...args);
    });
  }

  /**
   * Same as calling `Promise.reduce(thisPromise, Function reducer, initialValue)`.
   */
  reduce<U, Q>(this: Navybird<T & Iterable<Q>>, reducer: (memo: U, item: Q, index: number, arrayLength: number) => Resolvable<U>, initialValue?: U): Navybird<U>;

  reduce(): Navybird<any> {
    const args = arguments
    const promiseConstructor = this.constructor as typeof Navybird;
    return this.then(function reduceOnFulfilled(val: any) {
      return promiseConstructor.reduce.call(promiseConstructor, val, ...args);
    });
  }

  /**
   * Same as calling ``Promise.each(thisPromise, iterator)``.
   */
  each<Q>(this: Navybird<T & Iterable<Q>>, iterator: (item: Q, index: number, arrayLength: number) => Resolvable<any>): Navybird<T>;

  each(): Navybird<any> {
    const args = arguments
    const promiseConstructor = this.constructor as typeof Navybird;
    return this.then(function eachOnFulfilled(val: any) {
      return promiseConstructor.each.call(promiseConstructor, val, ...args);
    });
  }

  /**
   * Same as calling ``Promise.eachSeries(thisPromise, iterator)``.
   */
  eachSeries<Q>(this: Navybird<T & Iterable<Q>>, iterator: (item: Q, index: number, arrayLength: number) => Resolvable<any>): Navybird<T>;

  eachSeries(): Navybird<any> {
    const args = arguments
    const promiseConstructor = this.constructor as typeof Navybird;
    return this.then(function eachSeriesOnFulfilled(val: any) {
      return promiseConstructor.eachSeries.call(promiseConstructor, val, ...args);
    });
  }

  // #endregion

  // #region Original Methods

  /**
   * Creates a Promise that is resolved with an array of results when all of the provided Promises
   * resolve, or rejected when any Promise is rejected.
   * @param values An array of Promises.
   * @returns A new Promise.
   * 
   * @$TypeExpand PromiseConstructor['all']
   * @$$Eval (str) => str.replace(/: Promise</g, ": Navybird<")
   */
  static all: { <TAll>(values: Iterable<TAll | PromiseLike<TAll>>): Navybird<TAll[]>; <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Navybird<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>; <T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Navybird<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>; <T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Navybird<[T1, T2, T3, T4, T5, T6, T7, T8]>; <T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Navybird<[T1, T2, T3, T4, T5, T6, T7]>; <T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Navybird<[T1, T2, T3, T4, T5, T6]>; <T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Navybird<[T1, T2, T3, T4, T5]>; <T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Navybird<[T1, T2, T3, T4]>; <T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Navybird<[T1, T2, T3]>; <T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Navybird<[T1, T2]>; <T>(values: (T | PromiseLike<T>)[]): Navybird<T[]>; };

  /**
   * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
   * or rejected.
   * @param values An array of Promises.
   * @returns A new Promise.
   *
   * @$TypeExpand PromiseConstructor['race']
   * @$$Eval (str) => str.replace(/: Promise</g, ": Navybird<")
   */
  static race: { <T>(values: Iterable<T | PromiseLike<T>>): Navybird<T>; <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Navybird<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>; <T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Navybird<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>; <T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Navybird<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>; <T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Navybird<T1 | T2 | T3 | T4 | T5 | T6 | T7>; <T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Navybird<T1 | T2 | T3 | T4 | T5 | T6>; <T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Navybird<T1 | T2 | T3 | T4 | T5>; <T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Navybird<T1 | T2 | T3 | T4>; <T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Navybird<T1 | T2 | T3>; <T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Navybird<T1 | T2>; <T>(values: (T | PromiseLike<T>)[]): Navybird<T>; }

  /**
   * Creates a new rejected promise for the provided reason.
   * @param reason The reason the promise was rejected.
   * @returns A new rejected Promise.
   *
   * @$TypeExpand PromiseConstructor['reject']
   * @$$Eval (str) => str.replace(/ Promise</g, " Navybird<")
   */
  static reject: <T = never>(reason?: any) => Navybird<T>;

  static resolve: {
    /**
     * Creates a new resolved promise for the provided value.
     * @param value A promise.
     * @returns A promise whose internal state matches the provided promise.
     */
    <T>(value: T | PromiseLike<T>): Navybird<T>
    /**
     * Creates a new resolved promise .
     * @returns A resolved promise.
     */
    (): Navybird<void>
  };

  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then!: {
    <TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Navybird<TResult1 | TResult2>
  };

  // #endregion

  static cast: typeof Navybird['resolve'] = Navybird.resolve.bind(Navybird)
  static fulfilled: typeof Navybird['resolve'] = Navybird.resolve.bind(Navybird)
  static rejected: typeof Navybird['reject'] = Navybird.reject.bind(Navybird)
  static pending: typeof Navybird['defer'] = Navybird.defer.bind(Navybird)
}

export namespace Navybird {
  export const TypeError = errors.TypeError;
  export type TypeError = typeof TypeError;

  export const OperationalError = errors.OperationalError;
  export type OperationalError = typeof OperationalError;

  export const TimeoutError = errors.TimeoutError;
  export type TimeoutError = typeof TimeoutError;
}

export class NavybirdDefer<T> extends Defer<T> {
  public readonly promise!: Navybird<T>
}

Navybird.prototype.timeout = function () {
  return timeout.call(this.constructor, this, ...arguments);
} as any

Navybird.prototype.lastly = function () {
  return lastly.call(this.constructor, this, ...arguments);
} as any

Navybird.prototype.finally = function () {
  return lastly.call(this.constructor, this, ...arguments);
} as any

Navybird.prototype.nodeify = function () {
  return nodeify.call(this.constructor, this, ...arguments);
} as any

Navybird.prototype.asCallback = function () {
  return nodeify.call(this.constructor, this, ...arguments);
} as any

Navybird.prototype.catch = function () {
  return caught.call(this.constructor, this, ...arguments);
} as any

Navybird.prototype.caught = Navybird.prototype.catch;

Navybird.prototype.catchReturn = function () {
  return catchReturn.call(this.constructor, this, ...arguments);
} as any

Navybird.prototype.catchThrow = function () {
  return catchThrow.call(this.constructor, this, ...arguments);
} as any

Navybird.prototype.tapCatch = function () {
  return tapCatch.call(this.constructor, this, ...arguments);
} as any

Object.keys(Navybird).forEach(function (key: Extract<keyof typeof Navybird, string>) {
  notEnumerableProp(Navybird, key, Navybird[key]);
});
