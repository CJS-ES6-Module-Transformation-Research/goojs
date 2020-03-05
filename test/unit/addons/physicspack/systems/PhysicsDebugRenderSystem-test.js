import { BoxCollider as BoxCollider_BoxColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/BoxCollider";
import { SphereCollider as SphereCollider_SphereColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/SphereCollider";
import { CylinderCollider as CylinderCollider_CylinderColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/CylinderCollider";
import { PlaneCollider as PlaneCollider_PlaneColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/PlaneCollider";
import { MeshCollider as MeshCollider_MeshColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/MeshCollider";
import {     PhysicsDebugRenderSystem as PhysicsDebugRenderSystem_PhysicsDebugRenderSystemjs, } from "../../../../../src/goo/addons/physicspack/systems/PhysicsDebugRenderSystem";
import { ColliderSystem as ColliderSystem_ColliderSystemjs } from "../../../../../src/goo/addons/physicspack/systems/ColliderSystem";
import { PhysicsSystem as PhysicsSystem_PhysicsSystemjs } from "../../../../../src/goo/addons/physicspack/systems/PhysicsSystem";
import { Sphere as Sphere_Spherejs } from "../../../../../src/goo/shapes/Sphere";
import { World as World_Worldjs } from "../../../../../src/goo/entities/World";
import { MeshData as MeshData_MeshDatajs } from "../../../../../src/goo/renderer/MeshData";
describe('PhysicsDebugRenderSystem', function () {

	var BoxCollider = BoxCollider_BoxColliderjs;
	var SphereCollider = SphereCollider_SphereColliderjs;
	var CylinderCollider = CylinderCollider_CylinderColliderjs;
	var PlaneCollider = PlaneCollider_PlaneColliderjs;
	var MeshCollider = MeshCollider_MeshColliderjs;
	var PhysicsDebugRenderSystem = PhysicsDebugRenderSystem_PhysicsDebugRenderSystemjs;
	var ColliderSystem = ColliderSystem_ColliderSystemjs;
	var PhysicsSystem = PhysicsSystem_PhysicsSystemjs;
	var Sphere = Sphere_Spherejs;
	var World = World_Worldjs;
	var MeshData = MeshData_MeshDatajs;

	var world, system;

	beforeEach(function () {
		world = new World_Worldjs();
		system = new PhysicsDebugRenderSystem_PhysicsDebugRenderSystemjs();
		world.setSystem(system);
		world.setSystem(new ColliderSystem_ColliderSystemjs());
		world.setSystem(new PhysicsSystem_PhysicsSystemjs());
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
		var boxCollider = new BoxCollider_BoxColliderjs();
		var sphereCollider = new SphereCollider_SphereColliderjs();
		var cylinderCollider = new CylinderCollider_CylinderColliderjs();
		var planeCollider = new PlaneCollider_PlaneColliderjs();
		var meshCollider = new MeshCollider_MeshColliderjs({ meshData: new Sphere_Spherejs() });

		expect(system.getMeshData(boxCollider)).toEqual(jasmine.any(MeshData_MeshDatajs));
		expect(system.getMeshData(sphereCollider)).toEqual(jasmine.any(MeshData_MeshDatajs));
		expect(system.getMeshData(cylinderCollider)).toEqual(jasmine.any(MeshData_MeshDatajs));
		expect(system.getMeshData(planeCollider)).toEqual(jasmine.any(MeshData_MeshDatajs));
		expect(system.getMeshData(meshCollider)).toEqual(jasmine.any(MeshData_MeshDatajs));
	});
});
