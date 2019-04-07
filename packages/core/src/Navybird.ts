import { map, ConcurrencyOption } from './functions/map';

/**
 * @$TypeExpand typeof map
 * @$$Eval (str) => str.replace(/=> PromiseLike<U\[\]>/, "=> Navybird<U[]>")
 */
type NavybirdMap = <R, U>(iterable: Iterable<R | PromiseLike<R>> | PromiseLike<Iterable<R | PromiseLike<R>>>, mapper: (item: R, index: number) => U | PromiseLike<U>, opts: ConcurrencyOption) => Navybird<U[]>

export class Navybird<T> extends Promise<T> {
  static map: NavybirdMap = map as any
} 
