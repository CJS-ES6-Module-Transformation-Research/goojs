"use strict";

var _ProximitySystem = require("../../../../src/goo/fsmpack/proximity/ProximitySystem");

var _ProximityComponent = require("../../../../src/goo/fsmpack/proximity/ProximityComponent");

var _World = require("../../../../src/goo/entities/World");

describe('ProximityComponent', function () {
	var world, proximitySystem;

	beforeEach(function () {
		world = new _World.World();
		proximitySystem = new _ProximitySystem.ProximitySystem();
		world.add(proximitySystem);
	});

	it('it adds a proximity component', function () {
		var proximityComponent = new _ProximityComponent.ProximityComponent('Green');

		var entity = world.createEntity(proximityComponent).addToWorld();
		world.process();

		expect(proximitySystem.getFor('Green')).toEqual([entity]);
	});

	it('it removes a proximity component', function () {
		var proximityComponent = new _ProximityComponent.ProximityComponent('Blue');

		var entity = world.createEntity(proximityComponent).addToWorld();
		world.process();
		entity.clearComponent('proximityComponent');
		world.process();

		expect(proximitySystem.getFor('Blue')).toEqual([]);
	});
});
