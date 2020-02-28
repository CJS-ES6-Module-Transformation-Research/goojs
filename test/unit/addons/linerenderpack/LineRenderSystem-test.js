var _Vector = require("../../../../src/goo/math/Vector3");

var _World = require("../../../../src/goo/entities/World");

var _LineRenderSystem = require("../../../../src/goo/addons/linerenderpack/LineRenderSystem");

describe('LineRenderSystem', function () {
	var world;
	var lineRenderSystem;

	beforeEach(function () {
		world = new _World.World();
		lineRenderSystem = new _LineRenderSystem.LineRenderSystem(world);
	});

	it('can construct', function () {
		expect(lineRenderSystem).toBeDefined();
	});

	it('can drawLine', function () {
		//draw a red line between 0,0,0 and 1,1,1
		lineRenderSystem.drawLine(Vector3js_ZERO, Vector3js_ONE, lineRenderSystem.RED);

		expect(lineRenderSystem._lineRenderers.length).toBe(1);
	});

	it('can drawCross', function () {
		//draw a red cross at 0,0,0
		lineRenderSystem.drawCross(Vector3js_ZERO, lineRenderSystem.RED);

		expect(lineRenderSystem._lineRenderers.length).toBe(1);
	});
});
