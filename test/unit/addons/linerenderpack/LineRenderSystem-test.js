"use strict";

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
		lineRenderSystem.drawLine(_Vector.Vector3.ZERO, _Vector.Vector3.ONE, lineRenderSystem.RED);

		expect(lineRenderSystem._lineRenderers.length).toBe(1);
	});

	it('can drawCross', function () {
		//draw a red cross at 0,0,0
		lineRenderSystem.drawCross(_Vector.Vector3.ZERO, lineRenderSystem.RED);

		expect(lineRenderSystem._lineRenderers.length).toBe(1);
	});
});
