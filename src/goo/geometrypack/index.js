import { FilledPolygon } from "./FilledPolygon";
import { PolyLine } from "./PolyLine";
import { RegularPolygon } from "./RegularPolygon";
import { Surface } from "./Surface";
import { TextComponent } from "./text/TextComponent";
import { TextComponentHandler } from "./text/TextComponentHandler";
import { TextMeshGenerator } from "./text/TextMeshGenerator";
import { Triangle } from "./Triangle";
module.exports = {
	FilledPolygon: FilledPolygon,
	PolyLine: PolyLine,
	RegularPolygon: RegularPolygon,
	Surface: Surface,
	TextComponent: TextComponent,
	TextComponentHandler: TextComponentHandler,
	TextMeshGenerator: TextMeshGenerator,
	Triangle: Triangle
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}