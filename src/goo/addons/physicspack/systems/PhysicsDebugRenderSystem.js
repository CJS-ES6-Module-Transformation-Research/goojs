Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = PhysicsDebugRenderSystem;

var _EntitySelection = require("../../../entities/EntitySelection");

var _EntitySelection2 = _interopRequireDefault(_EntitySelection);

var _System = require("../../../entities/systems/System");

var _System2 = _interopRequireDefault(_System);

var _SystemBus = require("../../../entities/SystemBus");

var _SystemBus2 = _interopRequireDefault(_SystemBus);

var _PhysicsPlaneDebugShape = require("../../../addons/physicspack/shapes/PhysicsPlaneDebugShape");

var _PhysicsPlaneDebugShape2 = _interopRequireDefault(_PhysicsPlaneDebugShape);

var _PhysicsCylinderDebugShape = require("../../../addons/physicspack/shapes/PhysicsCylinderDebugShape");

var _PhysicsCylinderDebugShape2 = _interopRequireDefault(_PhysicsCylinderDebugShape);

var _PhysicsSphereDebugShape = require("../../../addons/physicspack/shapes/PhysicsSphereDebugShape");

var _PhysicsSphereDebugShape2 = _interopRequireDefault(_PhysicsSphereDebugShape);

var _PhysicsBoxDebugShape = require("../../../addons/physicspack/shapes/PhysicsBoxDebugShape");

var _PhysicsBoxDebugShape2 = _interopRequireDefault(_PhysicsBoxDebugShape);

var _SphereCollider = require("../../../addons/physicspack/colliders/SphereCollider");

var _SphereCollider2 = _interopRequireDefault(_SphereCollider);

var _BoxCollider = require("../../../addons/physicspack/colliders/BoxCollider");

var _BoxCollider2 = _interopRequireDefault(_BoxCollider);

var _CylinderCollider = require("../../../addons/physicspack/colliders/CylinderCollider");

var _CylinderCollider2 = _interopRequireDefault(_CylinderCollider);

var _PlaneCollider = require("../../../addons/physicspack/colliders/PlaneCollider");

var _PlaneCollider2 = _interopRequireDefault(_PlaneCollider);

var _MeshCollider = require("../../../addons/physicspack/colliders/MeshCollider");

var _MeshCollider2 = _interopRequireDefault(_MeshCollider);

var _Transform = require("../../../math/Transform");

var _Transform2 = _interopRequireDefault(_Transform);

var _Material = require("../../../renderer/Material");

var _Material2 = _interopRequireDefault(_Material);

var _ShaderLib = require("../../../renderer/shaders/ShaderLib");

var _ShaderLib2 = _interopRequireDefault(_ShaderLib);

var _Pool = require("../../../addons/physicspack/util/Pool");

var _Pool2 = _interopRequireDefault(_Pool);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Renders all ColliderComponents in the scene.
 * @extends System
 * @example
 * world.setSystem(new PhysicsDebugRenderSystem());
 */
function PhysicsDebugRenderSystem() {
	_System2.default.call(this, 'PhysicsDebugRenderSystem', ['TransformComponent']);

	this.priority = 3;

	this.renderList = [];
	this.camera = null;

	_SystemBus2.default.addListener('goo.setCurrentCamera', function (newCam) {
		this.camera = newCam.camera;
	}.bind(this));

	/**
  * If set to true, all entities with a ColliderComponent attached is rendered, and the selection is disregarded.
  * @type {boolean}
  */
	this.renderAll = true;

	/**
  * The selected entities to be rendered.
  * @type {EntitySelection}
  */
	this.selection = new _EntitySelection2.default();

	this.sphereMeshData = new _PhysicsSphereDebugShape2.default(32);
	this.boxMeshData = new _PhysicsBoxDebugShape2.default();
	this.cylinderMeshData = new _PhysicsCylinderDebugShape2.default(32);
	this.planeMeshData = new _PhysicsPlaneDebugShape2.default();

	this.material = new _Material2.default(_ShaderLib2.default.simpleColored);
	this.material.uniforms.color = [0, 1, 0];
	this.material.wireframe = true;
	this.renderablePool = new _Pool2.default({
		create: function create() {
			return {
				meshData: null,
				transform: new _Transform2.default(),
				materials: []
			};
		},
		init: function init(meshData, material) {
			this.meshData = meshData;
			this.materials[0] = material;
		},
		destroy: function destroy(renderable) {
			renderable.meshData = null;
			renderable.materials.length = 0;
		}
	});
}

