Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LightingSystem = undefined;

var _Capabilities = require("../../renderer/Capabilities");

var _System = require("../../entities/systems/System");

var _SystemBus = require("../../entities/SystemBus");

var SystemBus = _interopRequireWildcard(_SystemBus);

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

var exported_LightingSystem = LightingSystem;
function LightingSystem() {
	_System.System.call(this, 'LightingSystem', ['LightComponent', 'TransformComponent']);

	this.overrideLights = null;

	this.lights = [];

	this._needsUpdate = true;
}

LightingSystem.prototype = Object.create(_System.System.prototype);
LightingSystem.prototype.constructor = LightingSystem;

/**
 * Replaces the lights tracked by the system with custom ones.
 * @param overrideLights
 */
LightingSystem.prototype.setOverrideLights = function (overrideLights) {
	this.overrideLights = overrideLights;
	SystemBus.emit('goo.setLights', this.overrideLights);
	this._needsUpdate = true;
};

/**
 * Disables overriding of lights tracked by the system
 */
LightingSystem.prototype.clearOverrideLights = function () {
	this.overrideLights = undefined;
	this._needsUpdate = true;
};

LightingSystem.prototype.inserted = function (entity) {
	entity.lightComponent.updateLight(entity.transformComponent.sync().worldTransform);
};

LightingSystem.prototype.process = function (entities) {
	// do we use this anymore?
	// we used to have this feature for the early days of create
	if (!this.overrideLights) {
		this.lights.length = 0;

		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			var transformComponent = entity.transformComponent;
			var lightComponent = entity.lightComponent;

			transformComponent.sync();
			if (lightComponent._transformDirty || this._needsUpdate) {
				lightComponent.updateLight(transformComponent.worldTransform);
				lightComponent._transformDirty = false;
			}

			if (!lightComponent.hidden) {
				var light = lightComponent.light;
				light.shadowCaster = light.shadowCaster && _Capabilities.Capabilities.TextureFloat; // Needs float texture for shadows (for now)
				this.lights.push(light);
			}
		}
		this._needsUpdate = false;
		SystemBus.emit('goo.setLights', this.lights);
	}
};

LightingSystem.prototype.invalidateHandles = function (renderer) {
	this._activeEntities.forEach(function (entity) {
		entity.lightComponent.light.invalidateHandles(renderer);
	});
};

/**
 * Processes all entities with a light component making sure that lights are placed according to its transforms<br>
 * @example-link http://code.gooengine.com/latest/visual-test/goo/renderer/light/Lights-vtest.html Working example
 * @extends System
 */
exports.LightingSystem = exported_LightingSystem;
