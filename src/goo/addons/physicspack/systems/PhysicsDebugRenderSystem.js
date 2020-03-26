import { EntitySelection as entitiesEntitySelection_EntitySelectionjs } from "../../../entities/EntitySelection";
import { System as entitiessystemsSystem_Systemjs } from "../../../entities/systems/System";
import { SystemBusjs as entitiesSystemBus_SystemBusjsjs } from "../../../entities/SystemBus";
import {     PhysicsPlaneDebugShape as addonsphysicspackshapesPhysicsPlaneDebugShape_PhysicsPlaneDebugShapejs, } from "../../../addons/physicspack/shapes/PhysicsPlaneDebugShape";
import {     PhysicsCylinderDebugShape as addonsphysicspackshapesPhysicsCylinderDebugShape_PhysicsCylinderDebugShapejs, } from "../../../addons/physicspack/shapes/PhysicsCylinderDebugShape";
import {     PhysicsSphereDebugShape as addonsphysicspackshapesPhysicsSphereDebugShape_PhysicsSphereDebugShapejs, } from "../../../addons/physicspack/shapes/PhysicsSphereDebugShape";
import {     PhysicsBoxDebugShape as addonsphysicspackshapesPhysicsBoxDebugShape_PhysicsBoxDebugShapejs, } from "../../../addons/physicspack/shapes/PhysicsBoxDebugShape";
import {     SphereCollider as addonsphysicspackcollidersSphereCollider_SphereColliderjs, } from "../../../addons/physicspack/colliders/SphereCollider";
import { BoxCollider as addonsphysicspackcollidersBoxCollider_BoxColliderjs } from "../../../addons/physicspack/colliders/BoxCollider";
import {     CylinderCollider as addonsphysicspackcollidersCylinderCollider_CylinderColliderjs, } from "../../../addons/physicspack/colliders/CylinderCollider";
import { PlaneCollider as addonsphysicspackcollidersPlaneCollider_PlaneColliderjs } from "../../../addons/physicspack/colliders/PlaneCollider";
import { MeshCollider as addonsphysicspackcollidersMeshCollider_MeshColliderjs } from "../../../addons/physicspack/colliders/MeshCollider";
import { Transform as mathTransform_Transformjs } from "../../../math/Transform";
import { Material as rendererMaterial_Materialjs } from "../../../renderer/Material";
import { ShaderLib as renderershadersShaderLib_ShaderLibjs } from "../../../renderer/shaders/ShaderLib";
import { Pool as addonsphysicspackutilPool_Pooljs } from "../../../addons/physicspack/util/Pool";
function PhysicsDebugRenderSystem() {
	entitiessystemsSystem_Systemjs.call(this, 'PhysicsDebugRenderSystem', ['TransformComponent']);

	this.priority = 3;

	this.renderList = [];
	this.camera = null;

	entitiesSystemBus_SystemBusjsjs.addListener('goo.setCurrentCamera', function (newCam) {
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
	this.selection = new entitiesEntitySelection_EntitySelectionjs();

	this.sphereMeshData = new addonsphysicspackshapesPhysicsSphereDebugShape_PhysicsSphereDebugShapejs(32);
	this.boxMeshData = new addonsphysicspackshapesPhysicsBoxDebugShape_PhysicsBoxDebugShapejs();
	this.cylinderMeshData = new addonsphysicspackshapesPhysicsCylinderDebugShape_PhysicsCylinderDebugShapejs(32);
	this.planeMeshData = new addonsphysicspackshapesPhysicsPlaneDebugShape_PhysicsPlaneDebugShapejs();

	this.material = new rendererMaterial_Materialjs(renderershadersShaderLib_ShaderLibjs.simpleColored);
	this.material.uniforms.color = [0, 1, 0];
	this.material.wireframe = true;
	this.renderablePool = new addonsphysicspackutilPool_Pooljs({
		create: function () {
			return {
				meshData: null,
				transform: new mathTransform_Transformjs(),
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
PhysicsDebugRenderSystem.prototype = Object.create(entitiessystemsSystem_Systemjs.prototype);
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

	if (collider instanceof addonsphysicspackcollidersSphereCollider_SphereColliderjs) {
		var scale = collider.radius;
		targetTransform.scale.set(scale, scale, scale);
	} else if (collider instanceof addonsphysicspackcollidersBoxCollider_BoxColliderjs) {
		targetTransform.scale.copy(collider.halfExtents).scale(2);
	} else if (collider instanceof addonsphysicspackcollidersCylinderCollider_CylinderColliderjs) {
		targetTransform.scale.set(collider.radius, collider.radius, collider.height);
	} else if (collider instanceof addonsphysicspackcollidersPlaneCollider_PlaneColliderjs) {
		targetTransform.scale.set(1, 1, 1);
	} else if (collider instanceof addonsphysicspackcollidersMeshCollider_MeshColliderjs) {
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
	if (collider instanceof addonsphysicspackcollidersSphereCollider_SphereColliderjs) {
		meshData = this.sphereMeshData;
	} else if (collider instanceof addonsphysicspackcollidersBoxCollider_BoxColliderjs) {
		meshData = this.boxMeshData;
	} else if (collider instanceof addonsphysicspackcollidersCylinderCollider_CylinderColliderjs) {
		meshData = this.cylinderMeshData;
	} else if (collider instanceof addonsphysicspackcollidersPlaneCollider_PlaneColliderjs) {
		meshData = this.planeMeshData;
	} else if (collider instanceof addonsphysicspackcollidersMeshCollider_MeshColliderjs) {
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