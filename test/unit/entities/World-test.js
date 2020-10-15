"use strict";

var _Manager = require("../../../src/goo/entities/managers/Manager");

var _Entity = require("../../../src/goo/entities/Entity");

var _System = require("../../../src/goo/entities/systems/System");

var _World = require("../../../src/goo/entities/World");

var _TransformComponent = require("../../../src/goo/entities/components/TransformComponent");

var _MeshDataComponent = require("../../../src/goo/entities/components/MeshDataComponent");

var _MeshRendererComponent = require("../../../src/goo/entities/components/MeshRendererComponent");

var _CameraComponent = require("../../../src/goo/entities/components/CameraComponent");

var _LightComponent = require("../../../src/goo/entities/components/LightComponent");

var _ScriptComponent = require("../../../src/goo/entities/components/ScriptComponent");

var _Component = require("../../../src/goo/entities/components/Component");

var _ScriptSystem = require("../../../src/goo/entities/systems/ScriptSystem");

var _TransformSystem = require("../../../src/goo/entities/systems/TransformSystem");

var _Box = require("../../../src/goo/shapes/Box");

var _Camera = require("../../../src/goo/renderer/Camera");

var _PointLight = require("../../../src/goo/renderer/light/PointLight");

var _ShaderLib = require("../../../src/goo/renderer/shaders/ShaderLib");

var _Material = require("../../../src/goo/renderer/Material");

var _EntitySelection = require("../../../src/goo/entities/EntitySelection");

describe('World with Systems', function () {

	var world;

	beforeEach(function () {
		world = new _World.World();
	});

	it('cannot add the same system twice', function () {
		var systemA = new _System.System('A', []);

		world.setSystem(systemA);
		world.setSystem(systemA);

		expect(world._systems).toEqual([systemA]);
	});

	it('adds a system with default priority to the world', function () {
		var systemA = new _System.System('A', []);
		var systemB = new _System.System('B', []);

		world.setSystem(systemA);
		world.setSystem(systemB);

		expect(world._systems).toEqual([systemA, systemB]);
	});

	it('adds a system with high priority to the world', function () {
		var systemA = new _System.System('A', []);
		var systemB = new _System.System('B', []);
		var systemC = new _System.System('A', []);
		systemC.priority = -1;

		world.setSystem(systemA);
		world.setSystem(systemB);
		world.setSystem(systemC);

		expect(world._systems).toEqual([systemC, systemA, systemB]);
	});

	it('adds a system with low priority to the world', function () {
		var world = new _World.World();

		var systemA = new _System.System('A', []);
		var systemB = new _System.System('B', []);
		var systemC = new _System.System('C', []);
		systemC.priority = 5;

		world.setSystem(systemA);
		world.setSystem(systemB);
		world.setSystem(systemC);

		expect(world._systems).toEqual([systemA, systemB, systemC]);
	});

	it('adds a system with medium priority to the world', function () {
		var systemA = new _System.System('A', []);
		systemA.priority = 3;
		var systemB = new _System.System('B', []);
		systemB.priority = 1;
		var systemC = new _System.System('C', []);
		systemC.priority = 2;

		world.setSystem(systemA);
		world.setSystem(systemB);
		world.setSystem(systemC);

		expect(world._systems).toEqual([systemB, systemC, systemA]);
	});

	it('removes a system', function () {
		var systemA = new _System.System('A', []);
		systemA.priority = 3;
		var systemB = new _System.System('B', []);
		systemB.priority = 1;

		world.setSystem(systemA);
		world.setSystem(systemB);

		world.clearSystem('A');

		expect(world._systems).toEqual([systemB]);
	});

	it('calls the cleanup function of a system when removing it from the world', function () {
		var systemA = new _System.System('A', []);
		spyOn(systemA, 'cleanup').and.callThrough();

		world.setSystem(systemA);

		world.clearSystem('A');

		expect(systemA.cleanup).toHaveBeenCalled();
	});

	it('tries to add existing entities to a late added system', function () {
		function SystemA() {
			_System.System.call(this, 'SystemA', ['ComponentA']);
		}

		SystemA.prototype = Object.create(_System.System.prototype);
		var systemA = new SystemA();
		spyOn(systemA, '_check').and.callThrough();

		// ---
		function ComponentA() {
			_Component.Component.apply(this, arguments);
			this.type = 'ComponentA';
		}

		ComponentA.prototype = Object.create(_Component.Component.prototype);

		// ---
		var entity1 = world.createEntity(new ComponentA()).addToWorld();
		var entity2 = world.createEntity().addToWorld();

		world.process();

		world.setSystem(systemA);

		expect(systemA._check.calls.argsFor(0)[0]).toBe(entity1);
		expect(systemA._check.calls.argsFor(1)[0]).toBe(entity2);
	});
});

