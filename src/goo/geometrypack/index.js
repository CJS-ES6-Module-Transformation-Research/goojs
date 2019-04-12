Object.defineProperty(exports, "__esModule", {
	value: true
});

var _FilledPolygon = require("./FilledPolygon");

var _FilledPolygon2 = _interopRequireDefault(_FilledPolygon);

var _PolyLine = require("./PolyLine");

var _PolyLine2 = _interopRequireDefault(_PolyLine);

var _RegularPolygon = require("./RegularPolygon");

var _RegularPolygon2 = _interopRequireDefault(_RegularPolygon);

var _Surface = require("./Surface");

var _Surface2 = _interopRequireDefault(_Surface);

var _TextComponent = require("./text/TextComponent");

var _TextComponent2 = _interopRequireDefault(_TextComponent);

var _TextComponentHandler = require("./text/TextComponentHandler");

var _TextComponentHandler2 = _interopRequireDefault(_TextComponentHandler);

var _TextMeshGenerator = require("./text/TextMeshGenerator");

var _TextMeshGenerator2 = _interopRequireDefault(_TextMeshGenerator);

var _Triangle = require("./Triangle");

var _Triangle2 = _interopRequireDefault(_Triangle);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	FilledPolygon: _FilledPolygon2.default,
	PolyLine: _PolyLine2.default,
	RegularPolygon: _RegularPolygon2.default,
	Surface: _Surface2.default,
	TextComponent: _TextComponent2.default,
	TextComponentHandler: _TextComponentHandler2.default,
	TextMeshGenerator: _TextMeshGenerator2.default,
	Triangle: _Triangle2.default
};
;
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
module.exports = exports.default;
