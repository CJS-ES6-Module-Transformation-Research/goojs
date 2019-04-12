import FilledPolygon_moduleDefault from "./FilledPolygon";
import PolyLine_moduleDefault from "./PolyLine";
import RegularPolygon_moduleDefault from "./RegularPolygon";
import Surface_moduleDefault from "./Surface";
import textTextComponent_moduleDefault from "./text/TextComponent";
import textTextComponentHandler_moduleDefault from "./text/TextComponentHandler";
import textTextMeshGenerator_moduleDefault from "./text/TextMeshGenerator";
import Triangle_moduleDefault from "./Triangle";
export default {
	FilledPolygon: FilledPolygon_moduleDefault,
	PolyLine: PolyLine_moduleDefault,
	RegularPolygon: RegularPolygon_moduleDefault,
	Surface: Surface_moduleDefault,
	TextComponent: textTextComponent_moduleDefault,
	TextComponentHandler: textTextComponentHandler_moduleDefault,
	TextMeshGenerator: textTextMeshGenerator_moduleDefault,
	Triangle: Triangle_moduleDefault
};;
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}