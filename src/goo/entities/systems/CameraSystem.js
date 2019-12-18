Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CameraSystem = undefined;

var _System = require("../../entities/systems/System");

var _SystemBus = require("../../entities/SystemBus");

var SystemBus = _interopRequireWildcard(_SystemBus);

var _Renderer = require("../../renderer/Renderer");

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

var exported_CameraSystem = CameraSystem;
function CameraSystem() {
	_System.System.call(this, 'CameraSystem', ['TransformComponent', 'CameraComponent']);
	this.mainCamera = null; //! AT: what's up with this? is it unused?
}

CameraSystem.prototype = Object.create(_System.System.prototype);
CameraSystem.prototype.constructor = CameraSystem;

/**
 * Sets the Renderer's main camera to be the first camera of the CameraComponents
 * in the currently active entities of this system.
 */
CameraSystem.prototype.findMainCamera = function () {
	if (this._activeEntities.length) {
		var firstEntity = this._activeEntities[0];
		SystemBus.emit('goo.setCurrentCamera', {
			camera: firstEntity.cameraComponent.camera,
			entity: firstEntity
		});
	}
};

CameraSystem.prototype.inserted = function (entity) {
	if (!_Renderer.Renderer.mainCamera) {
		SystemBus.emit('goo.setCurrentCamera', {
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

/**
 * Updates cameras/cameracomponents with their transform component transforms
 * @extends System
 */
exports.CameraSystem = exported_CameraSystem;
