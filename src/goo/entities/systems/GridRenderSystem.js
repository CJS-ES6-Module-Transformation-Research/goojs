Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = GridRenderSystem;

var _System = require("../../entities/systems/System");

var _System2 = _interopRequireDefault(_System);

var _SystemBus = require("../../entities/SystemBus");

var _SystemBus2 = _interopRequireDefault(_SystemBus);

var _MeshData = require("../../renderer/MeshData");

var _MeshData2 = _interopRequireDefault(_MeshData);

var _Material = require("../../renderer/Material");

var _Material2 = _interopRequireDefault(_Material);

var _Shader = require("../../renderer/Shader");

var _Shader2 = _interopRequireDefault(_Shader);

var _Transform = require("../../math/Transform");

var _Transform2 = _interopRequireDefault(_Transform);

var _Grid = require("../../shapes/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Renders entities/renderables using a configurable partitioner for culling
 * @property {boolean} doRender Only render if set to true
 * @extends System
 */
function GridRenderSystem() {
	_System2.default.call(this, 'GridRenderSystem', []);

	this.renderList = [];
	this.doRender = {
		grid: true
	};

	this.scale = 62.5;
	this.count = 100;

	this.camera = null;
	this.lights = [];
	this.transform1 = new _Transform2.default();
	this.transform1.rotation.rotateX(-Math.PI / 2);
	this.transform1.scale.setDirect(this.scale, this.scale, this.scale);
	this.transform1.update();

	this.transform2 = new _Transform2.default();
	this.transform2.rotation.rotateX(-Math.PI / 2);
	this.transform2.scale.setDirect(this.scale, this.scale, this.scale);
	this.transform2.update();

	var col = 0.2;
	var gridMaterial1 = new _Material2.default(gridShaderDef, 'Grid Material');
	gridMaterial1.blendState.blending = 'TransparencyBlending';
	gridMaterial1.uniforms.color = [col, col, col, 1];
	gridMaterial1.depthState.write = false;
	gridMaterial1.depthState.enabled = true;
	var gridMaterial2 = new _Material2.default(gridShaderDef, 'Grid Material');
	gridMaterial2.blendState.blending = 'TransparencyBlending';
	gridMaterial2.uniforms.color = [col, col, col, 1];
	gridMaterial2.depthState.write = false;
	gridMaterial2.depthState.enabled = true;

	var gridMesh = new _Grid2.default(this.count, this.count);
	this.grid1 = {
		meshData: gridMesh,
		materials: [gridMaterial1],
		transform: this.transform1
	};
	this.grid2 = {
		meshData: gridMesh,
		materials: [gridMaterial2],
		transform: this.transform2
	};

	this.oldHeightScale1 = 0;
	this.oldX1 = 0;
	this.oldZ1 = 0;
	this.oldHeightScale1 = 0;
	this.oldX1 = 0;
	this.oldZ1 = 0;

	// stop using this pattern - use instead .bind()
	var that = this;
	_SystemBus2.default.addListener('goo.setCurrentCamera', function (newCam) {
		that.camera = newCam.camera;
	});

	_SystemBus2.default.addListener('goo.setLights', function (lights) {
		that.lights = lights;
	});
}

GridRenderSystem.prototype = Object.create(_System2.default.prototype);
GridRenderSystem.prototype.constructor = GridRenderSystem;

GridRenderSystem.prototype.inserted = function () /*entity*/{};

GridRenderSystem.prototype.deleted = function () /*entity*/{};

function smoothstep(t, level) {
	for (var i = 0; i < level; ++i) {
		t = Math.pow(t, 2) * (3 - 2 * t);
	}
	return t;
}

GridRenderSystem.prototype.process = function () /*entities, tpf*/{
	if (!this.doRender.grid) {
		return;
	}

	var y = Math.max(Math.abs(this.camera.translation.y) / 10, 0);

	var y1 = Math.pow(y, 0.15);
	var blender1 = 1 - Math.abs(y1 - Math.floor(y1) - 0.5) * 2;
	blender1 = Math.min(blender1 * 2, 1);
	var heightScale1 = Math.pow(2, Math.floor(y1) * 4 + 2) * this.scale;

	var y2 = Math.pow(y, 0.15) + 0.5;
	var blender2 = 1 - Math.abs(y2 - Math.floor(y2) - 0.5) * 2;
	blender2 = Math.min(blender2 * 2, 1);
	var heightScale2 = Math.pow(2, Math.floor(y2) * 4) * this.scale;

	blender1 = smoothstep(blender1, 1);
	blender2 = smoothstep(blender2, 1);

	this.grid1.materials[0].uniforms.scale = heightScale1;
	this.grid1.materials[0].uniforms.opacity = blender1;

	this.grid2.materials[0].uniforms.scale = heightScale2;
	this.grid2.materials[0].uniforms.opacity = blender2;

	var x = Math.floor(this.camera.translation.x * this.count / heightScale1);
	var z = Math.floor(this.camera.translation.z * this.count / heightScale1);
	if (heightScale1 !== this.oldHeightScale1 || x !== this.oldX1 || z !== this.oldZ1) {
		this.transform1.scale.setDirect(heightScale1, heightScale1, heightScale1);
		this.transform1.translation.x = x * heightScale1 / this.count;
		this.transform1.translation.z = z * heightScale1 / this.count;
		this.transform1.update();

		this.oldX1 = x;
		this.oldZ1 = z;
		this.oldHeightScale1 = heightScale1;
	}

	x = Math.floor(this.camera.translation.x * this.count / heightScale2);
	z = Math.floor(this.camera.translation.z * this.count / heightScale2);
	if (heightScale2 !== this.oldHeightScale2 || x !== this.oldX2 || z !== this.oldZ2) {
		this.transform2.scale.setDirect(heightScale2, heightScale2, heightScale2);
		this.transform2.translation.x = x * heightScale2 / this.count;
		this.transform2.translation.z = z * heightScale2 / this.count;
		this.transform2.update();

		this.oldX2 = x;
		this.oldZ2 = z;
		this.oldHeightScale2 = heightScale2;
	}

	if (blender1 > blender2) {
		this.renderList[0] = this.grid1;
		this.renderList[1] = this.grid2;
	} else {
		this.renderList[0] = this.grid2;
		this.renderList[1] = this.grid1;
	}
};

GridRenderSystem.prototype.render = function (renderer /*, picking*/) {
	renderer.checkResize(this.camera);

	if (this.camera && this.doRender.grid) {
		renderer.render(this.renderList, this.camera, this.lights, null, false);
	}
};

GridRenderSystem.prototype.invalidateHandles = function (renderer) {
	this.renderList.forEach(function (renderable) {
		renderable.materials.forEach(function (material) {
			renderer.invalidateMaterial(material);
		});
		renderer.invalidateMeshData(renderable.meshData);
	});
};

var gridShaderDef = {
	attributes: {
		vertexPosition: _MeshData2.default.POSITION
	},
	uniforms: {
		viewMatrix: _Shader2.default.VIEW_MATRIX,
		projectionMatrix: _Shader2.default.PROJECTION_MATRIX,
		worldMatrix: _Shader2.default.WORLD_MATRIX,
		color: [0.55, 0.55, 0.55, 1],
		fogNear: _Shader2.default.NEAR_PLANE,
		fogFar: _Shader2.default.FAR_PLANE,
		opacity: 1,
		scale: 1
	},
	vshader: ['attribute vec3 vertexPosition;', 'uniform mat4 worldMatrix;', 'uniform mat4 viewMatrix;', 'uniform mat4 projectionMatrix;', 'varying float depth;', 'void main(void) {', 'vec4 viewPosition = viewMatrix * worldMatrix * vec4(vertexPosition, 1.0);', 'depth = -viewPosition.z;', 'gl_Position = projectionMatrix * viewPosition;', '}'].join('\n'),
	fshader: ['precision mediump float;', 'uniform vec4 color;', 'uniform float fogNear;', 'uniform float fogFar;', 'uniform float opacity;', 'uniform float scale;', 'varying float depth;', 'void main(void) {', 'gl_FragColor = color;', 'float lerpVal = 1.0 - clamp(depth * 3.0 / min(scale, fogFar * 3.0), 0.0, 1.0);', 'gl_FragColor.a = opacity * lerpVal;', '}'].join('\n')
};
module.exports = exports.default;
