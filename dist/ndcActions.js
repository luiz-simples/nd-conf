'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ndcExecute = require('./ndcExecute');

var _ndcExecute2 = _interopRequireDefault(_ndcExecute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadActions = function loadActions(folder) {
  return new Promise(function (resolve, reject) {
    (0, _glob2.default)(folder + '/**/*Action.js', {}, function (err, files) {
      if (err) return reject(err);
      resolve(files.map(function (file) {
        var run = require(file).default;
        var name = _path2.default.basename(file, 'Action.js');
        return { run: run, name: name, file: file };
      }));
    });
  });
};

var organize = function organize(actions) {
  var allActions = {};

  for (var i = 0, c = actions.length; i < c; i++) {
    var _actions$i = actions[i];
    var name = _actions$i.name;
    var file = _actions$i.file;

    var duplicated = allActions.hasOwnProperty(name);
    if (duplicated) throw new Error('Duplicity of action: "' + name + '" on files: "' + file + '" and "' + allActions[name].file + '"');
    allActions[name] = actions[i];
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