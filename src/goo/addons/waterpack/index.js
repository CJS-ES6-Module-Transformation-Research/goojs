Object.defineProperty(exports, "__esModule", {
	value: true
});

var _FlatWaterRenderer = require("./FlatWaterRenderer");

var _FlatWaterRenderer2 = _interopRequireDefault(_FlatWaterRenderer);

var _ProjectedGrid = require("./ProjectedGrid");

var _ProjectedGrid2 = _interopRequireDefault(_ProjectedGrid);

var _ProjectedGridWaterRenderer = require("./ProjectedGridWaterRenderer");

var _ProjectedGridWaterRenderer2 = _interopRequireDefault(_ProjectedGridWaterRenderer);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
	FlatWaterRenderer: _FlatWaterRenderer2.default,
	ProjectedGrid: _ProjectedGrid2.default,
	ProjectedGridWaterRenderer: _ProjectedGridWaterRenderer2.default
};
;
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
module.exports = exports.default;
