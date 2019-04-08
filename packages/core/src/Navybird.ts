import { Defer, defer } from './functions/defer';
import { delay } from './functions/delay';
import { fromCallback, FromCallbackOptions } from './functions/fromCallback';
import { immediate } from './functions/immediate';
import { isPromise } from './functions/isPromise';
import { isPromiseLike } from './functions/isPromiseLike';
import { ConcurrencyOption, map } from './functions/map';
import { mapSeries } from './functions/mapSeries';
import { reduce } from './functions/reduce';
import { Resolvable } from './helpers/types';
import { eachSeries } from './functions/eachSeries';

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
}

export class NavybirdDefer<T> extends Defer<T> {
  public readonly promise!: Navybird<T>
}

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
