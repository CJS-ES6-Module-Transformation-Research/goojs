import { ProximitySystem as ProximitySystem_ProximitySystemjs } from "../../../../src/goo/fsmpack/proximity/ProximitySystem";
import { ProximityComponent as ProximityComponentjs } from "../../../../src/goo/fsmpack/proximity/ProximityComponent";
import { World as World_Worldjs } from "../../../../src/goo/entities/World";

describe('ProximityComponent', function () {
	var world, proximitySystem;

	beforeEach(function () {
		world = new World_Worldjs();
		proximitySystem = new ProximitySystem_ProximitySystemjs();
		world.add(proximitySystem);
	});

	it('it adds a proximity component', function () {
		var proximityComponent = new ProximityComponentjs('Green');

		var entity = world.createEntity(proximityComponent).addToWorld();
		world.process();

		expect(proximitySystem.getFor('Green')).toEqual([entity]);
	});

	it('it removes a proximity component', function () {
		var proximityComponent = new ProximityComponentjs('Blue');

		var entity = world.createEntity(proximityComponent).addToWorld();
		world.process();
		entity.clearComponent('proximityComponent');
		world.process();

		expect(proximitySystem.getFor('Blue')).toEqual([]);
	});
});
