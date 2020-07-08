var CameraSystem_CameraSystem = CameraSystem;
import { System as entitiessystemsSystem_Systemjs } from "../../entities/systems/System";
import { SystemBusjs as entitiesSystemBus_SystemBusjsjs } from "../../entities/SystemBus";
import { mainCamera as Rendererjs_mainCamera } from "../../renderer/Renderer";
function CameraSystem() {
	entitiessystemsSystem_Systemjs.call(this, 'CameraSystem', ['TransformComponent', 'CameraComponent']);
	this.mainCamera = null; //! AT: what's up with this? is it unused?
}

CameraSystem.prototype = Object.create(entitiessystemsSystem_Systemjs.prototype);
CameraSystem.prototype.constructor = CameraSystem;

/**
 * Sets the Renderer's main camera to be the first camera of the CameraComponents
 * in the currently active entities of this system.
 */
CameraSystem.prototype.findMainCamera = function () {
	if (this._activeEntities.length) {
		var firstEntity = this._activeEntities[0];
		entitiesSystemBus_SystemBusjsjs.emit('goo.setCurrentCamera', {
			camera: firstEntity.cameraComponent.camera,
			entity: firstEntity
		});
	}
};

CameraSystem.prototype.inserted = function (entity) {
	if (!Rendererjs_mainCamera) {
		entitiesSystemBus_SystemBusjsjs.emit('goo.setCurrentCamera', {
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
export { CameraSystem_CameraSystem as CameraSystem };