describe('World with Components', function () {
	var world;
	beforeEach(function () {
		world = new _World.World();
		world.registerComponent(_TransformComponent.TransformComponent);
		world.registerComponent(_MeshDataComponent.MeshDataComponent);
		world.registerComponent(_MeshRendererComponent.MeshRendererComponent);
		world.registerComponent(_CameraComponent.CameraComponent);
		world.registerComponent(_LightComponent.LightComponent);
		world.registerComponent(_ScriptComponent.ScriptComponent);
	});

	// Cucumber system
	function CucumberSystem() {
		_System.System.call(this, 'CucumberSystem', ['CucumberComponent']);
	}
	CucumberSystem.prototype = Object.create(_System.System.prototype);
	CucumberSystem.prototype.inserted = function () {};
	CucumberSystem.prototype.deleted = function () {};
	CucumberSystem.prototype.addedComponent = function () {};
	CucumberSystem.prototype.removedComponent = function () {};

	// Cucumber component
	function CucumberComponent() {
		_Component.Component.apply(this, arguments);
		this.type = 'CucumberComponent';
	}

	var cucumberComponent, cucumberSystem, entity;

	beforeEach(function () {
		entity = world.createEntity();
		entity.addToWorld();
		// Process to prevent TransformComponent trigger addedComponent call on CucumberSystem
		world.process();

		cucumberSystem = new CucumberSystem();
		world.setSystem(cucumberSystem);
		cucumberComponent = new CucumberComponent();

		spyOn(cucumberSystem, 'inserted');
		spyOn(cucumberSystem, 'deleted');
		spyOn(cucumberSystem, 'addedComponent');
		spyOn(cucumberSystem, 'removedComponent');
	});

	CucumberComponent.prototype = Object.create(_Component.Component.prototype);

	it('get added call when components in the interest list are added', function () {
		entity.setComponent(cucumberComponent);
		world.process();
		expect(cucumberSystem.inserted).toHaveBeenCalled();
		expect(cucumberSystem.addedComponent).toHaveBeenCalled();
	});

	it('gets deleted call when components in the interest list are deleted', function () {
		entity.setComponent(cucumberComponent);
		world.process();
		entity.clearComponent('CucumberComponent');
		world.process();
		expect(cucumberSystem.deleted).toHaveBeenCalled();
		expect(cucumberSystem.removedComponent).toHaveBeenCalled();
	});

	it('gets no update calls when deleting a non existent component', function () {
		entity.clearComponent('CucumberComponent');
		world.process();
		expect(cucumberSystem.inserted).not.toHaveBeenCalled();
		expect(cucumberSystem.deleted).not.toHaveBeenCalled();
		expect(cucumberSystem.addedComponent).not.toHaveBeenCalled();
		expect(cucumberSystem.removedComponent).not.toHaveBeenCalled();
	});

	it('can create a typical entity holding all sorts of stuff in random order', function () {
		world.gooRunner = {
			renderer: {
				domElement: null,
				viewportWidth: null,
				viewportHeight: null
			}
		};
		world.add(new _ScriptSystem.ScriptSystem(world));

		var camera = new _Camera.Camera();
		var meshData = new _Box.Box();
		var material = new _Material.Material(_ShaderLib.ShaderLib.simple);
		var light = new _PointLight.PointLight();
		var script = { run: function run() {} };

		var entity = world.createEntity(camera, meshData, script, 'entitate', material, light);
		expect(entity.toString()).toBe('entitate');
		expect(entity.hasComponent('MeshDataComponent')).toBeTruthy();
		expect(entity.hasComponent('MeshRendererComponent')).toBeTruthy();
		expect(entity.hasComponent('LightComponent')).toBeTruthy();
		expect(entity.hasComponent('CameraComponent')).toBeTruthy();
		expect(entity.hasComponent('ScriptComponent')).toBeTruthy();
	});

	it('automatically adds a TransformComponent on a newly created entity', function () {
		var entity = world.createEntity();

		expect(entity.transformComponent).toBeTruthy();
	});

	it('adds an entity using the \'add\' function', function () {
		var entity = new _Entity.Entity(world);

		world.add(entity);
		world.process();
		expect(world.getEntities()).toContain(entity);
	});

	it('adds a system using the \'add\' function', function () {
		var system = new _TransformSystem.TransformSystem();

		world.add(system);
		expect(world._systems).toContain(system);
	});

	it('adds a manager using the \'add\' function', function () {
		function FishManager() {
			_Manager.Manager.call(this);
		}
		FishManager.prototype = Object.create(_Manager.Manager.prototype);

		var manager = new FishManager();

		world.add(manager);
		expect(world._managers).toContain(manager);
	});

	it('registers a component using the \'add\' function', function () {
		var component = new _TransformComponent.TransformComponent();

		world.add(component);
		expect(world._components).toContain(component);
	});

	// api installing
	it('installs the api of a manager', function () {
		var world = new _World.World();
		expect(world.by.id).toBeTruthy();
		expect(world.by.name).toBeTruthy();
	});

	it('does not override existing methods on install', function () {
		var a = 0;
		function FishManager() {
			_Manager.Manager.call(this);
			this.type = 'FishManager';
			this.api = {
				color: function color() {
					a += 123;
				}
			};
		}
		FishManager.prototype = Object.create(_Manager.Manager.prototype);

		var b = 0;
		function BananaManager() {
			this.type = 'BananaManager';
			this.api = {
				color: function color() {
					b += 234;
				}
			};
		}
		BananaManager.prototype = Object.create(_Manager.Manager.prototype);

		var world = new _World.World();

		world.setManager(new FishManager());
		expect(function () {
			world.setManager(new BananaManager());
		}).toThrow(new Error('Could not install method color of BananaManager as it is already taken'));

		world.by.color();

		expect(a).toEqual(123);
		expect(b).toEqual(0);
	});

	describe('with EntitySelection', function () {
		// if this is useful provide it in some test-util class
		function getSuperSpy() {
			// we need a spy that can track on what object it has been called
			// sadly jasmine spies are not self aware
			var history = [];

			function superSpy() {
				var entry = {
					this_: this,
					arguments_: Array.prototype.slice.call(arguments, 0) // proper array
				};
				history.push(entry);
			}

			superSpy.calls = {
				argsFor: function argsFor(index) {
					return history[index].arguments_;
				},
				thisFor: function thisFor(index) {
					return history[index].this_;
				},
				count: function count() {
					return history.length;
				}
			};

			return superSpy;
		}

		it('installs component methods on EntitySelection', function () {
			var spyA = getSuperSpy();
			var spyB = getSuperSpy();

			function CoconutComponent() {
				this.type = 'CoconutComponent';
			}

			CoconutComponent.type = 'CoconutComponent';

			CoconutComponent.entitySelectionAPI = {
				a: spyA,
				b: spyB
			};

			CoconutComponent.prototype = Object.create(_Component.Component.prototype);
			CoconutComponent.prototype.constructor = CoconutComponent;

			var world = new _World.World();
			world.registerComponent(CoconutComponent);

			var entity1 = new _Entity.Entity().setComponent(new CoconutComponent());
			var entity2 = new _Entity.Entity();
			var entity3 = new _Entity.Entity().setComponent(new CoconutComponent());

			var entitySelection = new _EntitySelection.EntitySelection(entity1, entity2, entity3);
			var result = entitySelection.a(123, 456);

			expect(spyA.calls.count()).toEqual(2);
			expect(spyA.calls.thisFor(0)).toEqual(entity1);
			expect(spyA.calls.thisFor(1)).toEqual(entity3);
			expect(spyA.calls.argsFor(0)).toEqual([123, 456]);
			expect(result).toBe(entitySelection);
		});
	});
});

