import { FilledPolygon } from "./FilledPolygon";
import { PolyLine as PolyLinejs } from "./PolyLine";
import { RegularPolygon } from "./RegularPolygon";
import { Surface as Surfacejs } from "./Surface";
import { TextComponent as TextComponentjs } from "./text/TextComponent";
import { TextComponentHandler as TextComponentHandlerjs } from "./text/TextComponentHandler";
import { TextMeshGeneratorjs } from "./text/TextMeshGenerator";
import { Triangle as Trianglejs } from "./Triangle";
module.exports = {
	FilledPolygon: FilledPolygon_FilledPolygonjs,
	PolyLine: PolyLinejs,
	RegularPolygon: RegularPolygon_RegularPolygonjs,
	Surface: Surfacejs,
	TextComponent: TextComponentjs,
	TextComponentHandler: TextComponentHandlerjs,
	TextMeshGenerator: TextMeshGenerator_TextMeshGeneratorjsjs,
	Triangle: Trianglejs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}