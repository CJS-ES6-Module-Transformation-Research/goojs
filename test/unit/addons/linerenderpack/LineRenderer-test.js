import { Vector3 as Vector3_Vector3js } from "../../../../src/goo/math/Vector3";
import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { LineRenderer as LineRenderer_LineRendererjs } from "../../../../src/goo/addons/linerenderpack/LineRenderer";

describe('LineRenderer', function () {
	var world;
	var lineRenderer;
	var redColor = new Vector3_Vector3js(1, 0, 0);

	beforeEach(function () {
		world = new World_Worldjs();
	});

	it('can construct', function () {
		lineRenderer = new LineRenderer_LineRendererjs(world);

		expect(lineRenderer).toBeDefined();
	});

	it('can add line', function () {
		lineRenderer = new LineRenderer_LineRendererjs(world);

		lineRenderer._addLine(Vector3_Vector3js.ZERO, Vector3_Vector3js.ONE, redColor);

		//expect _numRenderingLines to have incremented
		expect(lineRenderer._numRenderingLines).toBe(1);
	});

	it('can add to renderList', function () {
		lineRenderer = new LineRenderer_LineRendererjs(world);
		var renderList = [];

		lineRenderer._addLine(Vector3_Vector3js.ZERO, Vector3_Vector3js.ONE, redColor);

		lineRenderer._manageRenderList(renderList);

		//expect an element in the renderList array
		expect(renderList.length).toBe(1);
	});

	it('can remove from renderList', function () {
		lineRenderer = new LineRenderer_LineRendererjs(world);
		var renderList = [];

		lineRenderer._addLine(Vector3_Vector3js.ZERO, Vector3_Vector3js.ONE, redColor);

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