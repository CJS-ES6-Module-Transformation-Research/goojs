Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Vegetation;

var _MeshDataComponent = require("../../entities/components/MeshDataComponent");

var _MeshDataComponent2 = _interopRequireDefault(_MeshDataComponent);

var _Material = require("../../renderer/Material");

var _Material2 = _interopRequireDefault(_Material);

var _MathUtils = require("../../math/MathUtils");

var _MathUtils2 = _interopRequireDefault(_MathUtils);

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

var _Transform = require("../../math/Transform");

var _Transform2 = _interopRequireDefault(_Transform);

var _MeshData = require("../../renderer/MeshData");

var _MeshData2 = _interopRequireDefault(_MeshData);

var _Shader = require("../../renderer/Shader");

var _Shader2 = _interopRequireDefault(_Shader);

var _MeshBuilder = require("../../util/MeshBuilder");

var _MeshBuilder2 = _interopRequireDefault(_MeshBuilder);

var _Quad = require("../../shapes/Quad");

var _Quad2 = _interopRequireDefault(_Quad);

var _ShaderBuilder = require("../../renderer/shaders/ShaderBuilder");

var _ShaderBuilder2 = _interopRequireDefault(_ShaderBuilder);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function Vegetation() {
	this.calcVec = new _Vector2.default();
	this.initDone = false;
}

Vegetation.prototype.init = function (world, terrainQuery, vegetationAtlasTexture, vegetationTypes, settings) {
	this.world = world;
	this.terrainQuery = terrainQuery;

	this.vegetationList = {};
	for (var type in vegetationTypes) {
		var typeSettings = vegetationTypes[type];
		var meshData = this.createBase(typeSettings);
		this.vegetationList[type] = meshData;
	}

	var material = new _Material2.default(vegetationShader, 'vegetation');
	material.setTexture('DIFFUSE_MAP', vegetationAtlasTexture);
	material.cullState.enabled = false;
	material.uniforms.discardThreshold = 0.2;
	material.blendState.blending = 'CustomBlending';
	// material.uniforms.materialAmbient = [0.3, 0.3, 0.3, 0.3];
	material.uniforms.materialAmbient = [0, 0, 0, 0];
	material.uniforms.materialDiffuse = [1, 1, 1, 1];
	material.uniforms.materialSpecular = [0, 0, 0, 0];
	material.renderQueue = 3001;
	this.material = material;

	this.patchSize = 15;
	this.patchDensity = 19;
	this.gridSize = 7;

	if (settings) {
		this.patchSize = settings.patchSize || this.patchSize;
		this.patchDensity = settings.patchDensity || this.patchDensity;
		this.gridSize = settings.gridSize || this.gridSize;
	}

	this.patchSpacing = this.patchSize / this.patchDensity;
	this.gridSizeHalf = Math.floor(this.gridSize * 0.5);
	this.grid = [];
	var dummyMesh = this.createPatch(0, 0);
	for (var x = 0; x < this.gridSize; x++) {
		this.grid[x] = [];
		for (var z = 0; z < this.gridSize; z++) {
			var entity = this.world.createEntity(this.material);
			var meshDataComponent = new _MeshDataComponent2.default(dummyMesh);
			meshDataComponent.modelBound.xExtent = this.patchSize;
			meshDataComponent.modelBound.yExtent = 500;
			meshDataComponent.modelBound.zExtent = this.patchSize;
			meshDataComponent.modelBoundDirty = false;
			entity.set(meshDataComponent);
			entity.addToWorld();
			this.grid[x][z] = entity;
			entity.meshRendererComponent.cullMode = 'Never';
			entity.meshRendererComponent.hidden = true;
		}
	}

	material.uniforms.fadeDistMax = this.gridSizeHalf * this.patchSize;
	material.uniforms.fadeDistMin = 0.70 * material.uniforms.fadeDistMax;

	this.currentX = -10000;
	this.currentZ = -10000;

	this.initDone = true;
};

