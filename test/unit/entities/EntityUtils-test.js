"use strict";

var _EntityUtils = require("../../../src/goo/entities/EntityUtils");

var _Entity = require("../../../src/goo/entities/Entity");

var _World = require("../../../src/goo/entities/World");

var _TransformComponent = require("../../../src/goo/entities/components/TransformComponent");

var _MeshDataComponent = require("../../../src/goo/entities/components/MeshDataComponent");

var _MeshRendererComponent = require("../../../src/goo/entities/components/MeshRendererComponent");

var _TransformSystem = require("../../../src/goo/entities/systems/TransformSystem");

var _Box = require("../../../src/goo/shapes/Box");

describe('EntityUtils', function () {
	var world;
	var meshData = new _Box.Box();

	beforeEach(function () {
		world = new _World.World();
		world.registerComponent(_TransformComponent.TransformComponent);
		world.registerComponent(_MeshDataComponent.MeshDataComponent);
		world.add(new _TransformSystem.TransformSystem());
		_Entity.Entity.entityCount = 0;
	});

	it('can get the root entity', function () {
		var e1 = world.createEntity();
		var e2 = world.createEntity();
		e1.transformComponent.attachChild(e2.transformComponent);
		var e3 = world.createEntity();
		e2.transformComponent.attachChild(e3.transformComponent);
		world.process();

		expect(_EntityUtils.EntityUtils.getRoot(e1)).toBe(e1);
		expect(_EntityUtils.EntityUtils.getRoot(e2)).toBe(e1);
		expect(_EntityUtils.EntityUtils.getRoot(e3)).toBe(e1);
	});

	it('can get the total bounding box', function () {
		var e1 = world.createEntity(meshData, new _MeshRendererComponent.MeshRendererComponent());
		var e2 = world.createEntity(meshData, new _MeshRendererComponent.MeshRendererComponent(), [10, 10, 10]);
		e1.transformComponent.attachChild(e2.transformComponent);
		var e3 = world.createEntity(meshData, new _MeshRendererComponent.MeshRendererComponent(), [10, 10, 10]);
		e2.transformComponent.attachChild(e3.transformComponent);
		world.process();
		var es = [e1, e2, e3, e1, e2, e3];
		for (var i = 0; i < es.length; i++) {
			var e = es[i];
			e.transformComponent.updateTransform();
			e.transformComponent.updateWorldTransform();
			e.meshDataComponent.computeBoundFromPoints();
			e.meshRendererComponent.updateBounds(e.meshDataComponent.modelBound, e.transformComponent.worldTransform);
		}
		var bb = _EntityUtils.EntityUtils.getTotalBoundingBox(e1);
		expect(bb.xExtent).toBe(10.5);
		expect(bb.yExtent).toBe(10.5);
		expect(bb.zExtent).toBe(10.5);
	});
});