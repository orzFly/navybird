const constants = require("./constants");

let Navybird = undefined;

module.exports.setNavybird = function(n) {
  Navybird = n;
};

const apiRejection = (module.exports.apiRejection = function(msg) {
  return Navybird.reject(new Navybird.TypeError(msg));
});

const resolveWrapper = (module.exports.resolveWrapper = function(fn) {
  return function() {
    return Navybird.resolve(fn.apply(this, arguments));
  };
});

const isUntypedError = (module.exports.isUntypedError = function(obj) {
  return obj instanceof Error && Object.getPrototypeOf(obj) === Error.prototype;
});

const classString = (module.exports.classString = function(obj) {
  return {}.toString.call(obj);
});

const inherits = (module.exports.inherits = function(Child, Parent) {
  var hasProp = {}.hasOwnProperty;

  function T() {
    this.constructor = Child;
    this.constructor$ = Parent;
    for (var propertyName in Parent.prototype) {
      if (
        hasProp.call(Parent.prototype, propertyName) &&
        propertyName.charAt(propertyName.length - 1) !== "$"
      ) {
        this[propertyName + "$"] = Parent.prototype[propertyName];
      }
    }
  }
  T.prototype = Parent.prototype;
  Child.prototype = new T();
  return Child.prototype;
});

const isPrimitive = (module.exports.isPrimitive = function(val) {
  return (
    val == null ||
    val === true ||
    val === false ||
    typeof val === "string" ||
    typeof val === "number"
  );
});

const notEnumerableProp = (module.exports.notEnumerableProp = function(
  obj,
  name,
  value
) {
  if (isPrimitive(obj)) return obj;
  var descriptor = {
    value: value,
    configurable: true,
    enumerable: false,
    writable: true,
  };
  Object.defineProperty(obj, name, descriptor);
  return obj;
});

const markAsOriginatingFromRejection = (module.exports.markAsOriginatingFromRejection = function(
  e
) {
  try {
    notEnumerableProp(e, constants.OPERATIONAL_ERROR_KEY, true);
  } catch (ignore) {}
});

const originatesFromRejection = (module.exports.originatesFromRejection = function(
  e
) {
  if (e == null) return false;
  return (
    e instanceof Error[constants.BLUEBIRD_ERRORS].OperationalError ||
    e[constants.OPERATIONAL_ERROR_KEY] === true
  );
});
