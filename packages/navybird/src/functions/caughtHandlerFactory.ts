import { catchIf } from './catchIf';

const noop = function <T>(a: T) { return a; };
export function caughtHandlerFactory(args: any[], handler?: (a: any) => (a: any) => any) {
  if (!handler) handler = noop;

  if (args.length > 2) {
    return catchIf(args.slice(0, args.length - 1), handler(args[args.length - 1]));
  } else if (args.length == 2) {
    return catchIf(args[0], handler(args[1]));
  }
  return handler(args[0]);
}