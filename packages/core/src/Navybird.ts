import { map, ConcurrencyOption } from './functions/map';
import { delay } from './functions/delay';
import { isPromise } from './functions/isPromise';
import { isPromiseLike } from './functions/isPromiseLike';

export class Navybird<T> extends Promise<T> {
  static isPromise: typeof isPromise = isPromise
  static isPromiseLike: typeof isPromiseLike = isPromiseLike

  static map: NavybirdMap = map as any
  static delay: NavybirdDelay = delay as any
}

/**
 * @$TypeExpand typeof map
 * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
 */
type NavybirdMap = <R, U>(iterable: Iterable<R | PromiseLike<R>> | PromiseLike<Iterable<R | PromiseLike<R>>>, mapper: (item: R, index: number) => U | PromiseLike<U>, opts: ConcurrencyOption) => Navybird<U[]>

/**
 * @$TypeExpand typeof delay
 * @$$Eval (str) => str.replace(/GenericPromise/g, "Navybird")
 */
type NavybirdDelay = { <R>(ms: number, value: R | PromiseLike<R>): Navybird<R>; (ms: number): Navybird<void>; }
