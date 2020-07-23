import { Disk as srcgooshapesDisk_Diskjs } from "../../../src/goo/shapes/Disk";

describe('Disk', function () {
	var a = new srcgooshapesDisk_Diskjs(8, 1);

	it('Number of vertices and indices', function () {
		expect(a.vertexCount).toEqual(9);
		expect(a.indexCount).toEqual(8 * 3);
	});
});
