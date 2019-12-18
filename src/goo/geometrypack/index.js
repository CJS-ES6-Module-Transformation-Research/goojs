var _FilledPolygon = require("./FilledPolygon");

var _PolyLine = require("./PolyLine");

var _RegularPolygon = require("./RegularPolygon");

var _Surface = require("./Surface");

var _TextComponent = require("./text/TextComponent");

var _TextComponentHandler = require("./text/TextComponentHandler");

var _TextMeshGenerator = require("./text/TextMeshGenerator");

var _Triangle = require("./Triangle");

module.exports = {
	FilledPolygon: _FilledPolygon.FilledPolygon,
	PolyLine: _PolyLine.PolyLine,
	RegularPolygon: _RegularPolygon.RegularPolygon,
	Surface: _Surface.Surface,
	TextComponent: _TextComponent.TextComponent,
	TextComponentHandler: _TextComponentHandler.TextComponentHandler,
	TextMeshGenerator: _TextMeshGenerator.TextMeshGenerator,
	Triangle: _Triangle.Triangle
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
