import { GenericPromise, getPromiseConstructor } from '../helpers/getPromiseConstructor';
import { Resolvable } from '../helpers/resolvable';

export class Defer<T> {
  constructor(Promise?: PromiseConstructor) {
    let _resolve: this['resolve']
    let _reject: this['reject']

    this.promise = new Promise(function deferCapturePromiseExecutor(resolve, reject) {
      _resolve = resolve;
      _reject = reject;
    });

    this.resolve = _resolve;
    this.reject = _reject;
  }

  public readonly promise!: GenericPromise<T>
  public readonly resolve!: (value?: Resolvable<T>) => void
  public readonly reject!: (reason?: any) => void

  get fulfill() {
    return this.resolve;
  }
}

export function defer<T = any>(): Defer<T> {
  const Promise = getPromiseConstructor(this);
  return new Defer<T>(Promise);
};