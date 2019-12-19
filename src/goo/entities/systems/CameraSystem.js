import { System } from "../../entities/systems/System";
import { anonymus as SystemBus } from "../../entities/SystemBus";
import { Renderer } from "../../renderer/Renderer";
function CameraSystem() {
	System.call(this, 'CameraSystem', ['TransformComponent', 'CameraComponent']);
	this.mainCamera = null; //! AT: what's up with this? is it unused?
}

CameraSystem.prototype = Object.create(System.prototype);
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
	if (!Renderer.mainCamera) {
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

var exported_CameraSystem = CameraSystem;

/**
 * Updates cameras/cameracomponents with their transform component transforms
 * @extends System
 */
export { exported_CameraSystem as CameraSystem };