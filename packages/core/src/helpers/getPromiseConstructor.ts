export function getPromiseConstructor(self: any): PromiseConstructor {
  if (typeof self === 'function' && self.resolve && self.prototype && self.prototype.then) {
    return self;
  }

  return Promise;
}
