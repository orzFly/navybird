import { Defer, defer } from './functions/defer';
import { delay } from './functions/delay';
import { fromCallback, FromCallbackOptions } from './functions/fromCallback';
import { isPromise } from './functions/isPromise';
import { isPromiseLike } from './functions/isPromiseLike';
import { ConcurrencyOption, map } from './functions/map';

export class Navybird<T> extends Promise<T> {
  static isPromise: typeof isPromise = isPromise
  static isPromiseLike: typeof isPromiseLike = isPromiseLike

  static defer: NavybirdDeferFunction = defer as any
  static delay: NavybirdDelayFunction = delay as any
  static fromCallback: NavybirdFromCallbackFunction = fromCallback as any
  static map: NavybirdMapFunction = map as any
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
type NavybirdDelayFunction = { <R>(ms: number, value: R | PromiseLike<R>): Navybird<R>; (ms: number): Navybird<void>; }

/**
 * @$TypeExpand typeof fromCallback
 * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
 */
type NavybirdFromCallbackFunction = { (resolver: (callback: (err: any, result?: any) => void) => void, options?: FromCallbackOptions): Navybird<any>; <T>(resolver: (callback: (err: any, result?: T) => void) => void, options?: FromCallbackOptions): Navybird<T>; }

/**
 * @$TypeExpand typeof map
 * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
 */
type NavybirdMapFunction = <R, U>(iterable: Iterable<R | PromiseLike<R>> | PromiseLike<Iterable<R | PromiseLike<R>>>, mapper: (item: R, index: number) => U | PromiseLike<U>, opts: ConcurrencyOption) => Navybird<U[]>
