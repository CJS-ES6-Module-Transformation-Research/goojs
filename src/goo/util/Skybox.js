var Skybox_Skybox = Skybox;
import { Box as shapesBox_Boxjs } from "../shapes/Box";
import { Sphere as shapesSphere_Spherejs } from "../shapes/Sphere";
import { MeshData as rendererMeshData_MeshDatajs } from "../renderer/MeshData";
import { Material as rendererMaterial_Materialjs } from "../renderer/Material";
import { Shader as rendererShader_Shaderjs } from "../renderer/Shader";
import { TextureCreator as rendererTextureCreator_TextureCreatorjs } from "../renderer/TextureCreator";
import { Transform as mathTransform_Transformjs } from "../math/Transform";
function Skybox(type, images, textureMode, yRotation) {
	var promise;
	if (type === Skybox.SPHERE) {
		this.meshData = new shapesSphere_Spherejs(16, 32, 1, textureMode || shapesSphere_Spherejs.TextureModes.Projected);
		if (images instanceof Array) {
			images = images[0];
		}
		if (images) {
			promise = new rendererTextureCreator_TextureCreatorjs().loadTexture2D(images);
		}
	} else if (type === Skybox.BOX) {
		this.meshData = new shapesBox_Boxjs(1, 1, 1);
		if (images.length) {
			promise = new rendererTextureCreator_TextureCreatorjs().loadTextureCube(images, {
				flipY: false,
				wrapS: 'EdgeClamp',
				wrapT: 'EdgeClamp'
			});
		}
	} else {
		throw new Error('Unknown geometry type');
	}

	var material = new rendererMaterial_Materialjs(shaders[type], 'Skybox material');
	material.cullState.cullFace = 'Front';
	material.depthState.enabled = false;
	material.renderQueue = 1;
	if (promise) {
		promise.then(function (texture) {
			material.setTexture(rendererShader_Shaderjs.DIFFUSE_MAP, texture);
		});
	}

	this.materials = [material];

	this.transform = new mathTransform_Transformjs();
	var xAngle = (type === Skybox.SPHERE) ? Math.PI / 2 : 0;
	this.transform.rotation.fromAngles(xAngle, yRotation, 0);
	this.transform.update();

	this.active = true;
}

Skybox.SPHERE = 'sphere';
Skybox.BOX = 'box';

var shaders = {};
shaders.box = {
	attributes: {
		vertexPosition: rendererMeshData_MeshDatajs.POSITION
	},
	uniforms: {
		normalMatrix: rendererShader_Shaderjs.NORMAL_MATRIX,
		viewMatrix: rendererShader_Shaderjs.VIEW_MATRIX,
		projectionMatrix: rendererShader_Shaderjs.PROJECTION_MATRIX,
		near: rendererShader_Shaderjs.NEAR_PLANE,
		diffuseMap: rendererShader_Shaderjs.DIFFUSE_MAP
	},
	vshader: [
		'attribute vec3 vertexPosition;',

		'uniform mat3 normalMatrix;',
		'uniform mat4 viewMatrix;',
		'uniform mat4 projectionMatrix;',
		'uniform float near;',

		'varying vec3 eyeVec;',

		'void main(void) {',
		'	eyeVec = vertexPosition * normalMatrix * near * 10.0;',
		'	vec3 worldPos = mat3(viewMatrix) * eyeVec;',
		'	gl_Position = projectionMatrix * vec4(worldPos, 1.0);',
		'}'
	].join('\n'),
	fshader: [
		'uniform samplerCube diffuseMap;',

		'varying vec3 eyeVec;',

		'void main(void) {',
		'	vec4 cube = textureCube(diffuseMap, eyeVec);',
		'	if (cube.a < 0.05) discard;',
		'	gl_FragColor = cube;',
		'}'
	].join('\n')
};
shaders.sphere = {
	attributes: {
		vertexPosition: rendererMeshData_MeshDatajs.POSITION,
		vertexUV0: rendererMeshData_MeshDatajs.TEXCOORD0
	},
	uniforms: {
		normalMatrix: rendererShader_Shaderjs.NORMAL_MATRIX,
		viewMatrix: rendererShader_Shaderjs.VIEW_MATRIX,
		projectionMatrix: rendererShader_Shaderjs.PROJECTION_MATRIX,
		near: rendererShader_Shaderjs.NEAR_PLANE,
		diffuseMap: rendererShader_Shaderjs.DIFFUSE_MAP
	},
	vshader: [
		'attribute vec3 vertexPosition;',
		'attribute vec2 vertexUV0;',

		'uniform mat3 normalMatrix;',
		'uniform mat4 viewMatrix;',
		'uniform mat4 projectionMatrix;',
		'uniform float near;',

		'varying vec2 texCoord0;',

		'void main(void) {',
		'	texCoord0 = vertexUV0;',

		'	vec3 worldPos = mat3(viewMatrix) * normalMatrix * vertexPosition * near * 10.0;',
		'	gl_Position = projectionMatrix * vec4(worldPos, 1.0);',
		'}'
	].join('\n'),
	fshader: [
		'precision mediump float;',

		'uniform sampler2D diffuseMap;',

		'varying vec2 texCoord0;',

		'void main(void)',
		'{',
		'	vec4 sphere = texture2D(diffuseMap, texCoord0);',
		'	if (sphere.a < 0.05) discard;',
		'	gl_FragColor = sphere;',
		'}'
	].join('\n')
};

/**
 * Skybox
 * @param type
 * @param images
 * @param textureMode
 * @param yRotation
 */
export { Skybox_Skybox as Skybox };