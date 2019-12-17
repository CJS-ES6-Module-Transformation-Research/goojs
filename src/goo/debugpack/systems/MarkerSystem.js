Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MarkerSystem = undefined;

var _System = require("../../entities/systems/System");

var _Material = require("../../renderer/Material");

var _ShaderLib = require("../../renderer/shaders/ShaderLib");

var ShaderLib = _interopRequireWildcard(_ShaderLib);

var _Renderer = require("../../renderer/Renderer");

var _Transform = require("../../math/Transform");

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

var exported_MarkerSystem = MarkerSystem;
function MarkerSystem(goo) {
	_System.System.call(this, 'MarkerSystem', ['MarkerComponent']);

	this.material = new _Material.Material(ShaderLib.simpleColored);
	this.material.depthState.enabled = false;
	this.material.shader.uniforms.color = [0.0, 1.0, 0.0];

	this.goo = goo;
	this.renderer = this.goo.renderer;

	this.entities = [];

	// drawing needs to be performed AFTER the render system completes its execution
	this.goo.callbacks.push(function () {
		for (var i = 0; i < this.entities.length; i++) {
			var entity = this.entities[i];
			if (entity.hasComponent('MarkerComponent')) {
				var transform = new _Transform.Transform();
				transform.copy(entity.transformComponent.sync().worldTransform);
				transform.setRotationXYZ(0, 0, 0);
				transform.scale.setDirect(1, 1, 1);
				transform.update();

				var renderableMarker = {
					meshData: entity.markerComponent.meshData,
					materials: [this.material],
					transform: transform
				};

				this.goo.renderer.render(renderableMarker, _Renderer.Renderer.mainCamera, [], null, false);
			}
		}
	}.bind(this));
}

MarkerSystem.prototype = Object.create(_System.System.prototype);

MarkerSystem.prototype.process = function (entities) {
	this.entities = entities;
};

/**
 * Processes all entities with a marker component
 * @extends System
 */
exports.MarkerSystem = exported_MarkerSystem;