Vegetation.prototype.rebuild = function () {
	this.currentX = -10000;
	this.currentZ = -10000;
};

var hidden = false;
Vegetation.prototype.toggle = function () {
	hidden = !hidden;
	for (var x = 0; x < this.gridSize; x++) {
		for (var z = 0; z < this.gridSize; z++) {
			var entity = this.grid[x][z];
			entity.skip = hidden;
		}
	}
	if (!hidden) {
		this.rebuild();
	}
};

Vegetation.prototype.update = function (x, z) {
	if (!this.initDone || hidden) {
		return;
	}

	var newX = Math.floor(x / this.patchSize);
	var newZ = Math.floor(z / this.patchSize);

	if (this.currentX === newX && this.currentZ === newZ) {
		return;
	}

	// console.time('vegetation update');

	for (var x = 0; x < this.gridSize; x++) {
		for (var z = 0; z < this.gridSize; z++) {
			var patchX = newX + x;
			var patchZ = newZ + z;

			var diffX = patchX - this.currentX;
			var diffZ = patchZ - this.currentZ;
			if (diffX >= 0 && diffX < this.gridSize && diffZ >= 0 && diffZ < this.gridSize) {
				continue;
			}

			patchX -= this.gridSizeHalf;
			patchZ -= this.gridSizeHalf;
			var modX = _MathUtils2.default.moduloPositive(patchX, this.gridSize);
			var modZ = _MathUtils2.default.moduloPositive(patchZ, this.gridSize);

			patchX *= this.patchSize;
			patchZ *= this.patchSize;

			var entity = this.grid[modX][modZ];
			var meshData = this.createPatch(patchX, patchZ);
			if (!meshData) {
				entity.meshRendererComponent.hidden = true;
			} else {
				entity.meshRendererComponent.hidden = false;
				entity.meshDataComponent.meshData = meshData;
				entity.meshRendererComponent.worldBound.center.setDirect(patchX + this.patchSize * 0.5, 0, patchZ + this.patchSize * 0.5);
			}
		}
	}

	this.currentX = newX;
	this.currentZ = newZ;

	// console.timeEnd('vegetation update');
};

Vegetation.prototype.createPatch = function (patchX, patchZ) {
	var meshBuilder = new _MeshBuilder2.default();
	var transform = new _Transform2.default();

	var patchDensity = this.patchDensity;
	var patchSpacing = this.patchSpacing;
	var pos = [0, 10, 0];
	for (var x = 0; x < patchDensity; x++) {
		for (var z = 0; z < patchDensity; z++) {
			var xx = patchX + (x + Math.random() * 0.5) * patchSpacing;
			var zz = patchZ + (z + Math.random() * 0.5) * patchSpacing;
			pos[0] = xx;
			pos[2] = zz + 0.5;
			var yy = this.terrainQuery.getHeightAt(pos);
			var norm = this.terrainQuery.getNormalAt(pos);
			if (yy === null) {
				yy = 0;
			}
			if (norm === null) {
				norm = _Vector2.default.UNIT_Y;
			}
			var slope = norm.dot(_Vector2.default.UNIT_Y);

			var vegetationType = this.terrainQuery.getVegetationType(xx, zz, slope);
			if (!vegetationType) {
				continue;
			}

			var size = Math.random() * 0.4 + 0.8;
			transform.scale.setDirect(size, size, size);
			transform.translation.setDirect(0, 0, 0);
			var angle = Math.random() * Math.PI * 2.0;
			var anglex = Math.sin(angle);
			var anglez = Math.cos(angle);
			this.calcVec.setDirect(anglex, 0.0, anglez);
			// norm.y = 0.5;
			// norm.normalize();
			this.lookAt(transform.rotation, this.calcVec, norm);
			transform.translation.setDirect(xx, yy, zz);
			transform.update();

			var meshData = this.vegetationList[vegetationType];
			meshBuilder.addMeshData(meshData, transform);

			// console.count('grass');
		}
	}
	var meshDatas = meshBuilder.build();

	// Calculate lighting from lightmap
	for (var i = 0; i < meshDatas.length; i++) {
		var meshData = meshDatas[i];
		var verts = meshData.getAttributeBuffer(_MeshData2.default.POSITION);
		var cols = meshData.getAttributeBuffer(_MeshData2.default.COLOR);
		for (var i = 0, j = 0; i < verts.length; i += 3, j += 4) {
			var col = this.terrainQuery.getLightAt([verts[i], verts[i + 1], verts[i + 2]]);
			cols[j] = col;
			cols[j + 1] = col;
			cols[j + 2] = col;
			cols[j + 3] = 1;
		}
	}

	return meshDatas[0]; // Don't create patches bigger than 65k
};

