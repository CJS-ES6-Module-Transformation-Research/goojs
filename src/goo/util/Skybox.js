Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Skybox;

var _Box = require("../shapes/Box");

var _Box2 = _interopRequireDefault(_Box);

var _Sphere = require("../shapes/Sphere");

var _Sphere2 = _interopRequireDefault(_Sphere);

var _MeshData = require("../renderer/MeshData");

var _MeshData2 = _interopRequireDefault(_MeshData);

var _Material = require("../renderer/Material");

var _Material2 = _interopRequireDefault(_Material);

var _Shader = require("../renderer/Shader");

var _Shader2 = _interopRequireDefault(_Shader);

var _TextureCreator = require("../renderer/TextureCreator");

var _TextureCreator2 = _interopRequireDefault(_TextureCreator);

var _Transform = require("../math/Transform");

var _Transform2 = _interopRequireDefault(_Transform);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Skybox
 * @param type
 * @param images
 * @param textureMode
 * @param yRotation
 */
function Skybox(type, images, textureMode, yRotation) {
	var promise;
	if (type === Skybox.SPHERE) {
		this.meshData = new _Sphere2.default(16, 32, 1, textureMode || _Sphere2.default.TextureModes.Projected);
		if (images instanceof Array) {
			images = images[0];
		}
		if (images) {
			promise = new _TextureCreator2.default().loadTexture2D(images);
		}
	} else if (type === Skybox.BOX) {
		this.meshData = new _Box2.default(1, 1, 1);
		if (images.length) {
			promise = new _TextureCreator2.default().loadTextureCube(images, {
				flipY: false,
				wrapS: 'EdgeClamp',
				wrapT: 'EdgeClamp'
			});
		}
	} else {
		throw new Error('Unknown geometry type');
	}

	var material = new _Material2.default(shaders[type], 'Skybox material');
	material.cullState.cullFace = 'Front';
	material.depthState.enabled = false;
	material.renderQueue = 1;
	if (promise) {
		promise.then(function (texture) {
			material.setTexture(_Shader2.default.DIFFUSE_MAP, texture);
		});
	}

	this.materials = [material];

	this.transform = new _Transform2.default();
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
		vertexPosition: _MeshData2.default.POSITION
	},
	uniforms: {
		normalMatrix: _Shader2.default.NORMAL_MATRIX,
		viewMatrix: _Shader2.default.VIEW_MATRIX,
		projectionMatrix: _Shader2.default.PROJECTION_MATRIX,
		near: _Shader2.default.NEAR_PLANE,
		diffuseMap: _Shader2.default.DIFFUSE_MAP
	},
	vshader: ['attribute vec3 vertexPosition;', 'uniform mat3 normalMatrix;', 'uniform mat4 viewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform float near;', 'varying vec3 eyeVec;', 'void main(void) {', '	eyeVec = vertexPosition * normalMatrix * near * 10.0;', '	vec3 worldPos = mat3(viewMatrix) * eyeVec;', '	gl_Position = projectionMatrix * vec4(worldPos, 1.0);', '}'].join('\n'),
	fshader: ['uniform samplerCube diffuseMap;', 'varying vec3 eyeVec;', 'void main(void) {', '	vec4 cube = textureCube(diffuseMap, eyeVec);', '	if (cube.a < 0.05) discard;', '	gl_FragColor = cube;', '}'].join('\n')
};
shaders.sphere = {
	attributes: {
		vertexPosition: _MeshData2.default.POSITION,
		vertexUV0: _MeshData2.default.TEXCOORD0
	},
	uniforms: {
		normalMatrix: _Shader2.default.NORMAL_MATRIX,
		viewMatrix: _Shader2.default.VIEW_MATRIX,
		projectionMatrix: _Shader2.default.PROJECTION_MATRIX,
		near: _Shader2.default.NEAR_PLANE,
		diffuseMap: _Shader2.default.DIFFUSE_MAP
	},
	vshader: ['attribute vec3 vertexPosition;', 'attribute vec2 vertexUV0;', 'uniform mat3 normalMatrix;', 'uniform mat4 viewMatrix;', 'uniform mat4 projectionMatrix;', 'uniform float near;', 'varying vec2 texCoord0;', 'void main(void) {', '	texCoord0 = vertexUV0;', '	vec3 worldPos = mat3(viewMatrix) * normalMatrix * vertexPosition * near * 10.0;', '	gl_Position = projectionMatrix * vec4(worldPos, 1.0);', '}'].join('\n'),
	fshader: ['precision mediump float;', 'uniform sampler2D diffuseMap;', 'varying vec2 texCoord0;', 'void main(void)', '{', '	vec4 sphere = texture2D(diffuseMap, texCoord0);', '	if (sphere.a < 0.05) discard;', '	gl_FragColor = sphere;', '}'].join('\n')
};
module.exports = exports.default;
