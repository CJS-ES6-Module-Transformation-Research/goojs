import { ProximitySystem as ProximitySystem_ProximitySystem } from "../../../../src/goo/fsmpack/proximity/ProximitySystem";
import { ProximityComponent as ProximityComponent_ProximityComponent } from "../../../../src/goo/fsmpack/proximity/ProximityComponent";
import { World as World_World } from "../../../../src/goo/entities/World";

describe('ProximityComponent', function () {
	var world, proximitySystem;

	beforeEach(function () {
		world = new World_World();
		proximitySystem = new ProximitySystem_ProximitySystem();
		world.add(proximitySystem);
	});

	it('it adds a proximity component', function () {
		var proximityComponent = new ProximityComponent_ProximityComponent('Green');

		var entity = world.createEntity(proximityComponent).addToWorld();
		world.process();

		expect(proximitySystem.getFor('Green')).toEqual([entity]);
	});

	it('it removes a proximity component', function () {
		var proximityComponent = new ProximityComponent_ProximityComponent('Blue');

		var entity = world.createEntity(proximityComponent).addToWorld();
		world.process();
		entity.clearComponent('proximityComponent');
		world.process();

		expect(proximitySystem.getFor('Blue')).toEqual([]);
	});
});
