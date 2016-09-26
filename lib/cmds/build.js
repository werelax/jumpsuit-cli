'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleEvent = exports.watch = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var watch = exports.watch = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(argv) {
    var sourceDir, outputDir, watcher;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _emit.outputLogo)();
            sourceDir = _config.CONFIG.sourceDir;
            outputDir = _config.CONFIG.outputDir;


            _fsPromise2.default.emptyDirSync(outputDir);
            watcher = _chokidar2.default.watch(sourceDir, {
              persistent: true,
              ignored: /[\/\\](\.)|node_modules|bower_components/
            });


            watcher.on('all', handleEvent);
            _context2.next = 8;
            return (0, _serve2.default)(argv, true);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function watch(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var handleEvent = exports.handleEvent = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(evt, file) {
    var ext;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!evt.match(/Dir$/)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt('return');

          case 2:
            if (++evtCount === 1) {
              buildTime = Date.now();
              isBuilding();
            }

            _context3.prev = 3;
            ext = _path2.default.extname(file);

            if (!(_config.CONFIG.browserify.extensions.indexOf(ext) > -1)) {
              _context3.next = 10;
              break;
            }

            _context3.next = 8;
            return (0, _javascript.buildJs)(evt, file);

          case 8:
            _context3.next = 18;
            break;

          case 10:
            if (!(_config.CONFIG.styles && _config.CONFIG.styles.extensions.indexOf(ext) > -1)) {
              _context3.next = 15;
              break;
            }

            _context3.next = 13;
            return (0, _styles.buildStyles)(evt, file);

          case 13:
            _context3.next = 18;
            break;

          case 15:
            if (!(_config.CONFIG.assetsIgnoreExtensions.indexOf(ext) === -1)) {
              _context3.next = 18;
              break;
            }

            _context3.next = 18;
            return (0, _assets.buildAsset)(evt, file);

          case 18:
            _context3.next = 26;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3['catch'](3);

            evtCount--;
            (0, _emit.error)(_context3.t0, true);

            if (!(process.env.NODE_ENV === 'production')) {
              _context3.next = 26;
              break;
            }

            throw _context3.t0;

          case 26:
            if (--evtCount === 0) {
              isDone(Date.now() - buildTime);
            }

          case 27:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[3, 20]]);
  }));

  return function handleEvent(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _serve = require('./serve');

var _serve2 = _interopRequireDefault(_serve);

var _common = require('../utils/common');

var _config = require('../utils/config');

var _emit = require('../utils/emit');

var _javascript = require('../compilers/javascript');

var _assets = require('../compilers/assets');

var _styles = require('../compilers/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(argv) {
    var files;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _emit.outputLogo)();
            files = _glob2.default.sync(_config.CONFIG.sourceDir + '/**/*', { nodir: true });
            _context.next = 4;
            return Promise.all(files.map(function (file) {
              return handleEvent('add', file);
            }));

          case 4:
            if (process.env.NODE_ENV === 'production') {
              require('./prerender').default(argv);
            }

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

var evtCount = 0;
var buildTime = void 0;
var isBuilding = (0, _common.debounce)(function () {
  return (0, _emit.pending)('building');
});
var isDone = (0, _common.debounce)(function (time) {
  return (0, _emit.pendingDone)(time);
});