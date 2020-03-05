import { BoxCollider as BoxColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/BoxCollider";
import { SphereCollider as SphereColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/SphereCollider";
import { CylinderCollider as CylinderColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/CylinderCollider";
import { PlaneCollider as PlaneColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/PlaneCollider";
import { MeshCollider as MeshColliderjs } from "../../../../../src/goo/addons/physicspack/colliders/MeshCollider";
import { PhysicsDebugRenderSystem as PhysicsDebugRenderSystemjs } from "../../../../../src/goo/addons/physicspack/systems/PhysicsDebugRenderSystem";
import { ColliderSystem as ColliderSystemjs } from "../../../../../src/goo/addons/physicspack/systems/ColliderSystem";
import { PhysicsSystem as PhysicsSystemjs } from "../../../../../src/goo/addons/physicspack/systems/PhysicsSystem";
import { Sphere as Spherejs } from "../../../../../src/goo/shapes/Sphere";
import { World as Worldjs } from "../../../../../src/goo/entities/World";
import { MeshData as MeshDatajs } from "../../../../../src/goo/renderer/MeshData";
describe('PhysicsDebugRenderSystem', function () {

	var BoxCollider = BoxColliderjs;
	var SphereCollider = SphereColliderjs;
	var CylinderCollider = CylinderColliderjs;
	var PlaneCollider = PlaneColliderjs;
	var MeshCollider = MeshColliderjs;
	var PhysicsDebugRenderSystem = PhysicsDebugRenderSystemjs;
	var ColliderSystem = ColliderSystemjs;
	var PhysicsSystem = PhysicsSystemjs;
	var Sphere = Spherejs;
	var World = World_Worldjs;
	var MeshData = MeshDatajs;

	var world, system;

	beforeEach(function () {
		world = new Worldjs();
		system = new PhysicsDebugRenderSystemjs();
		world.setSystem(system);
		world.setSystem(new ColliderSystemjs());
		world.setSystem(new PhysicsSystemjs());
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
		var boxCollider = new BoxColliderjs();
		var sphereCollider = new SphereColliderjs();
		var cylinderCollider = new CylinderColliderjs();
		var planeCollider = new PlaneColliderjs();
		var meshCollider = new MeshColliderjs({ meshData: new Spherejs() });

		expect(system.getMeshData(boxCollider)).toEqual(jasmine.any(MeshDatajs));
		expect(system.getMeshData(sphereCollider)).toEqual(jasmine.any(MeshDatajs));
		expect(system.getMeshData(cylinderCollider)).toEqual(jasmine.any(MeshDatajs));
		expect(system.getMeshData(planeCollider)).toEqual(jasmine.any(MeshDatajs));
		expect(system.getMeshData(meshCollider)).toEqual(jasmine.any(MeshDatajs));
	});
});
