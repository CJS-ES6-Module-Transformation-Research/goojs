import { FilledPolygonjs as FilledPolygon_FilledPolygonjs } from "./FilledPolygon";
import { PolyLinejs as PolyLine_PolyLinejs } from "./PolyLine";
import { RegularPolygonjs as RegularPolygon_RegularPolygonjs } from "./RegularPolygon";
import { Surfacejs as Surface_Surfacejs } from "./Surface";
import { TextComponentjs as textTextComponent_TextComponentjs } from "./text/TextComponent";
import { TextComponentHandlerjs as textTextComponentHandler_TextComponentHandlerjs } from "./text/TextComponentHandler";
import { textTextMeshGenerator_obj } from "./text/TextMeshGenerator";
import { Trianglejs as Triangle_Trianglejs } from "./Triangle";
var indexjs;
indexjs = {
	FilledPolygon: FilledPolygon_FilledPolygonjs,
	PolyLine: PolyLine_PolyLinejs,
	RegularPolygon: RegularPolygon_RegularPolygonjs,
	Surface: Surface_Surfacejs,
	TextComponent: textTextComponent_TextComponentjs,
	TextComponentHandler: textTextComponentHandler_TextComponentHandlerjs,
	TextMeshGenerator: textTextMeshGenerator_obj,
	Triangle: Triangle_Trianglejs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}