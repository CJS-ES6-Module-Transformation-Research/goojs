import { Vector3 as Vector3_Vector3js } from "../../../../src/goo/math/Vector3";
import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";
import { World as World_Worldjs } from "../../../../src/goo/entities/World";
import { TransformComponent as TransformComponent_TransformComponentjs } from "../../../../src/goo/entities/components/TransformComponent";
import {     ParticleSystemComponent as ParticleSystemComponent_ParticleSystemComponentjs, } from "../../../../src/goo/addons/particlepack/components/ParticleSystemComponent";

describe('ParticleData', function () {
	var world;

	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);
		world = new World_Worldjs();
		world.registerComponent(TransformComponent_TransformComponentjs);
		world.registerComponent(ParticleSystemComponent_ParticleSystemComponentjs);
	});

	it('can get world position', function () {
		var component = new ParticleSystemComponent_ParticleSystemComponentjs();
		world.createEntity([0, 0, 0], component).addToWorld();
		var store = new Vector3_Vector3js();
		component.particles[0].getWorldPosition(store);
	});
});