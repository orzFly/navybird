export interface GenericPromise<T> extends Promise<T> { }

export function getPromiseConstructor(self: any): PromiseConstructor {
  if (self && typeof self === 'function' && self.resolve && self.prototype && self.prototype.then) {
    return self;
  }

  return Promise;
}
