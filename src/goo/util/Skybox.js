Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Skybox = undefined;

var _Box = require("../shapes/Box");

var _Sphere = require("../shapes/Sphere");

var _MeshData = require("../renderer/MeshData");

var _Material = require("../renderer/Material");

var _Shader = require("../renderer/Shader");

var _TextureCreator = require("../renderer/TextureCreator");

var _Transform = require("../math/Transform");

function Skybox(type, images, textureMode, yRotation) {
	var promise;
	if (type === Skybox.SPHERE) {
		this.meshData = new _Sphere.Sphere(16, 32, 1, textureMode || _Sphere.Sphere.TextureModes.Projected);
		if (images instanceof Array) {
			images = images[0];
		}
		if (images) {
			promise = new _TextureCreator.TextureCreator().loadTexture2D(images);
		}
	} else if (type === Skybox.BOX) {
		this.meshData = new _Box.Box(1, 1, 1);
		if (images.length) {
			promise = new _TextureCreator.TextureCreator().loadTextureCube(images, {
				flipY: false,
				wrapS: 'EdgeClamp',
				wrapT: 'EdgeClamp'
			});
		}
	} else {
		throw new Error('Unknown geometry type');
	}

	var material = new _Material.Material(shaders[type], 'Skybox material');
	material.cullState.cullFace = 'Front';
	material.depthState.enabled = false;
	material.renderQueue = 1;
	if (promise) {
		promise.then(function (texture) {
			material.setTexture(_Shader.Shader.DIFFUSE_MAP, texture);
		});
	}

	this.materials = [material];

	this.transform = new _Transform.Transform();
	var xAngle = type === Skybox.SPHERE ? Math.PI / 2 : 0;
	this.transform.rotation.fromAngles(xAngle, yRotation, 0);
	this.transform.update();

	this.active = true;
}

Skybox.SPHERE = 'sphere';
Skybox.BOX = 'box';

var shaders = {};
shaders.box = {
	attributes: {
		vertexPosition: _MeshData.MeshData.POSITION
	},
	uniforms: {
		normalMatrix: _Shader.Shader.NORMAL_MATRIX,
		viewMatrix: _Shader.Shader.VIEW_MATRIX,
		projectionMatrix: _Shader.Shader.PROJECTION_MATRIX,
		near: _Shader.Shader.NEAR_PLANE,
		diffuseMap: _Shader.Shader.DIFFUSE_MAP
	},
	vshader: ['attribute vec3 vertexPosition;', 'uniform mat3 normalMatrix;', 'uniform mat4 viewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform float near;', 'varying vec3 eyeVec;', 'void main(void) {', '	eyeVec = vertexPosition * normalMatrix * near * 10.0;', '	vec3 worldPos = mat3(viewMatrix) * eyeVec;', '	gl_Position = projectionMatrix * vec4(worldPos, 1.0);', '}'].join('\n'),
	fshader: ['uniform samplerCube diffuseMap;', 'varying vec3 eyeVec;', 'void main(void) {', '	vec4 cube = textureCube(diffuseMap, eyeVec);', '	if (cube.a < 0.05) discard;', '	gl_FragColor = cube;', '}'].join('\n')
};
shaders.sphere = {
	attributes: {
		vertexPosition: _MeshData.MeshData.POSITION,
		vertexUV0: _MeshData.MeshData.TEXCOORD0
	},
	uniforms: {
		normalMatrix: _Shader.Shader.NORMAL_MATRIX,
		viewMatrix: _Shader.Shader.VIEW_MATRIX,
		projectionMatrix: _Shader.Shader.PROJECTION_MATRIX,
		near: _Shader.Shader.NEAR_PLANE,
		diffuseMap: _Shader.Shader.DIFFUSE_MAP
	},
	vshader: ['attribute vec3 vertexPosition;', 'attribute vec2 vertexUV0;', 'uniform mat3 normalMatrix;', 'uniform mat4 viewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform float near;', 'varying vec2 texCoord0;', 'void main(void) {', '	texCoord0 = vertexUV0;', '	vec3 worldPos = mat3(viewMatrix) * normalMatrix * vertexPosition * near * 10.0;', '	gl_Position = projectionMatrix * vec4(worldPos, 1.0);', '}'].join('\n'),
	fshader: ['precision mediump float;', 'uniform sampler2D diffuseMap;', 'varying vec2 texCoord0;', 'void main(void)', '{', '	vec4 sphere = texture2D(diffuseMap, texCoord0);', '	if (sphere.a < 0.05) discard;', '	gl_FragColor = sphere;', '}'].join('\n')
};

var exported_Skybox = Skybox;

/**
 * Skybox
 * @param type
 * @param images
 * @param textureMode
 * @param yRotation
 */
exports.Skybox = exported_Skybox;
