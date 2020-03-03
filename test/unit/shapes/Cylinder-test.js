import { Cylinder as Cylinderjs } from "../../../src/goo/shapes/Cylinder";

describe('Cylinder', function () {
	var a = new Cylinderjs();

	it('Number of vertices and indices', function () {
		expect(a.vertexCount).toEqual(8 * 4 + 2 + 2);
		expect(a.indexCount).toEqual(8 * 6 * 2);
	});
});
