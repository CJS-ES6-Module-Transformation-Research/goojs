"use strict";

var _BoxCollider = require("../../../../../src/goo/addons/physicspack/colliders/BoxCollider");

var _SphereCollider = require("../../../../../src/goo/addons/physicspack/colliders/SphereCollider");

var _CylinderCollider = require("../../../../../src/goo/addons/physicspack/colliders/CylinderCollider");

var _PlaneCollider = require("../../../../../src/goo/addons/physicspack/colliders/PlaneCollider");

var _MeshCollider = require("../../../../../src/goo/addons/physicspack/colliders/MeshCollider");

var _PhysicsDebugRenderSystem = require("../../../../../src/goo/addons/physicspack/systems/PhysicsDebugRenderSystem");

var _ColliderSystem = require("../../../../../src/goo/addons/physicspack/systems/ColliderSystem");

var _PhysicsSystem = require("../../../../../src/goo/addons/physicspack/systems/PhysicsSystem");

var _Sphere = require("../../../../../src/goo/shapes/Sphere");

var _World = require("../../../../../src/goo/entities/World");

var _MeshData = require("../../../../../src/goo/renderer/MeshData");

describe('PhysicsDebugRenderSystem', function () {
				var world, system;

				beforeEach(function () {
								world = new _World.World();
								system = new _PhysicsDebugRenderSystem.PhysicsDebugRenderSystem();
								world.setSystem(system);
								world.setSystem(new _ColliderSystem.ColliderSystem());
								world.setSystem(new _PhysicsSystem.PhysicsSystem());
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
								var boxCollider = new _BoxCollider.BoxCollider();
								var sphereCollider = new _SphereCollider.SphereCollider();
								var cylinderCollider = new _CylinderCollider.CylinderCollider();
								var planeCollider = new _PlaneCollider.PlaneCollider();
								var meshCollider = new _MeshCollider.MeshCollider({ meshData: new _Sphere.Sphere() });

								expect(system.getMeshData(boxCollider)).toEqual(jasmine.any(_MeshData.MeshData));
								expect(system.getMeshData(sphereCollider)).toEqual(jasmine.any(_MeshData.MeshData));
								expect(system.getMeshData(cylinderCollider)).toEqual(jasmine.any(_MeshData.MeshData));
								expect(system.getMeshData(planeCollider)).toEqual(jasmine.any(_MeshData.MeshData));
								expect(system.getMeshData(meshCollider)).toEqual(jasmine.any(_MeshData.MeshData));
				});
});