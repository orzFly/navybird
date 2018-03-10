/* Type definitions for Navybird.
 * The code following this comment originates from:
 *   https://github.com/DefinitelyTyped/DefinitelyTyped/blob/c531c6fa14b3f71051cfb6e099cd0e9b90fcd754/types/bluebird/index.d.ts
 */

// Type definitions for bluebird 3.5
// Project: https://github.com/petkaantonov/bluebird
// Definitions by: Leonard Hecker <https://github.com/lhecker>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3
/*!
 * The code following this comment originates from:
 *   https://github.com/types/npm-bluebird
 *
 * Note for browser users: use bluebird-global typings instead of this one
 * if you want to use Bluebird via the global Promise symbol.
 *
 * Licensed under:
 *   The MIT License (MIT)
 *
 *   Copyright (c) 2016 unional
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *   THE SOFTWARE.
 */

type CatchFilter<E> =
  | (new (...args: any[]) => E)
  | ((error: E) => boolean)
  | (object & E);

declare class Navybird<R> implements PromiseLike<R> {
  /**
   * Create a new promise. The passed in function will receive functions `resolve` and `reject` as its arguments which can be called to seal the fate of the created promise.
   * If promise cancellation is enabled, passed in function will receive one more function argument `onCancel` that allows to register an optional cancellation callback.
   */
  constructor(
    callback: (
      resolve: (thenableOrResult?: R | PromiseLike<R>) => void,
      reject: (error?: any) => void,
      onCancel?: (callback: () => void) => void
    ) => void
  );

