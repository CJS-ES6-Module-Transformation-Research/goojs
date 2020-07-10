import { BoxCollider as srcgooaddonsphysicspackcollidersBoxCollider_BoxColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/BoxCollider";
import {     SphereCollider as srcgooaddonsphysicspackcollidersSphereCollider_SphereColliderjs, } from "../../../../../src/goo/addons/physicspack/colliders/SphereCollider";
import {     CylinderCollider as srcgooaddonsphysicspackcollidersCylinderCollider_CylinderColliderjs, } from "../../../../../src/goo/addons/physicspack/colliders/CylinderCollider";
import {     PlaneCollider as srcgooaddonsphysicspackcollidersPlaneCollider_PlaneColliderjs, } from "../../../../../src/goo/addons/physicspack/colliders/PlaneCollider";
import {     MeshCollider as srcgooaddonsphysicspackcollidersMeshCollider_MeshColliderjs, } from "../../../../../src/goo/addons/physicspack/colliders/MeshCollider";
import {     PhysicsDebugRenderSystem as srcgooaddonsphysicspacksystemsPhysicsDebugRenderSystem_PhysicsDebugRenderSystemjs, } from "../../../../../src/goo/addons/physicspack/systems/PhysicsDebugRenderSystem";
import {     ColliderSystem as srcgooaddonsphysicspacksystemsColliderSystem_ColliderSystemjs, } from "../../../../../src/goo/addons/physicspack/systems/ColliderSystem";
import {     PhysicsSystem as srcgooaddonsphysicspacksystemsPhysicsSystem_PhysicsSystemjs, } from "../../../../../src/goo/addons/physicspack/systems/PhysicsSystem";
import { Sphere as srcgooshapesSphere_Spherejs } from "../../../../../src/goo/shapes/Sphere";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../../src/goo/entities/World";
import { MeshData as srcgoorendererMeshData_MeshDatajs } from "../../../../../src/goo/renderer/MeshData";
describe('PhysicsDebugRenderSystem', function () {
    var world, system;

    beforeEach(function () {
		world = new srcgooentitiesWorld_Worldjs();
		system = new srcgooaddonsphysicspacksystemsPhysicsDebugRenderSystem_PhysicsDebugRenderSystemjs();
		world.setSystem(system);
		world.setSystem(new srcgooaddonsphysicspacksystemsColliderSystem_ColliderSystemjs());
		world.setSystem(new srcgooaddonsphysicspacksystemsPhysicsSystem_PhysicsSystemjs());
	});

    afterEach(function () {
		world.clearSystem('PhysicsSystem');
	});

    it('can clear', function () {
		system.renderList.push(system.renderablePool._create());
		system.clear();
		expect(system.renderablePool._objects.length).toBe(1);
		expect(system.renderList.length).toBe(0);
	});

    it('can cleanup', function () {
		system.renderList.push(system.renderablePool._create());
		system.cleanup();
		expect(system.renderablePool._objects.length).toBe(1);
		expect(system.renderList.length).toBe(0);
	});

    it('can get mesh data from collider', function () {
		var boxCollider = new srcgooaddonsphysicspackcollidersBoxCollider_BoxColliderjs();
		var sphereCollider = new srcgooaddonsphysicspackcollidersSphereCollider_SphereColliderjs();
		var cylinderCollider = new srcgooaddonsphysicspackcollidersCylinderCollider_CylinderColliderjs();
		var planeCollider = new srcgooaddonsphysicspackcollidersPlaneCollider_PlaneColliderjs();
		var meshCollider = new srcgooaddonsphysicspackcollidersMeshCollider_MeshColliderjs({ meshData: new srcgooshapesSphere_Spherejs() });

		expect(system.getMeshData(boxCollider)).toEqual(jasmine.any(srcgoorendererMeshData_MeshDatajs));
		expect(system.getMeshData(sphereCollider)).toEqual(jasmine.any(srcgoorendererMeshData_MeshDatajs));
		expect(system.getMeshData(cylinderCollider)).toEqual(jasmine.any(srcgoorendererMeshData_MeshDatajs));
		expect(system.getMeshData(planeCollider)).toEqual(jasmine.any(srcgoorendererMeshData_MeshDatajs));
		expect(system.getMeshData(meshCollider)).toEqual(jasmine.any(srcgoorendererMeshData_MeshDatajs));
	});
});
