import { Vector3 as Vector3js } from "../../../../src/goo/math/Vector3";
import { CustomMatchers as CustomMatchers_CustomMatchersjs } from "../../../../test/unit/CustomMatchers";
import { World as Worldjs } from "../../../../src/goo/entities/World";
import { TransformComponent as TransformComponentjs } from "../../../../src/goo/entities/components/TransformComponent";
import { ParticleSystemComponent as ParticleSystemComponentjs } from "../../../../src/goo/addons/particlepack/components/ParticleSystemComponent";

describe('ParticleData', function () {
	var world;

	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchersjs);
		world = new Worldjs();
		world.registerComponent(TransformComponentjs);
		world.registerComponent(ParticleSystemComponentjs);
	});

	it('can get world position', function () {
		var component = new ParticleSystemComponentjs();
		world.createEntity([0, 0, 0], component).addToWorld();
		var store = new Vector3js();
		component.particles[0].getWorldPosition(store);
	});
});