  /**
   * Promises/A+ `.then()`. Returns a new promise chained from this promise.
   *
   * The new promise will be rejected or resolved depending on the passed `fulfilledHandler`, `rejectedHandler` and the state of this promise.
   */
  // Based on PromiseLike.then, but returns a Navybird instance.
  then<U>(
    onFulfill?: (value: R) => U | PromiseLike<U>,
    onReject?: (error: any) => U | PromiseLike<U>
  ): Navybird<U>; // For simpler signature help.
  then<TResult1 = R, TResult2 = never>(
    onfulfilled?: ((value: R) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Navybird<TResult1 | TResult2>;

  /**
   * This is a catch-all exception handler, shortcut for calling `.then(null, handler)` on this promise.
   *
   * Any exception happening in a `.then`-chain will propagate to nearest `.catch` handler.
   *
   * Alias `.caught();` for compatibility with earlier ECMAScript version.
   */
  catch(onReject: (error: any) => R | PromiseLike<R>): Navybird<R>;
  catch<U>(
    onReject: ((error: any) => U | PromiseLike<U>) | undefined | null
  ): Navybird<U | R>;

  /**
   * This extends `.catch` to work more like catch-clauses in languages like Java or C#.
   *
   * Instead of manually checking `instanceof` or `.name === "SomeError"`,
   * you may specify a number of error constructors which are eligible for this catch handler.
   * The catch handler that is first met that has eligible constructors specified, is the one that will be called.
   *
   * This method also supports predicate-based filters.
   * If you pass a predicate function instead of an error constructor, the predicate will receive the error as an argument.
   * The return result of the predicate will be used determine whether the error handler should be called.
   *
   * Alias `.caught();` for compatibility with earlier ECMAScript version.
   */
  catch<E1, E2, E3, E4, E5>(
    filter1: CatchFilter<E1>,
    filter2: CatchFilter<E2>,
    filter3: CatchFilter<E3>,
    filter4: CatchFilter<E4>,
    filter5: CatchFilter<E5>,
    onReject: (error: E1 | E2 | E3 | E4 | E5) => R | PromiseLike<R>
  ): Navybird<R>;
  catch<U, E1, E2, E3, E4, E5>(
    filter1: CatchFilter<E1>,
    filter2: CatchFilter<E2>,
    filter3: CatchFilter<E3>,
    filter4: CatchFilter<E4>,
    filter5: CatchFilter<E5>,
    onReject: (error: E1 | E2 | E3 | E4 | E5) => U | PromiseLike<U>
  ): Navybird<U | R>;

  catch<E1, E2, E3, E4>(
    filter1: CatchFilter<E1>,
    filter2: CatchFilter<E2>,
    filter3: CatchFilter<E3>,
    filter4: CatchFilter<E4>,
    onReject: (error: E1 | E2 | E3 | E4) => R | PromiseLike<R>
  ): Navybird<R>;

  catch<U, E1, E2, E3, E4>(
    filter1: CatchFilter<E1>,
    filter2: CatchFilter<E2>,
    filter3: CatchFilter<E3>,
    filter4: CatchFilter<E4>,
    onReject: (error: E1 | E2 | E3 | E4) => U | PromiseLike<U>
  ): Navybird<U | R>;

  catch<E1, E2, E3>(
    filter1: CatchFilter<E1>,
    filter2: CatchFilter<E2>,
    filter3: CatchFilter<E3>,
    onReject: (error: E1 | E2 | E3) => R | PromiseLike<R>
  ): Navybird<R>;
  catch<U, E1, E2, E3>(
    filter1: CatchFilter<E1>,
    filter2: CatchFilter<E2>,
    filter3: CatchFilter<E3>,
    onReject: (error: E1 | E2 | E3) => U | PromiseLike<U>
  ): Navybird<U | R>;

  catch<E1, E2>(
    filter1: CatchFilter<E1>,
    filter2: CatchFilter<E2>,
    onReject: (error: E1 | E2) => R | PromiseLike<R>
  ): Navybird<R>;
  catch<U, E1, E2>(
    filter1: CatchFilter<E1>,
    filter2: CatchFilter<E2>,
    onReject: (error: E1 | E2) => U | PromiseLike<U>
  ): Navybird<U | R>;

  catch<E1>(
    filter1: CatchFilter<E1>,
    onReject: (error: E1) => R | PromiseLike<R>
  ): Navybird<R>;
  catch<U, E1>(
    filter1: CatchFilter<E1>,
    onReject: (error: E1) => U | PromiseLike<U>
  ): Navybird<U | R>;

  /**
   * This is a catch-all exception handler, shortcut for calling `.then(null, handler)` on this promise.
   *
   * Any exception happening in a `.then`-chain will propagate to nearest `.catch` handler.
   *
   * Alias `.caught();` for compatibility with earlier ECMAScript version.
   */
  caught: Navybird<R>["catch"];

  /**
   * Like `.catch` but instead of catching all types of exceptions, it only catches those that don't originate from thrown errors but rather from explicit rejections.
   */
  error<U>(onReject: (reason: any) => U | PromiseLike<U>): Navybird<U>;

  /**
   * Pass a handler that will be called regardless of this promise's fate. Returns a new promise chained from this promise.
   *
   * There are special semantics for `.finally()` in that the final value cannot be modified from the handler.
   *
   * Alias `.lastly();` for compatibility with earlier ECMAScript version.
   */
  finally<U>(handler: () => U | PromiseLike<U>): Navybird<R>;

  lastly<U>(handler: () => U | PromiseLike<U>): Navybird<R>;

  /**
   * Like `.finally()`, but not called for rejections.
   */
  tap<U>(onFulFill: (value: R) => PromiseLike<U> | U): Navybird<R>;

  /**
   * Like `.catch()` but rethrows the error
   */
  tapCatch<U>(onReject: (error?: any) => U | PromiseLike<U>): Navybird<R>;

  tapCatch<U, E1, E2, E3, E4, E5>(
    filter1: CatchFilter<E1>,
    filter2: CatchFilter<E2>,
    filter3: CatchFilter<E3>,
    filter4: CatchFilter<E4>,
    filter5: CatchFilter<E5>,
    onReject: (error: E1 | E2 | E3 | E4 | E5) => U | PromiseLike<U>
  ): Navybird<R>;
  tapCatch<U, E1, E2, E3, E4>(
    filter1: CatchFilter<E1>,
    filter2: CatchFilter<E2>,
    filter3: CatchFilter<E3>,
    filter4: CatchFilter<E4>,
    onReject: (error: E1 | E2 | E3 | E4) => U | PromiseLike<U>
  ): Navybird<R>;
  tapCatch<U, E1, E2, E3>(
    filter1: CatchFilter<E1>,
    filter2: CatchFilter<E2>,
    filter3: CatchFilter<E3>,
    onReject: (error: E1 | E2 | E3) => U | PromiseLike<U>
  ): Navybird<R>;
  tapCatch<U, E1, E2>(
    filter1: CatchFilter<E1>,
    filter2: CatchFilter<E2>,
    onReject: (error: E1 | E2) => U | PromiseLike<U>
  ): Navybird<R>;
  tapCatch<U, E1>(
    filter1: CatchFilter<E1>,
    onReject: (error: E1) => U | PromiseLike<U>
  ): Navybird<R>;

  /**
   * Same as calling `Promise.delay(ms, this)`.
   */
  delay(ms: number): Navybird<R>;

  /**
   * Returns a promise that will be fulfilled with this promise's fulfillment value or rejection reason.
   *  However, if this promise is not fulfilled or rejected within ms milliseconds, the returned promise
   *  is rejected with a TimeoutError or the error as the reason.
   *
   * You may specify a custom error message with the `message` parameter.
   */
  timeout(ms: number, message?: string | Error): Navybird<R>;

  /**
   * Register a node-style callback on this promise.
   *
   * When this promise is is either fulfilled or rejected,
   * the node callback will be called back with the node.js convention where error reason is the first argument and success value is the second argument.
   * The error argument will be `null` in case of success.
   * If the `callback` argument is not a function, this method does not do anything.
   */
  nodeify(callback: (err: any, value?: R) => void, options?: Navybird.SpreadOption): this;
  nodeify(...sink: any[]): this;
  asCallback(
    callback: (err: any, value?: R) => void,
    options?: Navybird.SpreadOption
  ): this;
  asCallback(...sink: any[]): this;

  /**
   * Synchronously inspect the state of this `promise`. The `PromiseInspection` will represent the state of
   * the promise as snapshotted at the time of calling `.reflect()`.
   */
  reflect(): Navybird<Navybird.Inspection<R>>;
  reflect(): Navybird<Navybird.Inspection<any>>;

  /**
   * Convenience method for:
   *
   * <code>
   * .then(function() {
   *    return value;
   * });
   * </code>
   *
   * in the case where `value` doesn't change its value. That means `value` is bound at the time of calling `.return()`
   *
   * Alias `.thenReturn();` for compatibility with earlier ECMAScript version.
   */
  return(): Navybird<void>;
  return<U>(value: U): Navybird<U>;
  thenReturn(): Navybird<void>;
  thenReturn<U>(value: U): Navybird<U>;

  /**
   * Like calling `.then`, but the fulfillment value or rejection reason is assumed to be an array, which is flattened to the formal parameters of the handlers.
   */
  spread<U, W>(fulfilledHandler: (...values: W[]) => U | PromiseLike<U>): Navybird<U>;
  spread<U>(fulfilledHandler: (...args: any[]) => U | PromiseLike<U>): Navybird<U>;

  /**
   * Same as calling `Promise.all(thisPromise)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  // TODO type inference from array-resolving promise?
  all<U>(): Navybird<U[]>;

  /**
   * Same as calling `Navybird.map(thisPromise, mapper)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  // TODO type inference from array-resolving promise?
  map<Q, U>(
    mapper: (item: Q, index: number, arrayLength: number) => U | PromiseLike<U>,
    options?: Navybird.ConcurrencyOption
  ): Navybird<U[]>;

  /**
   * Same as calling `Promise.reduce(thisPromise, Function reducer, initialValue)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  // TODO type inference from array-resolving promise?
  reduce<Q, U>(
    reducer: (memo: U, item: Q, index: number, arrayLength: number) => U | PromiseLike<U>,
    initialValue?: U
  ): Navybird<U>;

  /**
   * Same as calling ``Navybird.each(thisPromise, iterator)``. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  each<R, U>(
    iterator: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>
  ): Navybird<R[]>;

  /**
   * Same as calling ``Navybird.eachSeries(thisPromise, iterator)``. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  eachSeries<R, U>(
    iterator: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>
  ): Navybird<R[]>;

  /**
   * Same as calling ``Navybird.mapSeries(thisPromise, iterator)``. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
   */
  mapSeries<R, U>(
    iterator: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>
  ): Navybird<U[]>;

  /**
   * Create a promise that is resolved with the given `value`. If `value` is a thenable or promise, the returned promise will assume its state.
   */
  static resolve(): Navybird<void>;
  static resolve<R>(value: R | PromiseLike<R>): Navybird<R>;

  /**
   * Create a promise that is resolved with the given `value`. If `value` is a thenable or promise, the returned promise will assume its state.
   */
  static cast(): Navybird<void>;
  static cast<R>(value: R | PromiseLike<R>): Navybird<R>;

  /**
   * Create a promise that is resolved with the given `value`. If `value` is a thenable or promise, the returned promise will assume its state.
   */
  static fulfilled(): Navybird<void>;
  static fulfilled<R>(value: R | PromiseLike<R>): Navybird<R>;

  /**
   * Create a promise that is rejected with the given `reason`.
   */
  static reject(reason: any): Navybird<never>;

  /**
   * Create a promise that is rejected with the given `reason`.
   */
  static rejected(reason: any): Navybird<never>;

  /**
   * Create a promise with undecided fate and return a `PromiseResolver` to control it. See resolution?: Promise(#promise-resolution).
   */
  static defer<R>(): Navybird.Resolver<R>;

  /**
   * Create a promise with undecided fate and return a `PromiseResolver` to control it. See resolution?: Promise(#promise-resolution).
   */
  static pending<R>(): Navybird.Resolver<R>;

  /**
   * (Navybird-only) Create an inspectable promise.
   */
  static inspectable<R>(promise: PromiseLike<R>): InspectableNavybird<R>;

  /**
   * Returns a promise that will be resolved with value (or undefined) after given ms milliseconds.
   * If value is a promise, the delay will start counting down when it is fulfilled and the returned
   *  promise will be fulfilled with the fulfillment value of the value promise.
   */
  static delay<R>(ms: number, value: R | PromiseLike<R>): Navybird<R>;
  static delay(ms: number): Navybird<void>;

  /**
   * Returns a promise that is resolved by a node style callback function.
   */
  static fromNode(
    resolver: (callback: (err: any, result?: any) => void) => void,
    options?: Navybird.FromNodeOptions
  ): Navybird<any>;
  static fromNode<T>(
    resolver: (callback: (err: any, result?: T) => void) => void,
    options?: Navybird.FromNodeOptions
  ): Navybird<T>;
  static fromCallback(
    resolver: (callback: (err: any, result?: any) => void) => void,
    options?: Navybird.FromNodeOptions
  ): Navybird<any>;
  static fromCallback<T>(
    resolver: (callback: (err: any, result?: T) => void) => void,
    options?: Navybird.FromNodeOptions
  ): Navybird<T>;

  /**
   * Given an array, or a promise of an array, which contains promises (or a mix of promises and values) return a promise that is fulfilled when all the items in the array are fulfilled.
   * The promise's fulfillment value is an array with fulfillment values at respective positions to the original array.
   * If any promise in the array rejects, the returned promise is rejected with the rejection reason.
   */
  // TODO enable more overloads
  // array with promises of different types
  static all<T1, T2, T3, T4, T5>(
    values: [
      PromiseLike<T1> | T1,
      PromiseLike<T2> | T2,
      PromiseLike<T3> | T3,
      PromiseLike<T4> | T4,
      PromiseLike<T5> | T5
    ]
  ): Navybird<[T1, T2, T3, T4, T5]>;
  static all<T1, T2, T3, T4>(
    values: [
      PromiseLike<T1> | T1,
      PromiseLike<T2> | T2,
      PromiseLike<T3> | T3,
      PromiseLike<T4> | T4
    ]
  ): Navybird<[T1, T2, T3, T4]>;
  static all<T1, T2, T3>(
    values: [PromiseLike<T1> | T1, PromiseLike<T2> | T2, PromiseLike<T3> | T3]
  ): Navybird<[T1, T2, T3]>;
  static all<T1, T2>(
    values: [PromiseLike<T1> | T1, PromiseLike<T2> | T2]
  ): Navybird<[T1, T2]>;
  static all<T1>(values: [PromiseLike<T1> | T1]): Navybird<[T1]>;
  // array with values
  static all<R>(
    values: PromiseLike<Iterable<PromiseLike<R> | R>> | Iterable<PromiseLike<R> | R>
  ): Navybird<R[]>;

  /**
   * Promise.join(
   *   Promise<any>|any values...,
   *   function handler
   * ) -> Promise
   * For coordinating multiple concurrent discrete promises.
   *
   * Note: In 1.x and 0.x Promise.join used to be a Promise.all that took the values in as arguments instead in an array.
   * This behavior has been deprecated but is still supported partially - when the last argument is an immediate function value the new semantics will apply
   */
  static join<R, A1>(
    arg1: A1 | PromiseLike<A1>,
    handler: (arg1: A1) => R | PromiseLike<R>
  ): Navybird<R>;
  static join<R, A1, A2>(
    arg1: A1 | PromiseLike<A1>,
    arg2: A2 | PromiseLike<A2>,
    handler: (arg1: A1, arg2: A2) => R | PromiseLike<R>
  ): Navybird<R>;
  static join<R, A1, A2, A3>(
    arg1: A1 | PromiseLike<A1>,
    arg2: A2 | PromiseLike<A2>,
    arg3: A3 | PromiseLike<A3>,
    handler: (arg1: A1, arg2: A2, arg3: A3) => R | PromiseLike<R>
  ): Navybird<R>;
  static join<R, A1, A2, A3, A4>(
    arg1: A1 | PromiseLike<A1>,
    arg2: A2 | PromiseLike<A2>,
    arg3: A3 | PromiseLike<A3>,
    arg4: A4 | PromiseLike<A4>,
    handler: (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => R | PromiseLike<R>
  ): Navybird<R>;
  static join<R, A1, A2, A3, A4, A5>(
    arg1: A1 | PromiseLike<A1>,
    arg2: A2 | PromiseLike<A2>,
    arg3: A3 | PromiseLike<A3>,
    arg4: A4 | PromiseLike<A4>,
    arg5: A5 | PromiseLike<A5>,
    handler: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => R | PromiseLike<R>
  ): Navybird<R>;

  // variadic array
  /** @deprecated use .all instead */
  static join<R>(...values: Array<R | PromiseLike<R>>): Navybird<R[]>;

  /**
   * Map an array, or a promise of an array, which contains a promises (or a mix of promises and values) with the given `mapper` function with the signature `(item, index, arrayLength)` where `item` is the resolved value of a respective promise in the input array.
   * If any promise in the input array is rejected the returned promise is rejected as well.
   *
   * If the `mapper` function returns promises or thenables, the returned promise will wait for all the mapped results to be resolved as well.
   *
   * *The original array is not modified.*
   */
  static map<R, U>(
    values: PromiseLike<Iterable<PromiseLike<R> | R>> | Iterable<PromiseLike<R> | R>,
    mapper: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>,
    options?: Navybird.ConcurrencyOption
  ): Navybird<U[]>;

  /**
   * Reduce an array, or a promise of an array, which contains a promises (or a mix of promises and values) with the given `reducer` function with the signature `(total, current, index, arrayLength)` where `item` is the resolved value of a respective promise in the input array.
   * If any promise in the input array is rejected the returned promise is rejected as well.
   *
   * If the reducer function returns a promise or a thenable, the result for the promise is awaited for before continuing with next iteration.
   *
   * *The original array is not modified. If no `initialValue` is given and the array doesn't contain at least 2 items, the callback will not be called and `undefined` is returned.
   * If `initialValue` is given and the array doesn't have at least 1 item, `initialValue` is returned.*
   */
  static reduce<R, U>(
    values: PromiseLike<Iterable<PromiseLike<R> | R>> | Iterable<PromiseLike<R> | R>,
    reducer: (
      total: U,
      current: R,
      index: number,
      arrayLength: number
    ) => U | PromiseLike<U>,
    initialValue?: U
  ): Navybird<U>;

  /**
   * Iterate over an array, or a promise of an array, which contains promises (or a mix of promises and values) with the given iterator function with the signature (item, index, value) where item is the resolved value of a respective promise in the input array.
   * Iteration happens serially. If any promise in the input array is rejected the returned promise is rejected as well.
   *
   * Resolves to the original array unmodified, this method is meant to be used for side effects.
   * If the iterator function returns a promise or a thenable, the result for the promise is awaited for before continuing with next iteration.
   */
  static each<R, U>(
    values: PromiseLike<Iterable<PromiseLike<R> | R>> | Iterable<PromiseLike<R> | R>,
    iterator: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>
  ): Navybird<R[]>;

  /**
   * Iterate over an array, or a promise of an array, which contains promises (or a mix of promises and values) with the given iterator function with the signature (item, index, value) where item is the resolved value of a respective promise in the input array.
   * Iteration happens serially. If any promise in the input array is rejected the returned promise is rejected as well.
   *
   * Resolves to the original array unmodified, this method is meant to be used for side effects.
   * If the iterator function returns a promise or a thenable, the result for the promise is awaited for before continuing with next iteration.
   */
  static eachSeries<R, U>(
    values: PromiseLike<Iterable<PromiseLike<R> | R>> | Iterable<PromiseLike<R> | R>,
    iterator: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>
  ): Navybird<R[]>;

  /**
   * Given an Iterable(arrays are Iterable), or a promise of an Iterable, which produces promises (or a mix of promises and values), iterate over all the values in the Iterable into an array and iterate over the array serially, in-order.
   *
   * Returns a promise for an array that contains the values returned by the iterator function in their respective positions.
   * The iterator won't be called for an item until its previous item, and the promise returned by the iterator for that item are fulfilled.
   * This results in a mapSeries kind of utility but it can also be used simply as a side effect iterator similar to Array#forEach.
   *
   * If any promise in the input array is rejected or any promise returned by the iterator function is rejected, the result will be rejected as well.
   */
  static mapSeries<R, U>(
    values: PromiseLike<Iterable<PromiseLike<R> | R>> | Iterable<PromiseLike<R> | R>,
    iterator: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>
  ): Navybird<U[]>;
}

declare class InspectableNavybird<R> extends Navybird<R>
  implements Navybird.Inspection<R> {
  /**
   * See if the underlying promise was fulfilled at the creation time of this inspection object.
   */
  isFulfilled(): boolean;

  /**
   * See if the underlying promise was rejected at the creation time of this inspection object.
   */
  isRejected(): boolean;

  /**
   * See if the underlying promise was defer at the creation time of this inspection object.
   */
  isPending(): boolean;

  /**
   * Get the fulfillment value of the underlying promise. Throws if the promise wasn't fulfilled at the creation time of this inspection object.
   *
   * throws `TypeError`
   */
  value(): R;

  /**
   * Get the rejection reason for the underlying promise. Throws if the promise wasn't rejected at the creation time of this inspection object.
   *
   * throws `TypeError`
   */
  reason(): any;
}

declare namespace Navybird {
  interface ConcurrencyOption {
    concurrency: number;
  }
  interface FromNodeOptions {
    multiArgs?: boolean;
  }
  interface SpreadOption {
    spread: boolean;
  }

  /** @deprecated Use PromiseLike<T> directly. */
  type Thenable<T> = PromiseLike<T>;

  type ResolvableProps<T> = object & { [K in keyof T]: PromiseLike<T[K]> | T[K] };

  interface Resolver<R> {
    /**
     * Returns a reference to the controlled promise that can be passed to clients.
     */
    promise: Navybird<R>;

    /**
     * Resolve the underlying promise with `value` as the resolution value. If `value` is a thenable or a promise, the underlying promise will assume its state.
     */
    resolve(value: R): void;
    resolve(): void;

    /**
     * Resolve the underlying promise with `value` as the resolution value. If `value` is a thenable or a promise, the underlying promise will assume its state.
     */
    fulfill(value: R): void;
    fulfill(): void;

    /**
     * Reject the underlying promise with `reason` as the rejection reason.
     */
    reject(reason: any): void;
  }
  interface Inspection<R> {
    /**
     * See if the underlying promise was fulfilled at the creation time of this inspection object.
     */
    isFulfilled(): boolean;

    /**
     * See if the underlying promise was rejected at the creation time of this inspection object.
     */
    isRejected(): boolean;

    /**
     * See if the underlying promise was defer at the creation time of this inspection object.
     */
    isPending(): boolean;

    /**
     * Get the fulfillment value of the underlying promise. Throws if the promise wasn't fulfilled at the creation time of this inspection object.
     *
     * throws `TypeError`
     */
    value(): R;

    /**
     * Get the rejection reason for the underlying promise. Throws if the promise wasn't rejected at the creation time of this inspection object.
     *
     * throws `TypeError`
     */
    reason(): any;
  }
}

export = Navybird;
