Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Forrest = require("./Forrest");

var _Forrest2 = _interopRequireDefault(_Forrest);

var _Terrain = require("./Terrain");

var _Terrain2 = _interopRequireDefault(_Terrain);

var _TerrainHandler = require("./TerrainHandler");

var _TerrainHandler2 = _interopRequireDefault(_TerrainHandler);

var _TerrainSurface = require("./TerrainSurface");

var _TerrainSurface2 = _interopRequireDefault(_TerrainSurface);

var _Vegetation = require("./Vegetation");

var _Vegetation2 = _interopRequireDefault(_Vegetation);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	Forrest: _Forrest2.default,
	Terrain: _Terrain2.default,
	TerrainHandler: _TerrainHandler2.default,
	TerrainSurface: _TerrainSurface2.default,
	Vegetation: _Vegetation2.default
};
;
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
module.exports = exports.default;