describe('Default selectors', function () {
	it('gets a list of entities with a programmerComponent', function () {
		function ProgrammerComponent() {
			this.type = 'programmerComponent';
		}

		ProgrammerComponent.prototype = Object.create(_Component.Component.prototype);
		ProgrammerComponent.constructor = ProgrammerComponent;

		var world = new _World.World();

		var entity1 = world.createEntity().set(new ProgrammerComponent()).addToWorld();
		world.createEntity().addToWorld();
		var entity3 = world.createEntity().set(new ProgrammerComponent()).addToWorld();

		world.process();

		var selection1 = world.by.component('programmerComponent');
		expect(selection1.toArray()).toEqual([entity1, entity3]);

		var selection2 = world.by.component('ProgrammerComponent');
		expect(selection2.toArray()).toEqual([entity1, entity3]);
	});

	it('gets a list of entities that are tracked by the TransformSystem', function () {
		var world = new _World.World();
		world.add(new _TransformSystem.TransformSystem());

		var entity1 = world.createEntity().addToWorld();
		new _Entity.Entity(world).addToWorld();
		var entity3 = world.createEntity().addToWorld();

		world.process();

		var selection = world.by.system('TransformSystem');
		expect(selection.toArray()).toEqual([entity1, entity3]);
	});

	it('gets a list of entities that have a specific tag', function () {
		var world = new _World.World();

		var entity1 = world.createEntity().setTag('t1').addToWorld();
		world.createEntity().setTag('t2').addToWorld();
		var entity3 = world.createEntity().setTag('t1').addToWorld();

		world.process();

		var selection = world.by.tag('t1');
		expect(selection.toArray()).toEqual([entity1, entity3]);
	});

	it('gets a list of entities that have a specific attribute', function () {
		var world = new _World.World();

		var entity1 = world.createEntity().setAttribute('a1', 10).addToWorld();
		world.createEntity().setAttribute('a2', {}).addToWorld();
		var entity3 = world.createEntity().setAttribute('a1', '20').addToWorld();

		world.process();

		var selection = world.by.attribute('a1');
		expect(selection.toArray()).toEqual([entity1, entity3]);
	});
});