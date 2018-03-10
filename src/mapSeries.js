"use strict";

module.exports = function mapSeriesFactory(Navybird) {
  return function(iterable, mapper) {
    const ret = [];

    return Navybird.reduce(
      iterable,
      function mapSeriesReducer(a, b, i, length) {
        return Navybird.resolve(mapper(b, i, length)).then(
          function mapSeriesMapperCallback(val) {
            ret.push(val);
          }
        );
      },
      {}
    ).thenReturn(ret);
  };
};
