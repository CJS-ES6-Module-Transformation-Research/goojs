var _ScriptSystem = require("../../../../src/goo/entities/systems/ScriptSystem");

var _ScriptComponent = require("../../../../src/goo/entities/components/ScriptComponent");

var _World = require("../../../../src/goo/entities/World");

describe('ScriptComponent', function () {
	var world;

	beforeEach(function () {
		world = new _World.World();
		world.gooRunner = {
			renderer: {
				domElement: null,
				viewportWidth: null,
				viewportHeight: null
			}
		};
		world.add(new _ScriptSystem.ScriptSystem(world));
	});

	it('it calls setup on all scripts when removing the component', function () {
		var a = 0,
		    b = 0;

		var scriptComponent = new _ScriptComponent.ScriptComponent([{
			setup: function setup() {
				a += 123;
			},
			run: function run() {}
		}, {
			setup: function setup() {
				b += 234;
			},
			run: function run() {}
		}]);

		world.createEntity(scriptComponent).addToWorld();
		world.process();

		expect(a).toEqual(123);
		expect(b).toEqual(234);
	});

	it('it calls cleanup on all scripts when removing the component', function () {
		var a = 0,
		    b = 0;

		var scriptComponent = new _ScriptComponent.ScriptComponent([{
			run: function run() {},
			cleanup: function cleanup() {
				a += 123;
			}
		}, {
			run: function run() {},
			cleanup: function cleanup() {
				b += 234;
			}
		}]);

		var entity = world.createEntity(scriptComponent).addToWorld();
		world.process();
		entity.clearComponent('scriptComponent');
		world.process();

		expect(a).toEqual(123);
		expect(b).toEqual(234);
	});
});
