import { Defer, defer } from './functions/defer';
import { delay } from './functions/delay';
import { eachSeries } from './functions/eachSeries';
import { fromCallback, FromCallbackOptions } from './functions/fromCallback';
import { immediate } from './functions/immediate';
import { isPromise } from './functions/isPromise';
import { isPromiseLike } from './functions/isPromiseLike';
import { ConcurrencyOption, map } from './functions/map';
import { mapSeries } from './functions/mapSeries';
import { reduce } from './functions/reduce';
import { Resolvable } from './helpers/types';
import { timeout } from './functions/timeout';

export class Navybird<T> extends Promise<T> {
  static isPromise: typeof isPromise = isPromise
  static isPromiseLike: typeof isPromiseLike = isPromiseLike

  static defer: NavybirdDeferFunction = defer as any
  static delay: NavybirdDelayFunction = delay as any
  static each: NavybirdEachSeriesFunction = eachSeries as any
  static eachSeries: NavybirdEachSeriesFunction = eachSeries as any
  static immediate: NavybirdImmediateFunction = immediate as any
  static fromCallback: NavybirdFromCallbackFunction = fromCallback as any
  static fromNode: NavybirdFromCallbackFunction = fromCallback as any
  static map: NavybirdMapFunction = map as any
  static mapSeries: NavybirdMapSeriesFunction = mapSeries as any
  static reduce: NavybirdReduceFunction = reduce as any

  timeout!: NavybirdInstanceTimeoutFunction

  // #region Original Methods

  /**
   * Creates a Promise that is resolved with an array of results when all of the provided Promises
   * resolve, or rejected when any Promise is rejected.
   * @param values An array of Promises.
   * @returns A new Promise.
   */
  static all: {
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Navybird<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
    <T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Navybird<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
    <T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Navybird<[T1, T2, T3, T4, T5, T6, T7, T8]>;
    <T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Navybird<[T1, T2, T3, T4, T5, T6, T7]>;
    <T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Navybird<[T1, T2, T3, T4, T5, T6]>;
    <T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Navybird<[T1, T2, T3, T4, T5]>;
    <T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Navybird<[T1, T2, T3, T4]>;
    <T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Navybird<[T1, T2, T3]>;
    <T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Navybird<[T1, T2]>;
    <T>(values: (T | PromiseLike<T>)[]): Navybird<T[]>;
  }

  /**
   * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
   * or rejected.
   * @param values An array of Promises.
   * @returns A new Promise.
   */
  static race: {
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Navybird<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
    <T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Navybird<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
    <T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Navybird<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
    <T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Navybird<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
    <T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Navybird<T1 | T2 | T3 | T4 | T5 | T6>;
    <T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Navybird<T1 | T2 | T3 | T4 | T5>;
    <T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Navybird<T1 | T2 | T3 | T4>;
    <T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Navybird<T1 | T2 | T3>;
    <T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Navybird<T1 | T2>;
    <T>(values: (T | PromiseLike<T>)[]): Navybird<T>;
  }

  /**
   * Creates a new rejected promise for the provided reason.
   * @param reason The reason the promise was rejected.
   * @returns A new rejected Promise.
   */
  static reject: {
    <T = never>(reason?: any): Navybird<T>
  };

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

  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch!: {
    <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Navybird<T | TResult>
  };

  // #endregion
}

export class NavybirdDefer<T> extends Defer<T> {
  public readonly promise!: Navybird<T>
}

// #region Generated Types

/**
 * @$TypeExpand typeof defer
 * @$$Eval (str) => str.replace(/Defer</g, "NavybirdDefer<")
 */
type NavybirdDeferFunction = <T = any>() => NavybirdDefer<T>

/**
 * @$TypeExpand typeof delay
 * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
 */
type NavybirdDelayFunction = { <R>(ms: number, value: Resolvable<R>): Navybird<R>; (ms: number): Navybird<void>; }

/**
 * @$TypeExpand typeof eachSeries
 * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
 */
type NavybirdEachSeriesFunction = <R, U>(iterable: Resolvable<Iterable<Resolvable<R>>>, iterator: (item: R, index: number, arrayLength: number) => Resolvable<U>) => Navybird<R[]>

/**
 * @$TypeExpand typeof immediate
 * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
 */
type NavybirdImmediateFunction = { <R>(value: Resolvable<R>): Navybird<R>; (): Navybird<void>; }

/**
 * @$TypeExpand typeof fromCallback
 * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
 */
type NavybirdFromCallbackFunction = { (resolver: (callback: (err: any, result?: any) => void) => void, options?: FromCallbackOptions): Navybird<any>; <T>(resolver: (callback: (err: any, result?: T) => void) => void, options?: FromCallbackOptions): Navybird<T>; }

/**
 * @$TypeExpand typeof map
 * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
 */
type NavybirdMapFunction = <R, U>(iterable: Resolvable<Iterable<Resolvable<R>>>, mapper: (item: R, index: number, arrayLength: number) => Resolvable<U>, opts?: ConcurrencyOption) => Navybird<U[]>

/**
 * @$TypeExpand typeof mapSeries
 * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
 */
type NavybirdMapSeriesFunction = <R, U>(iterable: Resolvable<Iterable<Resolvable<R>>>, iterator: (item: R, index: number, arrayLength: number) => Resolvable<U>) => Navybird<U[]>

/**
 * @$TypeExpand typeof reduce
 * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
 */
type NavybirdReduceFunction = { <R, U>(iterable: Resolvable<Iterable<Resolvable<R>>>, reducer: (memo: U, current: R, index: number, arrayLength: number) => Resolvable<U>, initialValue?: U): Navybird<U>; <R>(iterable: Resolvable<Iterable<Resolvable<R>>>, reducer: (memo: R, current: R, index: number, arrayLength: number) => Resolvable<R>): Navybird<R>; }

/**
 * @$TypeExpand typeof timeout
 * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird").replace(/promise:/g, "this:")
 */
type NavybirdInstanceTimeoutFunction = { <T>(this: PromiseLike<T> | (PromiseLike<T> & { cancel(): any; }), ms: number, fallback?: string | Error): Navybird<T>; <T, R>(this: PromiseLike<T> | (PromiseLike<T> & { cancel(): any; }), ms: number, fallback: () => Resolvable<R>): Navybird<R>; }

// #endregion

Navybird.prototype.timeout = function () {
  return timeout.call(this.promise.constructor, this, ...arguments);
} as any
