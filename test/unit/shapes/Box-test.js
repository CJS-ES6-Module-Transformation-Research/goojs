'use strict';

var _Box = require('../../../src/goo/shapes/Box');

describe('Box', function () {
	var a = new _Box.Box();

	it('Number of vertices and indices', function () {
		expect(a.vertexCount).toEqual(24);
		expect(a.indexCount).toEqual(36);
	});
});
