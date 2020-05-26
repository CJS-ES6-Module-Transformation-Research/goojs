var srcgooentitiesWorld_WorldjsBinding = {};
import { ProximitySystem as srcgoofsmpackproximityProximitySystem_ProximitySystemjs } from "../../../../src/goo/fsmpack/proximity/ProximitySystem";
import {     ProximityComponent as srcgoofsmpackproximityProximityComponent_ProximityComponentjs, } from "../../../../src/goo/fsmpack/proximity/ProximityComponent";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";

describe('ProximityComponent', function () {
	var world, proximitySystem;

	beforeEach(function () {
		srcgooentitiesWorld_Worldjs = new srcgooentitiesWorld_Worldjs();
		proximitySystem = new srcgoofsmpackproximityProximitySystem_ProximitySystemjs();
		world.add(proximitySystem);
	});

	it('it adds a proximity component', function () {
		var proximityComponent = new srcgoofsmpackproximityProximityComponent_ProximityComponentjs('Green');

		var entity = world.createEntity(proximityComponent).addToWorld();
		world.process();

		expect(proximitySystem.getFor('Green')).toEqual([entity]);
	});

	it('it removes a proximity component', function () {
		var proximityComponent = new srcgoofsmpackproximityProximityComponent_ProximityComponentjs('Blue');

		var entity = world.createEntity(proximityComponent).addToWorld();
		world.process();
		entity.clearComponent('proximityComponent');
		world.process();

		expect(proximitySystem.getFor('Blue')).toEqual([]);
	});
});
