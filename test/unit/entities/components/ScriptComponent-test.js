import { ScriptSystem as srcgooentitiessystemsScriptSystem_ScriptSystemjs } from "../../../../src/goo/entities/systems/ScriptSystem";
import {     ScriptComponent as srcgooentitiescomponentsScriptComponent_ScriptComponentjs, } from "../../../../src/goo/entities/components/ScriptComponent";
import { World as srcgooentitiesWorld_Worldjs } from "../../../../src/goo/entities/World";

describe('ScriptComponent', function () {
	var world;

	beforeEach(function () {
		world = new srcgooentitiesWorld_Worldjs();
		world.gooRunner = {
			renderer: {
				domElement: null,
				viewportWidth: null,
				viewportHeight: null
			}
		};
		world.add(new srcgooentitiessystemsScriptSystem_ScriptSystemjs(world));
	});

	it('it calls setup on all scripts when removing the component', function () {
		var a = 0, b = 0;

		var scriptComponent = new srcgooentitiescomponentsScriptComponent_ScriptComponentjs([{
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

		var scriptComponent = new srcgooentitiescomponentsScriptComponent_ScriptComponentjs([{
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
