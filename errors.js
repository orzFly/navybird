const utils = require("./utils");
const constants = require("./constants");

function OperationalError(message) {
  if (!(this instanceof OperationalError)) {
    return new OperationalError(message);
  }

  utils.notEnumerableProp(this, "name", "OperationalError");
  utils.notEnumerableProp(this, "message", message);
  this.cause = message;
  this[constants.OPERATIONAL_ERROR_KEY] = true;

  if (message instanceof Error) {
    utils.notEnumerableProp(this, "message", message.message);
    utils.notEnumerableProp(this, "stack", message.stack);
  } else if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  }
}
utils.inherits(OperationalError, Error);

module.exports.errors = {
  TypeError: TypeError,
  OperationalError: OperationalError,
};

const regexErrorKey = /^(?:name|message|stack|cause)$/;

const wrapAsOperationalError = (module.exports.wrapAsOperationalError = function(obj) {
  var ret;
  if (utils.isUntypedError(obj)) {
    ret = new OperationalError(obj);
    ret.name = obj.name;
    ret.message = obj.message;
    ret.stack = obj.stack;
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];
      if (!regexErrorKey.test(key)) {
        ret[key] = obj[key];
      }
    }
    return ret;
  }
  utils.markAsOriginatingFromRejection(obj);
  return obj;
});
