import { map, ConcurrencyOption } from './functions/map';

/**
 * @$TypeExpand typeof map
 */
type NavybirdMap = <R, U>(iterable: Iterable<R | PromiseLike<R>> | PromiseLike<Iterable<R | PromiseLike<R>>>, mapper: (item: R, index: number) => U | PromiseLike<U>, opts: ConcurrencyOption) => PromiseLike<U[]>

export class Navybird<T> extends Promise<T> {
  static map: NavybirdMap = map as any
} 
