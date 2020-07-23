import { Cone as srcgooshapesCone_Conejs } from "../../../src/goo/shapes/Cone";

describe('Cone', function () {
	var a = new srcgooshapesCone_Conejs(8, 1, 1);

	it('Number of vertices and indices', function () {
		expect(a.vertexCount).toEqual(33);
		expect(a.indexCount).toEqual(48);
	});
});
