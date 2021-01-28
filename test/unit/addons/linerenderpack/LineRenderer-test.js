import { Vector3 as Vector3_Vector3 } from "../../../../src/goo/math/Vector3";
import { World as World_World } from "../../../../src/goo/entities/World";
import { LineRenderer as LineRenderer_LineRenderer } from "../../../../src/goo/addons/linerenderpack/LineRenderer";

describe('LineRenderer', function () {
	var world;
	var lineRenderer;
	var redColor = new Vector3_Vector3(1, 0, 0);

	beforeEach(function () {
		world = new World_World();
	});

	it('can construct', function () {
		lineRenderer = new LineRenderer_LineRenderer(world);

		expect(lineRenderer).toBeDefined();
	});

	it('can add line', function () {
		lineRenderer = new LineRenderer_LineRenderer(world);

		lineRenderer._addLine(Vector3_Vector3.ZERO, Vector3_Vector3.ONE, redColor);

		//expect _numRenderingLines to have incremented
		expect(lineRenderer._numRenderingLines).toBe(1);
	});

	it('can add to renderList', function () {
		lineRenderer = new LineRenderer_LineRenderer(world);
		var renderList = [];

		lineRenderer._addLine(Vector3_Vector3.ZERO, Vector3_Vector3.ONE, redColor);

		lineRenderer._manageRenderList(renderList);

		//expect an element in the renderList array
		expect(renderList.length).toBe(1);
	});

	it('can remove from renderList', function () {
		lineRenderer = new LineRenderer_LineRenderer(world);
		var renderList = [];

		lineRenderer._addLine(Vector3_Vector3.ZERO, Vector3_Vector3.ONE, redColor);

		//simulate two frames
		for (var i = 0; i < 2; i++) {
			lineRenderer._updateVertexData();
			lineRenderer._manageRenderList(renderList);
			lineRenderer._clear();
		}

		//expect no elements in the renderList array
		expect(renderList.length).toBe(0);
	});
});