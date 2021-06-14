import { ScriptSystem as ScriptSystem_ScriptSystem } from "../../../../src/goo/entities/systems/ScriptSystem";
import { ScriptComponent as ScriptComponent_ScriptComponent } from "../../../../src/goo/entities/components/ScriptComponent";
import { World as World_World } from "../../../../src/goo/entities/World";

describe('ScriptComponent', function () {
	var world;

	beforeEach(function () {
		world = new World_World();
		world.gooRunner = {
			renderer: {
				domElement: null,
				viewportWidth: null,
				viewportHeight: null
			}
		};
		world.add(new ScriptSystem_ScriptSystem(world));
	});

	it('it calls setup on all scripts when removing the component', function () {
		var a = 0, b = 0;

		var scriptComponent = new ScriptComponent_ScriptComponent([{
			setup: function () { a += 123; },
			run: function () {}
		}, {
			setup: function () { b += 234; },
			run: function () {}
		}]);

		world.createEntity(scriptComponent).addToWorld();
		world.process();

		expect(a).toEqual(123);
		expect(b).toEqual(234);
	});

	it('it calls cleanup on all scripts when removing the component', function () {
		var a = 0, b = 0;

		var scriptComponent = new ScriptComponent_ScriptComponent([{
			run: function () {},
			cleanup: function () { a += 123; }
		}, {
			run: function () {},
			cleanup: function () { b += 234; }
		}]);

		var entity = world.createEntity(scriptComponent).addToWorld();
		world.process();
		entity.clearComponent('scriptComponent');
		world.process();

		expect(a).toEqual(123);
		expect(b).toEqual(234);
	});
});