var _tempX = new _Vector2.default();
var _tempY = new _Vector2.default();
var _tempZ = new _Vector2.default();

Vegetation.prototype.lookAt = function (matrix, direction, up) {
	var x = _tempX,
	    y = _tempY,
	    z = _tempZ;

	y.set(up).normalize();
	x.set(up).cross(direction).normalize();
	z.set(y).cross(x);

	var d = matrix.data;
	d[0] = x.x;
	d[1] = x.y;
	d[2] = x.z;
	d[3] = y.x;
	d[4] = y.y;
	d[5] = y.z;
	d[6] = z.x;
	d[7] = z.y;
	d[8] = z.z;

	return this;
};

Vegetation.prototype.createBase = function (type) {
	var meshData = new _Quad2.default(type.w, type.h, 10, 10);
	meshData.attributeMap.BASE = _MeshData2.default.createAttribute(1, 'Float');
	meshData.attributeMap.COLOR = _MeshData2.default.createAttribute(4, 'Float');

	meshData.rebuildData(meshData.vertexCount, meshData.indexCount, true);

	meshData.getAttributeBuffer(_MeshData2.default.NORMAL).set([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]);
	meshData.getAttributeBuffer(_MeshData2.default.TEXCOORD0).set([type.tx, type.ty, type.tx, type.ty + type.th, type.tx + type.tw, type.ty + type.th, type.tx + type.tw, type.ty]);

	meshData.getAttributeBuffer('BASE').set([0, type.h, type.h, 0]);

	meshData.getAttributeBuffer(_MeshData2.default.COLOR).set([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);

	var meshBuilder = new _MeshBuilder2.default();
	var transform = new _Transform2.default();
	transform.translation.y = type.h * 0.5 - type.h * 0.1;
	transform.translation.z = -type.w * 0.1;
	transform.update();

	meshBuilder.addMeshData(meshData, transform);

	// transform.setRotationXYZ(0, Math.PI * 0.5, 0);
	transform.setRotationXYZ(0, Math.PI * 0.3, 0);
	transform.translation.x = type.w * 0.1;
	transform.translation.z = type.w * 0.1;
	transform.update();

	meshBuilder.addMeshData(meshData, transform);

	transform.setRotationXYZ(0, -Math.PI * 0.3, 0);
	transform.translation.x = -type.w * 0.1;
	transform.translation.z = type.w * 0.1;
	transform.update();

	meshBuilder.addMeshData(meshData, transform);

	var meshDatas = meshBuilder.build();

	return meshDatas[0];
};

var vegetationShader = {
	processors: [_ShaderBuilder2.default.light.processor, function (shader) {
		if (_ShaderBuilder2.default.USE_FOG) {
			shader.setDefine('FOG', true);
			shader.uniforms.fogSettings = _ShaderBuilder2.default.FOG_SETTINGS;
			shader.uniforms.fogColor = _ShaderBuilder2.default.FOG_COLOR;
		} else {
			shader.removeDefine('FOG');
		}
	}],
	attributes: {
		vertexPosition: _MeshData2.default.POSITION,
		vertexNormal: _MeshData2.default.NORMAL,
		vertexUV0: _MeshData2.default.TEXCOORD0,
		vertexColor: _MeshData2.default.COLOR,
		base: 'BASE'
	},
	uniforms: {
		viewProjectionMatrix: _Shader2.default.VIEW_PROJECTION_MATRIX,
		worldMatrix: _Shader2.default.WORLD_MATRIX,
		cameraPosition: _Shader2.default.CAMERA,
		diffuseMap: _Shader2.default.DIFFUSE_MAP,
		discardThreshold: -0.01,
		fogSettings: function fogSettings() {
			return _ShaderBuilder2.default.FOG_SETTINGS;
		},
		fogColor: function fogColor() {
			return _ShaderBuilder2.default.FOG_COLOR;
		},
		time: _Shader2.default.TIME,
		fadeDistMin: 40.0,
		fadeDistMax: 50.0
	},
	builder: function builder(shader, shaderInfo) {
		_ShaderBuilder2.default.light.builder(shader, shaderInfo);
	},
	vshader: function vshader() {
		return ['attribute vec3 vertexPosition;', 'attribute vec3 vertexNormal;', 'attribute vec2 vertexUV0;', 'attribute vec4 vertexColor;', 'attribute float base;', 'uniform mat4 viewProjectionMatrix;', 'uniform mat4 worldMatrix;', 'uniform vec3 cameraPosition;', 'uniform float time;', 'uniform float fadeDistMin;', 'uniform float fadeDistMax;', _ShaderBuilder2.default.light.prevertex, 'varying vec3 normal;', 'varying vec3 vWorldPos;', 'varying vec3 viewPosition;', 'varying vec2 texCoord0;', 'varying vec4 color;', 'varying float dist;', 'void main(void) {', 'vec3 swayPos = vertexPosition;', 'swayPos.x += sin(time * 1.0 + swayPos.x * 0.5) * base * sin(time * 1.8 + swayPos.y * 0.6) * 0.1 + 0.08;', 'vec4 worldPos = worldMatrix * vec4(swayPos, 1.0);', 'vWorldPos = worldPos.xyz;', 'gl_Position = viewProjectionMatrix * worldPos;', _ShaderBuilder2.default.light.vertex, 'normal = (worldMatrix * vec4(vertexNormal, 0.0)).xyz;', 'texCoord0 = vertexUV0;', 'color = vertexColor;', 'viewPosition = cameraPosition - worldPos.xyz;', 'dist = 1.0 - smoothstep(fadeDistMin, fadeDistMax, length(viewPosition.xz));', '}'].join('\n');
	},
	fshader: function fshader() {
		return ['uniform sampler2D diffuseMap;', 'uniform float discardThreshold;', 'uniform vec2 fogSettings;', 'uniform vec3 fogColor;', _ShaderBuilder2.default.light.prefragment, 'varying vec3 normal;', 'varying vec3 vWorldPos;', 'varying vec3 viewPosition;', 'varying vec2 texCoord0;', 'varying float dist;', 'varying vec4 color;', 'void main(void)', '{', 'vec4 final_color = texture2D(diffuseMap, texCoord0) * color;', 'if (final_color.a < discardThreshold) discard;', 'final_color.a = min(final_color.a, dist);', 'if (final_color.a <= 0.0) discard;', 'vec3 N = normalize(normal);', _ShaderBuilder2.default.light.fragment, 'final_color.a = pow(final_color.a, 0.5);', '#ifdef FOG', 'float d = pow(smoothstep(fogSettings.x, fogSettings.y, length(viewPosition)), 1.0);', 'final_color.rgb = mix(final_color.rgb, fogColor, d);', '#endif', 'gl_FragColor = final_color;', '}'].join('\n');
	}
};
module.exports = exports.default;