PhysicsDebugRenderSystem.prototype = Object.create(_System2.default.prototype);
PhysicsDebugRenderSystem.prototype.constructor = PhysicsDebugRenderSystem;

/**
 * @private
 * @param  {array} entities
 */
PhysicsDebugRenderSystem.prototype.process = function (entities) {
	this.clear();

	if (this.passive) {
		return;
	}

	for (var i = 0, N = entities.length; i !== N; i++) {
		var entity = entities[i];

		if (!this.renderAll && !this.selection.contains(entity)) {
			// Render selection is enabled, but this entity is not a part of it
			continue;
		}

		// Colliders
		if (entity.colliderComponent) {
			entity.colliderComponent.updateWorldCollider();
			var collider = entity.colliderComponent.worldCollider;
			var meshData = this.getMeshData(collider);
			var renderable = this.renderablePool.get(meshData, this.material);

			this.getWorldTransform(entity, collider, renderable.transform);
			renderable.transform.update();

			this.renderList.push(renderable);
		}

		// TODO: Joints
	}
};

/**
 * Get the world transform of the debug rendering mesh data from a collider.
 * @private
 * @param  {Entity} colliderEntity
 * @param  {Collider} collider
 * @param  {Transform} targetTransform
 */
PhysicsDebugRenderSystem.prototype.getWorldTransform = function (colliderEntity, collider, targetTransform) {
	targetTransform.copy(colliderEntity.transformComponent.sync().worldTransform);

	if (collider instanceof _SphereCollider2.default) {
		var scale = collider.radius;
		targetTransform.scale.set(scale, scale, scale);
	} else if (collider instanceof _BoxCollider2.default) {
		targetTransform.scale.copy(collider.halfExtents).scale(2);
	} else if (collider instanceof _CylinderCollider2.default) {
		targetTransform.scale.set(collider.radius, collider.radius, collider.height);
	} else if (collider instanceof _PlaneCollider2.default) {
		targetTransform.scale.set(1, 1, 1);
	} else if (collider instanceof _MeshCollider2.default) {
		targetTransform.scale.set(collider.scale);
	}
};

/**
 * Get mesh data to use for debug rendering.
 * @private
 * @param  {Collider} collider
 * @returns {MeshData}
 */
PhysicsDebugRenderSystem.prototype.getMeshData = function (collider) {
	var meshData;
	if (collider instanceof _SphereCollider2.default) {
		meshData = this.sphereMeshData;
	} else if (collider instanceof _BoxCollider2.default) {
		meshData = this.boxMeshData;
	} else if (collider instanceof _CylinderCollider2.default) {
		meshData = this.cylinderMeshData;
	} else if (collider instanceof _PlaneCollider2.default) {
		meshData = this.planeMeshData;
	} else if (collider instanceof _MeshCollider2.default) {
		meshData = collider.meshData;
	}
	return meshData;
};

/**
 * @private
 * @param  {Renderer} renderer
 */
PhysicsDebugRenderSystem.prototype.render = function (renderer) {
	renderer.checkResize(this.camera);
	if (this.camera) {
		renderer.render(this.renderList, this.camera, null, null, false);
	}
};

/**
 * Release all previous renderables in the renderList
 * @private
 */
PhysicsDebugRenderSystem.prototype.clear = function () {
	for (var i = 0, N = this.renderList.length; i !== N; i++) {
		this.renderablePool.release(this.renderList[i]);
	}
	this.renderList.length = 0;
};

/**
 * @private
 */
PhysicsDebugRenderSystem.prototype.cleanup = function () {
	this.clear();
};
module.exports = exports.default;
