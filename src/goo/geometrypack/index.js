import { FilledPolygon as FilledPolygon_FilledPolygon } from "./FilledPolygon";
import { PolyLine as PolyLine_PolyLine } from "./PolyLine";
import { RegularPolygon as RegularPolygon_RegularPolygon } from "./RegularPolygon";
import { Surface as Surface_Surface } from "./Surface";
import { TextComponent as textTextComponent_TextComponent } from "./text/TextComponent";
import { TextComponentHandler as textTextComponentHandler_TextComponentHandler } from "./text/TextComponentHandler";
import { TextMeshGeneratorjs as textTextMeshGenerator_TextMeshGeneratorjs } from "./text/TextMeshGenerator";
import { Triangle as Triangle_Triangle } from "./Triangle";
mod_indexjs = {
	FilledPolygon: FilledPolygon_FilledPolygon,
	PolyLine: PolyLine_PolyLine,
	RegularPolygon: RegularPolygon_RegularPolygon,
	Surface: Surface_Surface,
	TextComponent: textTextComponent_TextComponent,
	TextComponentHandler: textTextComponentHandler_TextComponentHandler,
	TextMeshGenerator: textTextMeshGenerator_TextMeshGeneratorjs,
	Triangle: Triangle_Triangle
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
var mod_indexjs;
export { mod_indexjs as indexjs };