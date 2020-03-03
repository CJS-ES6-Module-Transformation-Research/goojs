var _Vector = require("../../../../src/goo/math/Vector3");

var _CustomMatchers = require("../../../../test/unit/CustomMatchers");

var _World = require("../../../../src/goo/entities/World");

var _TransformComponent = require("../../../../src/goo/entities/components/TransformComponent");

var _ParticleSystemComponent = require("../../../../src/goo/addons/particlepack/components/ParticleSystemComponent");

describe('ParticleData', function () {
	var world;

	beforeEach(function () {
		jasmine.addMatchers(_CustomMatchers.CustomMatchers);
		world = new _World.World();
		world.registerComponent(_TransformComponent.TransformComponent);
		world.registerComponent(_ParticleSystemComponent.ParticleSystemComponent);
	});

	it('can get world position', function () {
		var component = new _ParticleSystemComponent.ParticleSystemComponent();
		world.createEntity([0, 0, 0], component).addToWorld();
		var store = new _Vector.Vector3();
		component.particles[0].getWorldPosition(store);
	});
});
