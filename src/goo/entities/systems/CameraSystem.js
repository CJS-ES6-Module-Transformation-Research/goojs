Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = CameraSystem;

var _System = require("../../entities/systems/System");

var _System2 = _interopRequireDefault(_System);

var _SystemBus = require("../../entities/SystemBus");

var _SystemBus2 = _interopRequireDefault(_SystemBus);

var _Renderer = require("../../renderer/Renderer");

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Updates cameras/cameracomponents with their transform component transforms
 * @extends System
 */
function CameraSystem() {
	_System2.default.call(this, 'CameraSystem', ['TransformComponent', 'CameraComponent']);
	this.mainCamera = null; //! AT: what's up with this? is it unused?
}

CameraSystem.prototype = Object.create(_System2.default.prototype);
CameraSystem.prototype.constructor = CameraSystem;

/**
 * Sets the Renderer's main camera to be the first camera of the CameraComponents
 * in the currently active entities of this system.
 */
CameraSystem.prototype.findMainCamera = function () {
	if (this._activeEntities.length) {
		var firstEntity = this._activeEntities[0];
		_SystemBus2.default.emit('goo.setCurrentCamera', {
			camera: firstEntity.cameraComponent.camera,
			entity: firstEntity
		});
	}
};

CameraSystem.prototype.inserted = function (entity) {
	if (!_Renderer2.default.mainCamera) {
		_SystemBus2.default.emit('goo.setCurrentCamera', {
			camera: entity.cameraComponent.camera,
			entity: entity
		});
	}
};

CameraSystem.prototype.deleted = function () {
	//! AT: leaving it like this until a better solution is found
	// apparently it might conflict with the new loader scheme
	//this.findMainCamera();
};

CameraSystem.prototype.onPreRender = function () {
	for (var i = 0; i < this._activeEntities.length; i++) {
		var entity = this._activeEntities[i];
		var transformComponent = entity.transformComponent;
		var cameraComponent = entity.cameraComponent;
		transformComponent.sync();
		if (cameraComponent._transformDirty) {
			cameraComponent.updateCamera(transformComponent.worldTransform);
			cameraComponent._transformDirty = false;
		}
	}
};
module.exports = exports.default;
