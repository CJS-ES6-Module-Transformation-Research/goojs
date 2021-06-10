import { Vector3 as Vector3_Vector3 } from "../../../../src/goo/math/Vector3";
import { CustomMatchers as CustomMatchers_CustomMatchers } from "../../../../test/unit/CustomMatchers";
import { World as World_World } from "../../../../src/goo/entities/World";
import { TransformComponent as TransformComponent_TransformComponent } from "../../../../src/goo/entities/components/TransformComponent";
import { ParticleSystemComponent as ParticleSystemComponent_ParticleSystemComponent } from "../../../../src/goo/addons/particlepack/components/ParticleSystemComponent";

describe('ParticleData', function () {
	var world;

	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers_CustomMatchers);
		world = new World_World();
		world.registerComponent(TransformComponent_TransformComponent);
		world.registerComponent(ParticleSystemComponent_ParticleSystemComponent);
	});

	it('can get world position', function () {
		var component = new ParticleSystemComponent_ParticleSystemComponent();
		world.createEntity([0, 0, 0], component).addToWorld();
		var store = new Vector3_Vector3();
		component.particles[0].getWorldPosition(store);
	});
});