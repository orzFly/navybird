const pCatchIf = require("p-catch-if");

const noop = function(a) {
  return a;
};

const catchFn = function(args, handler) {
  if (!handler) handler = noop;

  if (args.length > 2) {
    return pCatchIf(args.slice(0, args.length - 1), handler(args[args.length - 1]));
  } else if (args.length == 2) {
    return pCatchIf(args[0], handler(args[1]));
  }
  return handler(args[0]);
};

module.exports = catchFn;
