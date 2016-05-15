'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadConfigs = function loadConfigs(folder) {
  return new Promise(function (resolve, reject) {
    (0, _glob2.default)(folder + '/**/*Config.js', {}, function (err, files) {
      if (err) return reject(err);
      resolve(files.map(function (file) {
        var run = require(file).default;
        var name = _path2.default.basename(file, 'Config.js');
        return { run: run, name: name, file: file };
      }));
    });
  });
};

var organize = function organize(configs) {
  var allConfigs = {};

  for (var i = 0, c = configs.length; i < c; i++) {
    var _configs$i = configs[i];
    var name = _configs$i.name;
    var file = _configs$i.file;

    var duplicated = allConfigs.hasOwnProperty(name);
    if (duplicated) throw new Error('Duplicity of config: "' + name + '" on files: "' + file + '" and "' + allConfigs[name].file + '"');
    allConfigs[name] = configs[i];
  }

  return allConfigs;
};

var ndcConfigs = function ndcConfigs(path) {
  return loadConfigs(path).then(organize);
};
exports.default = ndcConfigs;