const pCatchIf = require("p-catch-if");

const catchFn = function(args) {
  if (args.length > 2) {
    return pCatchIf(args.slice(0, args.length - 1), args[args.length - 1]);
  } else if (args.length == 2) {
    return pCatchIf(args[0], args[1]);
  }
  return args[0];
};

module.exports = catchFn;
