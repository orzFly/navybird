"use strict";

module.exports = function eachSeriesFactory(Navybird) {
  return function(iterable, iterator) {
    const ret = [];

    return Navybird.reduce(
      iterable,
      function eachSeriesReducer(a, b, i, length) {
        return Navybird.resolve(iterator(b, i, length)).then(
          function eachSeriesIteratorCallback(val) {
            ret.push(b);
          }
        );
      },
      {}
    ).thenReturn(ret);
  };
};
