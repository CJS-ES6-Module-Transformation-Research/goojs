import { Quad as Quadjs } from "../../../src/goo/shapes/Quad";

describe('Quad', function () {
	var a = new Quadjs();

	it('Number of vertices and indices', function () {
		expect(a.vertexCount).toEqual(4);
		expect(a.indexCount).toEqual(6);
	});
});
