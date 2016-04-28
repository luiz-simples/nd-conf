'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _ndcExecute = require('./ndcExecute');

var _ndcExecute2 = _interopRequireDefault(_ndcExecute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadActions = function loadActions(path) {
  return new Promise(function (resolve, reject) {
    (0, _glob2.default)(path + '/**/actions/*.js', {}, function (err, files) {
      if (err) return reject(err);

      resolve(files.map(function (file) {
        var actionClass = require(file).default;
        actionClass.file = file;
        return actionClass;
      }));
    });
  });
};

var organize = function organize(actions) {
  var allActions = {};

  for (var i = 0, c = actions.length; i < c; i++) {
    var action = actions[i];
    var actionName = action.actionName;
    var file = action.file;

    var duplicated = allActions.hasOwnProperty(actionName);

    if (duplicated) throw new Error('Duplicity of action: "' + actionName + '" on files: "' + file + '" and "' + allActions[actionName].file + '"');

    allActions[actionName] = action;
  }

  return allActions;
};

var ndcActions = function ndcActions(path) {
  return loadActions(path).then(organize).then(function (actions) {
    actions.execute = _ndcExecute2.default;
    return actions;
  });
};

exports.default = ndcActions;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ndcRoutes = require('./ndcRoutes');

var _ndcRoutes2 = _interopRequireDefault(_ndcRoutes);

var _ndcActions = require('./ndcActions');

var _ndcActions2 = _interopRequireDefault(_ndcActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ndcConfigs = function ndcConfigs(path) {
  return (0, _ndcRoutes2.default)(path).then(function (routes) {
    return (0, _ndcActions2.default)(path).then(function (actions) {
      return {
        routes: routes,
        actions: actions
      };
    });
  });
};

exports.default = ndcConfigs;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ndcExecute = function ndcExecute(context) {
  var _this = this;

  var actionsPointers = context.exec.map(function (actionName) {
    return _this[actionName];
  });

  var runActions = Promise.resolve();

  actionsPointers.forEach(function (action) {
    runActions = runActions.then(function (res) {
      return action(res || {}, context);
    });
  });

  return runActions.then(function (res) {
    return res || {};
  });
};

exports.default = ndcExecute;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ndcConfigs = require('./ndcConfigs');

var _ndcConfigs2 = _interopRequireDefault(_ndcConfigs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ndcRest = function ndcRest(_ref) {
  var path = _ref.path;
  var app = _ref.app;

  return (0, _ndcConfigs2.default)(path).then(function (config) {
    Object.keys(config.routes).map(function (key) {
      return config.routes[key];
    }).forEach(function (_ref2) {
      var verb = _ref2.verb;
      var path = _ref2.path;
      var exec = _ref2.exec;

      app[verb](path, function (req, res, next) {
        var context = { app: app, req: req, res: res, config: config, exec: exec };
        config.actions.execute(context).then(next);
      });
    });

    return app;
  });
};

exports.default = ndcRest;
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
//# sourceMappingURL=all.js.map
