'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ndcRoutes = require('./ndcRoutes');

var _ndcRoutes2 = _interopRequireDefault(_ndcRoutes);

var _ndcActions = require('./ndcActions');

var _ndcActions2 = _interopRequireDefault(_ndcActions);

var _ndcConfigs = require('./ndcConfigs');

var _ndcConfigs2 = _interopRequireDefault(_ndcConfigs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ndcLoad = function ndcLoad(path) {
  return (0, _ndcRoutes2.default)(path).then(function (routes) {
    return (0, _ndcActions2.default)(path).then(function (actions) {
      return (0, _ndcConfigs2.default)(path).then(function (configs) {
        return { routes: routes, actions: actions, configs: configs };
      });
    });
  });
};

exports.default = ndcLoad;