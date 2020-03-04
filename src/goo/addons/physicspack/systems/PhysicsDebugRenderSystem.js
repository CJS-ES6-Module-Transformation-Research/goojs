import { EntitySelection as EntitySelectionjs } from "../../../entities/EntitySelection";
import { System as Systemjs } from "../../../entities/systems/System";
import { PhysicsPlaneDebugShape as PhysicsPlaneDebugShapejs } from "../../../addons/physicspack/shapes/PhysicsPlaneDebugShape";
import { PhysicsCylinderDebugShape as PhysicsCylinderDebugShapejs } from "../../../addons/physicspack/shapes/PhysicsCylinderDebugShape";
import { PhysicsSphereDebugShape as PhysicsSphereDebugShapejs } from "../../../addons/physicspack/shapes/PhysicsSphereDebugShape";
import { PhysicsBoxDebugShape as PhysicsBoxDebugShapejs } from "../../../addons/physicspack/shapes/PhysicsBoxDebugShape";
import { SphereCollider as SphereColliderjs } from "../../../addons/physicspack/colliders/SphereCollider";
import { BoxCollider as BoxColliderjs } from "../../../addons/physicspack/colliders/BoxCollider";
import { CylinderCollider as CylinderColliderjs } from "../../../addons/physicspack/colliders/CylinderCollider";
import { PlaneCollider as PlaneColliderjs } from "../../../addons/physicspack/colliders/PlaneCollider";
import { MeshCollider as MeshColliderjs } from "../../../addons/physicspack/colliders/MeshCollider";
import { Transform as Transformjs } from "../../../math/Transform";
import { Material as Materialjs } from "../../../renderer/Material";
import { ShaderLib as ShaderLibjs } from "../../../renderer/shaders/ShaderLib";
import { Pool as Pool_Pooljs } from "../../../addons/physicspack/util/Pool";
function PhysicsDebugRenderSystem() {
	Systemjs.call(this, 'PhysicsDebugRenderSystem', ['TransformComponent']);

	this.priority = 3;

	this.renderList = [];
	this.camera = null;

	SystemBus.addListener('goo.setCurrentCamera', function (newCam) {
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
	this.selection = new EntitySelectionjs();

	this.sphereMeshData = new PhysicsSphereDebugShapejs(32);
	this.boxMeshData = new PhysicsBoxDebugShapejs();
	this.cylinderMeshData = new PhysicsCylinderDebugShapejs(32);
	this.planeMeshData = new PhysicsPlaneDebugShapejs();

	this.material = new Materialjs(ShaderLibjs.simpleColored);
	this.material.uniforms.color = [0, 1, 0];
	this.material.wireframe = true;
	this.renderablePool = new Pool_Pooljs({
		create: function () {
			return {
				meshData: null,
				transform: new Transformjs(),
				materials: []
			};
		},
		init: function (meshData, material) {
			this.meshData = meshData;
			this.materials[0] = material;
		},
		destroy: function (renderable) {
			renderable.meshData = null;
			renderable.materials.length = 0;
		}
	});
}
PhysicsDebugRenderSystem.prototype = Object.create(Systemjs.prototype);
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

	if (collider instanceof SphereColliderjs) {
		var scale = collider.radius;
		targetTransform.scale.set(scale, scale, scale);
	} else if (collider instanceof BoxColliderjs) {
		targetTransform.scale.copy(collider.halfExtents).scale(2);
	} else if (collider instanceof CylinderColliderjs) {
		targetTransform.scale.set(collider.radius, collider.radius, collider.height);
	} else if (collider instanceof PlaneColliderjs) {
		targetTransform.scale.set(1, 1, 1);
	} else if (collider instanceof MeshColliderjs) {
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
	if (collider instanceof SphereColliderjs) {
		meshData = this.sphereMeshData;
	} else if (collider instanceof BoxColliderjs) {
		meshData = this.boxMeshData;
	} else if (collider instanceof CylinderColliderjs) {
		meshData = this.cylinderMeshData;
	} else if (collider instanceof PlaneColliderjs) {
		meshData = this.planeMeshData;
	} else if (collider instanceof MeshColliderjs) {
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

var exported_PhysicsDebugRenderSystem = PhysicsDebugRenderSystem;

/**
 * Renders all ColliderComponents in the scene.
 * @extends System
 * @example
 * world.setSystem(new PhysicsDebugRenderSystem());
 */
export { exported_PhysicsDebugRenderSystem as PhysicsDebugRenderSystem };