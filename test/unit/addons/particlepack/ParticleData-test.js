import { Vector3 as srcgoomathVector3_Vector3js } from "../../../../src/goo/math/Vector3";
import { CustomMatchers as testunitCustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";
import {     TransformComponent as srcgooentitiescomponentsTransformComponent_TransformComponentjs, } from "../../../../src/goo/entities/components/TransformComponent";
import {     ParticleSystemComponent as srcgooaddonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs, } from "../../../../src/goo/addons/particlepack/components/ParticleSystemComponent";

describe('ParticleData', function () {
	var world;

	beforeEach(function () {
		jasmine.addMatchers(testunitCustomMatchers_CustomMatchersjs);
		world = new srcgooentitiesWorld_Worldjs();
		world.registerComponent(srcgooentitiescomponentsTransformComponent_TransformComponentjs);
		world.registerComponent(srcgooaddonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs);
	});

	it('can get world position', function () {
		var component = new srcgooaddonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs();
		world.createEntity([0, 0, 0], component).addToWorld();
		var store = new srcgoomathVector3_Vector3js();
		component.particles[0].getWorldPosition(store);
	});
});