import { MeshData as srcgoorendererMeshData_MeshDatajs } from "../../../src/goo/renderer/MeshData";
import { Quad as srcgooshapesQuad_Quadjs } from "../../../src/goo/shapes/Quad";
import { Box as srcgooshapesBox_Boxjs } from "../../../src/goo/shapes/Box";
import { Transform as srcgoomathTransform_Transformjs } from "../../../src/goo/math/Transform";

describe('MeshData', function () {
	it('getNormalsMeshData: number of vertices and indices', function () {
		var box = new srcgooshapesBox_Boxjs();
		var normalsMD = box.getNormalsMeshData();

		var nNormalsPerFace = 4;
		var nFaces = 6;
		var nVerticesPerLine = 2;
		var nDimensions = 3;

		expect(normalsMD.vertexCount).toEqual(nNormalsPerFace * nFaces * nVerticesPerLine * nDimensions);
		expect(normalsMD.indexCount).toEqual(nNormalsPerFace * nFaces * nVerticesPerLine);
	});

	it('can rebuild data with other counts', function () {
		var box = new srcgooshapesBox_Boxjs();

		box.rebuildData(3, 3);

		expect(box.vertexCount).toEqual(3);
		expect(box.indexCount).toEqual(3);
	});

	it('can rebuild data with an indexCount of 0 and saveOldData', function () {
		var box = new srcgooshapesBox_Boxjs();
		var oldVertexCount = box.vertexCount;

		box.rebuildData(oldVertexCount, 0, true);

		expect(box.vertexCount).toEqual(oldVertexCount);
		expect(box.indexCount).toEqual(0);
	});

	it('can translate vertices', function () {
		var box = new srcgooshapesQuad_Quadjs();

		var transform = new srcgoomathTransform_Transformjs();
		transform.translation.setDirect(1, 2, 3);
		transform.update();
		box.applyTransform(srcgoorendererMeshData_MeshDatajs.POSITION, transform);

		expect(box.dataViews.POSITION[0]).toBeCloseTo(0.5); // -0.5 + 1
		expect(box.dataViews.POSITION[1]).toBeCloseTo(1.5); // -0.5 + 2
		expect(box.dataViews.POSITION[2]).toBeCloseTo(3.0); //  0.0 + 3

		expect(box.dataViews.POSITION[3]).toBeCloseTo(0.5); // -0.5 + 1
		expect(box.dataViews.POSITION[4]).toBeCloseTo(2.5); //  0.5 + 2
		expect(box.dataViews.POSITION[5]).toBeCloseTo(3.0); //  0.0 + 3

		expect(box.dataViews.POSITION[6]).toBeCloseTo(1.5); //  0.5 + 1
		expect(box.dataViews.POSITION[7]).toBeCloseTo(2.5); //  0.5 + 2
		expect(box.dataViews.POSITION[8]).toBeCloseTo(3.0); //  0.0 + 3

		expect(box.dataViews.POSITION[9]).toBeCloseTo(1.5);  //  0.5 + 1
		expect(box.dataViews.POSITION[10]).toBeCloseTo(1.5); // -0.5 + 2
		expect(box.dataViews.POSITION[11]).toBeCloseTo(3.0); //  0.0 + 3
	});

	it('can rotate vertices', function () {
		var box = new srcgooshapesQuad_Quadjs();

		var transform = new srcgoomathTransform_Transformjs();
		transform.setRotationXYZ(Math.PI / 4, 0, 0);
		transform.update();
		box.applyTransform(srcgoorendererMeshData_MeshDatajs.POSITION, transform);

		expect(box.dataViews.POSITION[0]).toBeCloseTo(-0.5 ); // -0.5
		expect(box.dataViews.POSITION[1]).toBeCloseTo(-Math.sqrt(2) / 4); // -Math.sqrt(2) / 4
		expect(box.dataViews.POSITION[2]).toBeCloseTo(-Math.sqrt(2) / 4); // -Math.sqrt(2) / 4

		expect(box.dataViews.POSITION[3]).toBeCloseTo(-0.5); // -0.5
		expect(box.dataViews.POSITION[4]).toBeCloseTo( Math.sqrt(2) / 4); //  Math.sqrt(2) / 4
		expect(box.dataViews.POSITION[5]).toBeCloseTo( Math.sqrt(2) / 4); //  Math.sqrt(2) / 4

		expect(box.dataViews.POSITION[6]).toBeCloseTo( 0.5); //  0.5
		expect(box.dataViews.POSITION[7]).toBeCloseTo( Math.sqrt(2) / 4); //  Math.sqrt(2) / 4
		expect(box.dataViews.POSITION[8]).toBeCloseTo( Math.sqrt(2) / 4); //  Math.sqrt(2) / 4

		expect(box.dataViews.POSITION[9]).toBeCloseTo( 0.5);  //  0.5
		expect(box.dataViews.POSITION[10]).toBeCloseTo(-Math.sqrt(2) / 4); // -Math.sqrt(2) / 4
		expect(box.dataViews.POSITION[11]).toBeCloseTo(-Math.sqrt(2) / 4); // -Math.sqrt(2) / 4
	});

	it('can apply a function on vertices', function () {
		var box = new srcgooshapesQuad_Quadjs();

		box.applyFunction(srcgoorendererMeshData_MeshDatajs.POSITION, function (vert) {
			vert.z = vert.x + vert.y;
			return vert;
		});

		expect(box.dataViews.POSITION[0]).toBeCloseTo(-0.5); // -0.5
		expect(box.dataViews.POSITION[1]).toBeCloseTo(-0.5); // -0.5
		expect(box.dataViews.POSITION[2]).toBeCloseTo(-1.0); //  0.0

		expect(box.dataViews.POSITION[3]).toBeCloseTo(-0.5); // -0.5
		expect(box.dataViews.POSITION[4]).toBeCloseTo(0.5); //  0.5
		expect(box.dataViews.POSITION[5]).toBeCloseTo(0.0); //  0.0

		expect(box.dataViews.POSITION[6]).toBeCloseTo(0.5); //  0.5
		expect(box.dataViews.POSITION[7]).toBeCloseTo(0.5); //  0.5
		expect(box.dataViews.POSITION[8]).toBeCloseTo(1.0); //  0.0

		expect(box.dataViews.POSITION[9]).toBeCloseTo(0.5);  //  0.5
		expect(box.dataViews.POSITION[10]).toBeCloseTo(-0.5); // -0.5
		expect(box.dataViews.POSITION[11]).toBeCloseTo(0.0); //  0.0
	});

	it('can get attribute buffer', function () {
		var box = new srcgooshapesBox_Boxjs();

		var getAttributeBuffer = box.getAttributeBuffer.bind(box);

		expect(getAttributeBuffer(srcgoorendererMeshData_MeshDatajs.POSITION)).toBeDefined();
		expect(getAttributeBuffer(srcgoorendererMeshData_MeshDatajs.NORMAL)).toBeDefined();
		expect(getAttributeBuffer(srcgoorendererMeshData_MeshDatajs.COLOR)).toBeUndefined();
		expect(getAttributeBuffer(srcgoorendererMeshData_MeshDatajs.TANGENT)).toBeUndefined();
		expect(getAttributeBuffer(srcgoorendererMeshData_MeshDatajs.TEXCOORD0)).toBeDefined();
		expect(getAttributeBuffer(srcgoorendererMeshData_MeshDatajs.TEXCOORD1)).toBeUndefined();
		expect(getAttributeBuffer(srcgoorendererMeshData_MeshDatajs.TEXCOORD2)).toBeUndefined();
		expect(getAttributeBuffer(srcgoorendererMeshData_MeshDatajs.TEXCOORD3)).toBeUndefined();
		expect(getAttributeBuffer(srcgoorendererMeshData_MeshDatajs.WEIGHTS)).toBeUndefined();
		expect(getAttributeBuffer(srcgoorendererMeshData_MeshDatajs.JOINTIDS)).toBeUndefined();
	});
});
