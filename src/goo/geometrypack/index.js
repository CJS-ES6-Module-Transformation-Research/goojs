import { FilledPolygon as FilledPolygon_FilledPolygonjs } from "./FilledPolygon";
import { PolyLine as PolyLine_PolyLinejs } from "./PolyLine";
import { RegularPolygon as RegularPolygon_RegularPolygonjs } from "./RegularPolygon";
import { Surface as Surface_Surfacejs } from "./Surface";
import { TextComponent as TextComponent_TextComponentjs } from "./text/TextComponent";
import { TextComponentHandler as TextComponentHandler_TextComponentHandlerjs } from "./text/TextComponentHandler";
import { TextMeshGeneratorjs as TextMeshGenerator_TextMeshGeneratorjsjs } from "./text/TextMeshGenerator";
import { Triangle as Triangle_Trianglejs } from "./Triangle";
module.exports = {
	FilledPolygon: FilledPolygon_FilledPolygonjs,
	PolyLine: PolyLine_PolyLinejs,
	RegularPolygon: RegularPolygon_RegularPolygonjs,
	Surface: Surface_Surfacejs,
	TextComponent: TextComponent_TextComponentjs,
	TextComponentHandler: TextComponentHandler_TextComponentHandlerjs,
	TextMeshGenerator: TextMeshGenerator_TextMeshGeneratorjsjs,
	Triangle: Triangle_Trianglejs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}