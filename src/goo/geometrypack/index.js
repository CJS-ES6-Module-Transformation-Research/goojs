"use strict";

var _FilledPolygon = require("./FilledPolygon");

var _PolyLine = require("./PolyLine");

var _RegularPolygon = require("./RegularPolygon");

var _Surface = require("./Surface");

var _TextComponent = require("./text/TextComponent");

var _TextComponentHandler = require("./text/TextComponentHandler");

var _TextMeshGenerator = require("./text/TextMeshGenerator");

var textTextMeshGenerator_TextMeshGeneratorjs = _interopRequireWildcard(_TextMeshGenerator);

var _Triangle = require("./Triangle");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var indexjs;
indexjs = {
	FilledPolygon: _FilledPolygon.FilledPolygon,
	PolyLine: _PolyLine.PolyLine,
	RegularPolygon: _RegularPolygon.RegularPolygon,
	Surface: _Surface.Surface,
	TextComponent: _TextComponent.TextComponent,
	TextComponentHandler: _TextComponentHandler.TextComponentHandler,
	TextMeshGenerator: textTextMeshGenerator_TextMeshGeneratorjs,
	Triangle: _Triangle.Triangle
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}