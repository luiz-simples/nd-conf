"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ndcExecute = function ndcExecute(context) {
  var _this = this;

  var pointers = context.exec.map(function (actionName) {
    return _this[actionName].run;
  });

  var runActions = Promise.resolve();

  pointers.forEach(function (action) {
    runActions = runActions.then(function (res) {
      return action(res || {}, context);
    });
  });

  return runActions.then(function (res) {
    return res || {};
  });
};

exports.default = ndcExecute;