import { Box as srcgooshapesBox_Boxjs } from "../../../src/goo/shapes/Box";

describe('Box', function () {
	var a = new srcgooshapesBox_Boxjs();

	it('Number of vertices and indices', function () {
		expect(a.vertexCount).toEqual(24);
		expect(a.indexCount).toEqual(36);
	});
});
