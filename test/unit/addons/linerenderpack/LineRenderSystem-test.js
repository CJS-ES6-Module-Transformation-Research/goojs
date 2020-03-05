import { Vector3 as Vector3_Vector3js } from "../../../../src/goo/math/Vector3";
import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { LineRenderSystem as LineRenderSystem_LineRenderSystemjs } from "../../../../src/goo/addons/linerenderpack/LineRenderSystem";

describe('LineRenderSystem', function () {
	var world;
	var lineRenderSystem;

	beforeEach(function () {
		world = new World_Worldjs();
		lineRenderSystem = new LineRenderSystem_LineRenderSystemjs(world);
	});

	it('can construct', function () {
		expect(lineRenderSystem).toBeDefined();
	});

	it('can drawLine', function () {
		//draw a red line between 0,0,0 and 1,1,1
		lineRenderSystem.drawLine(Vector3_Vector3js.ZERO, Vector3_Vector3js.ONE, lineRenderSystem.RED);

		expect(lineRenderSystem._lineRenderers.length).toBe(1);
	});

	it('can drawCross', function () {
		//draw a red cross at 0,0,0
		lineRenderSystem.drawCross(Vector3_Vector3js.ZERO, lineRenderSystem.RED);

		expect(lineRenderSystem._lineRenderers.length).toBe(1);
	});
});