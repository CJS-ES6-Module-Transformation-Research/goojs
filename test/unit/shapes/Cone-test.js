import { Cone as Cone_Cone } from "../../../src/goo/shapes/Cone";

describe('Cone', function () {
	var a = new Cone_Cone(8, 1, 1);

	it('Number of vertices and indices', function () {
		expect(a.vertexCount).toEqual(33);
		expect(a.indexCount).toEqual(48);
	});
});
