'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadRoutes = function loadRoutes(path) {
  return new Promise(function (resolve, reject) {
    var patternSearch = path + '/**/*Rest.json';

    (0, _glob2.default)(patternSearch, {}, function (err, files) {
      if (err) return reject(err);

      var allRoutes = [];

      files.forEach(function (file) {
        require(file).forEach(function (route) {
          route.file = file;
          allRoutes.push(route);
        });
      });

      resolve(allRoutes);
    });
  });
};

var organize = function organize(routes) {
  var config = {};

  for (var i = 0, c = routes.length; i < c; i++) {
    var route = routes[i];
    var verb = route.verb;
    var path = route.path;
    var file = route.file;

    var uri = verb.toUpperCase() + ': ' + path;
    var duplicated = config.hasOwnProperty(uri);

    if (duplicated) throw new Error('Duplicity of route: "' + uri + '" on files: "' + file + '" and "' + config[uri].file + '"');

    config[uri] = route;
  }

  return config;
};

var ndcRoutes = function ndcRoutes(path) {
  return loadRoutes(path).then(organize);
};

exports.default = ndcRoutes;