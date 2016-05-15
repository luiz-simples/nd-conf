'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ndcLoad = require('./ndcLoad');

var _ndcLoad2 = _interopRequireDefault(_ndcLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ndcApp = function ndcApp(server) {
  return (0, _ndcLoad2.default)(server.path).then(function (loaded) {
    var configs = loaded.configs;
    var serverLoaded = Object.assign(loaded, server);
    Object.keys(configs).map(function (key) {
      return configs[key].run;
    }).forEach(function (conf) {
      return conf(serverLoaded);
    });
    return serverLoaded;
  });
};

exports.default = ndcApp;