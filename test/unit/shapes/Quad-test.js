var _Quad = require('../../../src/goo/shapes/Quad');

describe('Quad', function () {
	var a = new _Quad.Quad();

	it('Number of vertices and indices', function () {
		expect(a.vertexCount).toEqual(4);
		expect(a.indexCount).toEqual(6);
	});
});
