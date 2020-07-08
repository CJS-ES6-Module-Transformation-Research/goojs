import { Vector2 as mathVector2_Vector2js } from "../math/Vector2";
import { Vector3 as mathVector3_Vector3js } from "../math/Vector3";
import { MeshData as rendererMeshData_MeshDatajs } from "../renderer/MeshData";
var TangentGenerator_addTangentBuffer;

/**
 * The TangentGenerator can generate and add a buffer with tangent information to a MeshData
 */
function TangentGenerator() {}

/**
 * Generates and adds a buffer with tangent information to a MeshData object
 * @param {MeshData} meshData MeshData object to use for generating tangent coords
 * @param {number} [uvUnit=0] Texture coord index to use as base for tangent generation
 */
TangentGenerator_addTangentBuffer = function(meshData, uvUnit) {
    uvUnit = uvUnit || 0;

    var vertexBuffer = meshData.getAttributeBuffer(rendererMeshData_MeshDatajs.POSITION);
    if (!vertexBuffer) {
        return;
    }

    var normalBuffer = meshData.getAttributeBuffer(rendererMeshData_MeshDatajs.NORMAL);
    if (!normalBuffer) {
        return;
    }

    var textureBuffer = meshData.getAttributeBuffer("TEXCOORD" + uvUnit);
    if (!textureBuffer && uvUnit !== 0) {
        textureBuffer = meshData.getAttributeBuffer(rendererMeshData_MeshDatajs.TEXCOORD0);
    }
    if (!textureBuffer) {
        return;
    }

    var indexBuffer = meshData.getIndexBuffer();
    if (!indexBuffer) {
        return;
    }

    var vertexCount = meshData.vertexCount;
    var triangleCount = meshData.indexCount / 3; // TODO: Handle other primitives than triangles

    var tan1 = [];
    var tan2 = [];
    for (var i = 0; i < vertexCount; i++) {
        tan1[i] = new mathVector3_Vector3js();
        tan2[i] = new mathVector3_Vector3js();
    }

    function getVector2Array(buf) {
        var arr = [];
        for (var i = 0; i < buf.length; i += 2) {
            arr.push(new mathVector2_Vector2js(buf[i + 0], buf[i + 1]));
        }
        return arr;
    }

    function getVector3Array(buf) {
        var arr = [];
        for (var i = 0; i < buf.length; i += 3) {
            arr.push(new mathVector3_Vector3js(buf[i + 0], buf[i + 1], buf[i + 2]));
        }
        return arr;
    }

    var vertex = getVector3Array(vertexBuffer);
    var normal = getVector3Array(normalBuffer);
    var texcoord = getVector2Array(textureBuffer);

    for (var a = 0; a < triangleCount; a++) {
        var i1 = indexBuffer[a * 3];
        var i2 = indexBuffer[a * 3 + 1];
        var i3 = indexBuffer[a * 3 + 2];

        var v1 = vertex[i1];
        var v2 = vertex[i2];
        var v3 = vertex[i3];

        var w1 = texcoord[i1];
        var w2 = texcoord[i2];
        var w3 = texcoord[i3];

        var x1 = v2.x - v1.x;
        var x2 = v3.x - v1.x;
        var y1 = v2.y - v1.y;
        var y2 = v3.y - v1.y;
        var z1 = v2.z - v1.z;
        var z2 = v3.z - v1.z;

        var s1 = w2.x - w1.x;
        var s2 = w3.x - w1.x;
        var t1 = w2.y - w1.y;
        var t2 = w3.y - w1.y;

        var r = 1.0 / (s1 * t2 - s2 * t1);
        if (isFinite(r) === false) {
            continue;
        }
        var sdir = new mathVector3_Vector3js((t2 * x1 - t1 * x2) * r, (t2 * y1 - t1 * y2) * r, (t2 * z1 - t1 * z2) * r);
        var tdir = new mathVector3_Vector3js((s1 * x2 - s2 * x1) * r, (s1 * y2 - s2 * y1) * r, (s1 * z2 - s2 * z1) * r);

        tan1[i1].add(sdir);
        tan1[i2].add(sdir);
        tan1[i3].add(sdir);

        tan2[i1].add(tdir);
        tan2[i2].add(tdir);
        tan2[i3].add(tdir);
    }

    meshData.attributeMap[rendererMeshData_MeshDatajs.TANGENT] = rendererMeshData_MeshDatajs.createAttribute(4, "Float");
    meshData.rebuildData(meshData.vertexCount, meshData.indexCount, true);
    var tangentBuffer = meshData.getAttributeBuffer(rendererMeshData_MeshDatajs.TANGENT);

    var calc1 = new mathVector3_Vector3js();
    var calc2 = new mathVector3_Vector3js();
    for (var a = 0; a < vertexCount; a++) {
        var n = normal[a];
        var t = tan1[a];

        // Gram-Schmidt orthogonalize
        var dot = n.dot(t);
        calc1.copy(t).sub(calc2.copy(n).scale(dot)).normalize();
        tangentBuffer[a * 4 + 0] = calc1.x;
        tangentBuffer[a * 4 + 1] = calc1.y;
        tangentBuffer[a * 4 + 2] = calc1.z;

        // Calculate handedness
        dot = calc1.copy(n).cross(t).dot(tan2[a]);
        var w = dot < 0.0 ? -1.0 : 1.0;
        tangentBuffer[a * 4 + 3] = w;
    }

    return tangentBuffer;
};;

export { TangentGenerator_addTangentBuffer as addTangentBuffer, TangentGenerator };