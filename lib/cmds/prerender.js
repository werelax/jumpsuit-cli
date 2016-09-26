'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _config = require('../utils/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(argv) {
    var app, appHTML, html, newHtml;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            global.IS_SERVERSIDE = true;
            app = require(_path2.default.resolve(_config.CONFIG.outputDir, 'app.js')).default;
            appHTML = _server2.default.renderToString(app);
            html = _fs2.default.readFileSync(_path2.default.resolve(_config.CONFIG.outputDir, 'index.html'), 'utf8');
            newHtml = html.replace(appHTML, '').replace(/id=['"]app['"](.+)?></, 'id=\'app\'$1>' + appHTML + '<');

            _fs2.default.writeFileSync(_path2.default.resolve(_config.CONFIG.outputDir, 'index.html'), newHtml);

          case 6:
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