Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = MarkerSystem;

var _System = require("../../entities/systems/System");

var _System2 = _interopRequireDefault(_System);

var _Material = require("../../renderer/Material");

var _Material2 = _interopRequireDefault(_Material);

var _ShaderLib = require("../../renderer/shaders/ShaderLib");

var _ShaderLib2 = _interopRequireDefault(_ShaderLib);

var _Renderer = require("../../renderer/Renderer");

var _Renderer2 = _interopRequireDefault(_Renderer);

var _Transform = require("../../math/Transform");

var _Transform2 = _interopRequireDefault(_Transform);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Processes all entities with a marker component
 * @extends System
 */
function MarkerSystem(goo) {
	_System2.default.call(this, 'MarkerSystem', ['MarkerComponent']);

	this.material = new _Material2.default(_ShaderLib2.default.simpleColored);
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
				var transform = new _Transform2.default();
				transform.copy(entity.transformComponent.sync().worldTransform);
				transform.setRotationXYZ(0, 0, 0);
				transform.scale.setDirect(1, 1, 1);
				transform.update();

				var renderableMarker = {
					meshData: entity.markerComponent.meshData,
					materials: [this.material],
					transform: transform
				};

				this.goo.renderer.render(renderableMarker, _Renderer2.default.mainCamera, [], null, false);
			}
		}
	}.bind(this));
}

MarkerSystem.prototype = Object.create(_System2.default.prototype);

MarkerSystem.prototype.process = function (entities) {
	this.entities = entities;
};
module.exports = exports.default;
