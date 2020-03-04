import { Box as Boxjs } from "../shapes/Box";
import { Sphere as Spherejs } from "../shapes/Sphere";
import { MeshData as MeshDatajs } from "../renderer/MeshData";
import { Material as Materialjs } from "../renderer/Material";
import { Shader as Shaderjs } from "../renderer/Shader";
import { TextureCreator as TextureCreator_TextureCreatorjs } from "../renderer/TextureCreator";
import { Transform as Transformjs } from "../math/Transform";
var Skybox_BOX;
var Skybox_SPHERE;
function Skybox(type, images, textureMode, yRotation) {
	var promise;
	if (type === Skybox.SPHERE) {
		this.meshData = new Spherejs(16, 32, 1, textureMode || Spherejs.TextureModes.Projected);
		if (images instanceof Array) {
			images = images[0];
		}
		if (images) {
			promise = new TextureCreator_TextureCreatorjs().loadTexture2D(images);
		}
	} else if (type === Skybox.BOX) {
		this.meshData = new Boxjs(1, 1, 1);
		if (images.length) {
			promise = new TextureCreator_TextureCreatorjs().loadTextureCube(images, {
				flipY: false,
				wrapS: 'EdgeClamp',
				wrapT: 'EdgeClamp'
			});
		}
	} else {
		throw new Error('Unknown geometry type');
	}

	var material = new Materialjs(shaders[type], 'Skybox material');
	material.cullState.cullFace = 'Front';
	material.depthState.enabled = false;
	material.renderQueue = 1;
	if (promise) {
		promise.then(function (texture) {
			material.setTexture(Shaderjs.DIFFUSE_MAP, texture);
		});
	}

	this.materials = [material];

	this.transform = new Transformjs();
	var xAngle = (type === Skybox.SPHERE) ? Math.PI / 2 : 0;
	this.transform.rotation.fromAngles(xAngle, yRotation, 0);
	this.transform.update();

	this.active = true;
}

Skybox_SPHERE = "sphere";;
Skybox_BOX = "box";;

var shaders = {};
shaders.box = {
	attributes: {
		vertexPosition: MeshDatajs.POSITION
	},
	uniforms: {
		normalMatrix: Shaderjs.NORMAL_MATRIX,
		viewMatrix: Shaderjs.VIEW_MATRIX,
		projectionMatrix: Shaderjs.PROJECTION_MATRIX,
		near: Shaderjs.NEAR_PLANE,
		diffuseMap: Shaderjs.DIFFUSE_MAP
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
		vertexPosition: MeshDatajs.POSITION,
		vertexUV0: MeshDatajs.TEXCOORD0
	},
	uniforms: {
		normalMatrix: Shaderjs.NORMAL_MATRIX,
		viewMatrix: Shaderjs.VIEW_MATRIX,
		projectionMatrix: Shaderjs.PROJECTION_MATRIX,
		near: Shaderjs.NEAR_PLANE,
		diffuseMap: Shaderjs.DIFFUSE_MAP
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

var exported_Skybox = Skybox;

/**
 * Skybox
 * @param type
 * @param images
 * @param textureMode
 * @param yRotation
 */
export { exported_Skybox as Skybox };