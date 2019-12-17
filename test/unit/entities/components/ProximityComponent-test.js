import { ProximitySystem } from "../../../../src/goo/fsmpack/proximity/ProximitySystem";
import { ProximityComponent } from "../../../../src/goo/fsmpack/proximity/ProximityComponent";
import { World } from "../../../../src/goo/entities/World";

describe('ProximityComponent', function () {
	var world, proximitySystem;

	beforeEach(function () {
		world = new World();
		proximitySystem = new ProximitySystem();
		world.add(proximitySystem);
	});

	it('it adds a proximity component', function () {
		var proximityComponent = new ProximityComponent('Green');

		var entity = world.createEntity(proximityComponent).addToWorld();
		world.process();

		expect(proximitySystem.getFor('Green')).toEqual([entity]);
	});

	it('it removes a proximity component', function () {
		var proximityComponent = new ProximityComponent('Blue');

		var entity = world.createEntity(proximityComponent).addToWorld();
		world.process();
		entity.clearComponent('proximityComponent');
		world.process();

		expect(proximitySystem.getFor('Blue')).toEqual([]);
	});
});
