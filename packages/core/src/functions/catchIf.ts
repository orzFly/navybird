// https://github.com/sindresorhus/p-catch-if
// MIT © Sindre Sorhus

interface ErrorConstructor {
  new(message?: string): Error;
}

type Predicate =
  | ErrorConstructor
  | ReadonlyArray<ErrorConstructor>
  | boolean
  | ((error: Error) => boolean | PromiseLike<boolean>);

/**
  Conditional promise catch handler.

  @param predicate - Specify either an `Error` constructor, array of `Error` constructors, `boolean`, or function that returns a promise for a `boolean` or a `boolean`. If the function returns a promise, it's awaited.
  @param catchHandler - Called if `predicate` passes. This is what you would normally pass to `.catch()`.
  @returns A [thunk](https://en.wikipedia.org/wiki/Thunk) that returns a `Promise`.

  @example
  ```
  import pCatchIf = require('p-catch-if');

  // Error constructor
  getData().catch(pCatchIf(TimeoutError, () => retry(getData)));

  // Multiple error constructors
  getData().catch(pCatchIf([NetworkError, TimeoutError], () => retry(getData)));

  // Boolean
  getData().catch(pCatchIf(isProduction, error => recordError(error)));

  // Function
  const hasUnicornMessage = error => error.message.includes('unicorn');
  getData().catch(pCatchIf(hasUnicornMessage, console.error));

  // Promise-returning function
  const handler = error => sendError(error).then(checkResults);
  getData().catch(pCatchIf(handler, console.error));

  // Can also be nested
  const validateMessage = error => error.message === 'Too many rainbows';
  getData().catch(pCatchIf(UnicornError, pCatchIf(validateMessage, console.error)));
  ```
*/

function isErrorConstructor(constructor: unknown): constructor is ErrorConstructor {
  return constructor === Error || (constructor && (<any>constructor).prototype instanceof Error);
}

export function catchIf<T>(predicate: Predicate, catchHandler: (error: Error) => T | Promise<T>): (
  error: Error
) => T | Promise<T> {
  return function catchIfHandler (error) {
    if (typeof catchHandler !== 'function') {
      throw new TypeError('Expected a catch handler');
    }

    if (predicate === true) {
      return catchHandler(error);
    }

    if (Array.isArray(predicate) || isErrorConstructor(predicate)) {
      if (([] as ErrorConstructor[])
        .concat(predicate)
        .some((errorConstructor) => error instanceof errorConstructor)) {
        return catchHandler(error);
      }
    } else if (typeof predicate === 'function') {
      return (async function catchIfPredicateEvaluator() {
        const value = await (predicate as any)(error);
        if (value === true) {
          return catchHandler(error);
        }

        throw error;
      })();
    }

    throw error;
  }
}
