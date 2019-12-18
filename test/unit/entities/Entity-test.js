var _Entity = require("../../../src/goo/entities/Entity");

var _World = require("../../../src/goo/entities/World");

var _TransformComponent = require("../../../src/goo/entities/components/TransformComponent");

var _MeshDataComponent = require("../../../src/goo/entities/components/MeshDataComponent");

var _MeshRendererComponent = require("../../../src/goo/entities/components/MeshRendererComponent");

var _CameraComponent = require("../../../src/goo/entities/components/CameraComponent");

var _LightComponent = require("../../../src/goo/entities/components/LightComponent");

var _ScriptComponent = require("../../../src/goo/entities/components/ScriptComponent");

var _Component = require("../../../src/goo/entities/components/Component");

var _ScriptSystem = require("../../../src/goo/entities/systems/ScriptSystem");

var _Box = require("../../../src/goo/shapes/Box");

var _Camera = require("../../../src/goo/renderer/Camera");

var _PointLight = require("../../../src/goo/renderer/light/PointLight");

var _ShaderLib = require("../../../src/goo/renderer/shaders/ShaderLib");

var ShaderLib = _interopRequireWildcard(_ShaderLib);

var _Material = require("../../../src/goo/renderer/Material");

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

describe('Entity', function () {
	var world;

	beforeEach(function () {
		world = new _World.World();
		_Entity.Entity.entityCount = 0;

		world.registerComponent(_TransformComponent.TransformComponent);
		world.registerComponent(_MeshDataComponent.MeshDataComponent);
		world.registerComponent(_MeshRendererComponent.MeshRendererComponent);
		world.registerComponent(_CameraComponent.CameraComponent);
		world.registerComponent(_LightComponent.LightComponent);
		world.registerComponent(_ScriptComponent.ScriptComponent);

		//
		world.gooRunner = {
			renderer: {
				domElement: null,
				viewportWidth: null,
				viewportHeight: null
			}
		};
		world.add(new _ScriptSystem.ScriptSystem(world));
	});

	it('addToWorld', function () {
		var entity1 = world.createEntity();
		var entity2 = world.createEntity();
		entity1.addToWorld();
		entity2.addToWorld();
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(true);
		expect(world.entityManager.containsEntity(entity2)).toBe(true);
	});

	it('addToWorld recursive', function () {
		var entity1 = world.createEntity();
		var entity2 = world.createEntity();
		var entity3 = world.createEntity();
		entity1.transformComponent.attachChild(entity2.transformComponent);
		entity2.transformComponent.attachChild(entity3.transformComponent);
		entity1.addToWorld();
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(true);
		expect(world.entityManager.containsEntity(entity2)).toBe(true);
		expect(world.entityManager.containsEntity(entity3)).toBe(true);
	});

	it('addToWorld non-recursive', function () {
		var entity1 = world.createEntity();
		var entity2 = world.createEntity();
		var entity3 = world.createEntity();
		entity1.transformComponent.attachChild(entity2.transformComponent);
		entity2.transformComponent.attachChild(entity3.transformComponent);
		entity1.addToWorld(false);
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(true);
		expect(world.entityManager.containsEntity(entity2)).toBe(false);
		expect(world.entityManager.containsEntity(entity3)).toBe(false);
	});

	it('removeFromWorld', function () {
		var entity1 = world.createEntity();
		var entity2 = world.createEntity();
		entity1.addToWorld();
		entity2.addToWorld();
		world.process();
		entity1.removeFromWorld();
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(false);
		expect(world.entityManager.containsEntity(entity2)).toBe(true);
	});

	it('removeFromWorld recursive', function () {
		var entity1 = world.createEntity();
		var entity2 = world.createEntity();
		var entity3 = world.createEntity();
		entity1.transformComponent.attachChild(entity2.transformComponent);
		entity2.transformComponent.attachChild(entity3.transformComponent);
		entity1.addToWorld();
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(true);
		expect(world.entityManager.containsEntity(entity2)).toBe(true);
		expect(world.entityManager.containsEntity(entity3)).toBe(true);
		entity2.removeFromWorld();
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(true);
		expect(world.entityManager.containsEntity(entity2)).toBe(false);
		expect(world.entityManager.containsEntity(entity3)).toBe(false);

		expect(entity1.transformComponent.children.length).toBe(0);
		expect(entity2.transformComponent.parent).toBeNull();
		expect(entity3.transformComponent.parent).toBe(entity2.transformComponent);
	});

	it('removeFromWorld non-recursive', function () {
		var entity1 = world.createEntity();
		var entity2 = world.createEntity();
		var entity3 = world.createEntity();
		entity1.transformComponent.attachChild(entity2.transformComponent);
		entity2.transformComponent.attachChild(entity3.transformComponent);
		entity1.addToWorld();
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(true);
		expect(world.entityManager.containsEntity(entity2)).toBe(true);
		expect(world.entityManager.containsEntity(entity3)).toBe(true);
		entity2.removeFromWorld(false);
		world.process();
		expect(world.entityManager.containsEntity(entity1)).toBe(true);
		expect(world.entityManager.containsEntity(entity2)).toBe(false);
		expect(world.entityManager.containsEntity(entity3)).toBe(true);

		expect(entity1.transformComponent.children.length).toBe(0);
		expect(entity2.transformComponent.parent).toBeNull();
		expect(entity2.transformComponent.children.length).toBe(0);
		expect(entity3.transformComponent.parent).toBeNull();
	});

	it('toString', function () {
		var entity1 = world.createEntity();
		var entity2 = world.createEntity('myEnt');
		var entity3 = world.createEntity();
		expect(entity1.toString()).toBe('Entity_0');
		expect(entity2.toString()).toBe('myEnt');
		expect(entity3.toString()).toBe('Entity_2');
	});

	it('all entities should have TransformComponent', function () {
		var entity = world.createEntity();
		expect(entity.transformComponent !== undefined).toBe(true);
	});

	it('setComponent', function () {
		var entity = world.createEntity();
		entity.setComponent(new _MeshDataComponent.MeshDataComponent());
		expect(entity.meshDataComponent !== undefined).toBe(true);
	});

	it('cannot add the same component twice', function () {
		var entity = world.createEntity();
		var component = new _MeshDataComponent.MeshDataComponent();
		entity.setComponent(component);
		entity.setComponent(component);
		expect(entity._components.length).toBe(2);
	});

	it('cannot add more than one component of the same type to the same entity', function () {
		var entity = world.createEntity();
		entity.setComponent(new _MeshDataComponent.MeshDataComponent());
		entity.setComponent(new _MeshDataComponent.MeshDataComponent());
		expect(entity._components.length).toBe(2);
	});

	it('discards the second added component of the same type', function () {
		var entity = world.createEntity();
		var component1 = new _MeshDataComponent.MeshDataComponent();
		var component2 = new _MeshDataComponent.MeshDataComponent();
		entity.setComponent(component1);
		entity.setComponent(component2);
		var gotComponent = entity.getComponent('MeshDataComponent');
		expect(gotComponent).toBe(component1);
	});

	it('getComponent', function () {
		var entity = world.createEntity();
		var mdc = new _MeshDataComponent.MeshDataComponent();
		entity.setComponent(mdc);
		expect(entity.getComponent('meshDataComponent')).toBe(mdc);
		expect(entity.getComponent('MeshDataComponent')).toBe(mdc);
		expect(entity.getComponent('TransformComponent') !== undefined).toBe(true);
	});

	it('hasComponent', function () {
		var entity = world.createEntity();
		entity.setComponent(new _MeshDataComponent.MeshDataComponent());
		expect(entity.hasComponent('alabalaportocala')).toBe(false);
		expect(entity.hasComponent('TransformComponent')).toBe(true);
		expect(entity.hasComponent('MeshDataComponent')).toBe(true);
	});

	it('clears a component', function () {
		var entity = world.createEntity();
		entity.setComponent(new _MeshDataComponent.MeshDataComponent());
		entity.setComponent(new _MeshRendererComponent.MeshRendererComponent());
		world.process();
		entity.clearComponent('MeshRendererComponent');
		world.process();
		expect(entity.hasComponent('MeshDataComponent')).toBe(true);
		expect(entity.hasComponent('MeshRendererComponent')).toBe(false);
	});

	it('installs the api of a component', function () {
		var entity = world.createEntity();
		entity.setComponent(new _TransformComponent.TransformComponent());
		expect(entity.setTranslation).toBeTruthy();
	});

	it('removes the api of a component', function () {
		var entity = world.createEntity();
		entity.clearComponent('TransformComponent');
		expect(entity.setTranslation).toBeFalsy();
	});

	it('does not override existing methods on install', function () {
		var a = 0;
		function FishComponent() {
			_Component.Component.apply(this, arguments);
			this.type = 'FishComponent';
			this.api = {
				swim: function swim() {
					a += 123;
				}
			};
		}
		FishComponent.prototype = Object.create(_Component.Component.prototype);

		var b = 0;
		function BananaComponent() {
			_Component.Component.apply(this, arguments);
			this.type = 'BananaComponent';
			this.api = {
				swim: function swim() {
					b += 234;
				}
			};
		}
		BananaComponent.prototype = Object.create(_Component.Component.prototype);

		var entity = new _Entity.Entity(world);

		entity.setComponent(new FishComponent());

		expect(function () {
			entity.setComponent(new BananaComponent());
		}).toThrow(new Error("Could not install method swim of BananaComponent as it is already taken"));

		entity.swim();

		expect(a).toEqual(123);
		expect(b).toEqual(0);
	});

	it('does not remove what it did not manage to install', function () {
		var a = 0;
		function FishComponent() {
			_Component.Component.apply(this, arguments);
			this.type = 'FishComponent';
			this.api = {
				swim: function swim() {
					a += 123;
				}
			};
		}
		FishComponent.prototype = Object.create(_Component.Component.prototype);

		var b = 0;
		function BananaComponent() {
			_Component.Component.apply(this, arguments);
			this.type = 'BananaComponent';
			this.api = {
				swim: function swim() {
					b += 234;
				}
			};
		}
		BananaComponent.prototype = Object.create(_Component.Component.prototype);

		var entity = new _Entity.Entity(world);

		entity.setComponent(new FishComponent());

		expect(function () {
			entity.setComponent(new BananaComponent());
		}).toThrow(new Error("Could not install method swim of BananaComponent as it is already taken"));

		entity.clearComponent('BananaComponent');

		expect(entity.swim).toBeTruthy();

		entity.swim();

		expect(a).toEqual(123);
	});

	//! AT: these should stay in their respective component test files
	it('returns itself after calling set()', function () {
		var entity = new _Entity.Entity(world);
		var translation = [1, 2, 3];
		var sameEntity = entity.set(translation);

		expect(sameEntity).toEqual(entity);
	});

	it('sets a TransformComponent', function () {
		var entity = new _Entity.Entity(world);
		var transformComponent = new _TransformComponent.TransformComponent();
		entity.set(transformComponent);

		expect(entity.transformComponent).toBe(transformComponent);
	});

	// ---
	it('sets a MeshDataComponent when trying to add a mesh', function () {
		var entity = new _Entity.Entity(world);
		var meshData = new _Box.Box();
		entity.set(meshData);

		expect(entity.meshDataComponent).toBeTruthy();
		expect(entity.meshDataComponent.meshData).toEqual(meshData);
	});

	it('sets a MeshRendererComponent when trying to add a material', function () {
		var entity = new _Entity.Entity(world);
		var material = new _Material.Material(ShaderLib.simple);
		entity.set(material);

		expect(entity.meshRendererComponent).toBeTruthy();
		expect(entity.meshRendererComponent.materials).toEqual([material]);
	});

	it('sets a CameraComponent when trying to add a camera', function () {
		var entity = new _Entity.Entity(world);
		var camera = new _Camera.Camera();
		entity.set(camera);

		expect(entity.cameraComponent).toBeTruthy();
		expect(entity.cameraComponent.camera).toBe(camera);
	});

	it('sets a LightComponent when trying to add a light', function () {
		var entity = new _Entity.Entity(world);
		var light = new _PointLight.PointLight();
		entity.set(light);

		expect(entity.lightComponent).toBeTruthy();
		expect(entity.lightComponent.light).toBe(light);
	});

	it('sets a ScriptComponent when trying to some functions / objects with a run function', function () {
		var entity = new _Entity.Entity(world);
		var script1 = { run: function run() {} };
		var script2 = function script2() {};

		entity.set(script1, script2);

		expect(entity.scriptComponent).toBeTruthy();
		expect(entity.scriptComponent.scripts).toEqual([script1, { run: script2 }]);
	});

	/*
 //! AT: disputed
 it('cannot clear a transform component', function () {
 	var entity = world.createEntity();
 	entity.setComponent(new MeshDataComponent());
 	world.process();
 	entity.clearComponent('transformComponent');
 	world.process();
 	expect(entity.hasComponent('MeshDataComponent')).toBe(true);
 	expect(entity.hasComponent('TransformComponent')).toBe(true);
 });
 */

	it('can add components on a world-less entity', function () {
		var entity = new _Entity.Entity();
		entity.setComponent(new _CameraComponent.CameraComponent());
		expect(entity.cameraComponent).toBeTruthy();
	});

	it('can remove components on a world-less entity', function () {
		var entity = new _Entity.Entity();
		entity.setComponent(new _CameraComponent.CameraComponent());
		entity.clearComponent('CameraComponent');
		expect(entity.cameraComponent).toBeFalsy();
	});

	it("can pass a 'primitive engine object' to .set of a world-less entity", function () {
		var entity = new _Entity.Entity();
		entity.set([1, 2, 3]);
		// if we get here at least it doesn't blow up (like it used to)
		expect(true).toBeTruthy();

		//! AT: this should work too but requires a lot of changes
		// registered components should stay somewhere else than in worlds
		//expect(entity.cameraComponent).toBeTruthy();
	});

	describe('tags', function () {
		it('sets a tag on an entity', function () {
			var entity = new _Entity.Entity();
			entity.setTag('t1');
			expect(entity.hasTag('t1')).toBeTruthy();
			expect(entity.hasTag('t2')).toBeFalsy();
		});

		it('clears a tag on an entity', function () {
			var entity = new _Entity.Entity();
			entity.setTag('t1').setTag('t3');
			entity.clearTag('t1').clearTag('t2');
			expect(entity.hasTag('t1')).toBeFalsy();
			expect(entity.hasTag('t2')).toBeFalsy();
			expect(entity.hasTag('t3')).toBeTruthy();
		});
	});

	describe('attributes', function () {
		it('sets an attribute on an entity', function () {
			var entity = new _Entity.Entity();
			entity.setAttribute('a1', 123);

			expect(entity.hasAttribute('a1')).toBeTruthy();
			expect(entity.getAttribute('a1')).toEqual(123);

			expect(entity.hasAttribute('a2')).toBeFalsy();
			expect(entity.getAttribute('a2')).toBeUndefined();
		});

		it('clears an attribute on an entity', function () {
			var entity = new _Entity.Entity();
			entity.setAttribute('a1', 123).setAttribute('a3', 'asd');
			entity.clearAttribute('a1').clearAttribute('a2');

			expect(entity.hasAttribute('a1')).toBeFalsy();
			expect(entity.getAttribute('a1')).toBeUndefined();

			expect(entity.hasAttribute('a2')).toBeFalsy();
			expect(entity.getAttribute('a2')).toBeUndefined();

			expect(entity.hasAttribute('a3')).toBeTruthy();
			expect(entity.getAttribute('a3')).toEqual('asd');
		});
	});
});
