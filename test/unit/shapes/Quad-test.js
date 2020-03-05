import { Quad as Quad_Quadjs } from "../../../src/goo/shapes/Quad";

describe('Quad', function () {
	var a = new Quad_Quadjs();

	it('Number of vertices and indices', function () {
		expect(a.vertexCount).toEqual(4);
		expect(a.indexCount).toEqual(6);
	});
});
