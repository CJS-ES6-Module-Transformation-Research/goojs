import { Torus as Torus_Torusjs } from "../../../src/goo/shapes/Torus";

describe('Torus', function () {
	var a = new Torus_Torusjs(8, 4);

	it('Number of vertices and indices', function () {
		expect(a.vertexCount).toEqual(45);
		expect(a.indexCount).toEqual(192);
	});
});
