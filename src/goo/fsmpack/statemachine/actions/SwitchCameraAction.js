import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { SystemBusjs as entitiesSystemBus_SystemBusjsjs } from "../../../entities/SystemBus";
import { Renderer as rendererRenderer_Rendererjs } from "../../../renderer/Renderer";

function SwitchCameraAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
	this._camera = null;
}

SwitchCameraAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
SwitchCameraAction.prototype.constructor = SwitchCameraAction;

SwitchCameraAction.external = {
	key: 'Switch Camera',
	name: 'Switch Camera',
	type: 'camera',
	description: 'Switches to a selected camera.',
	parameters: [{
		name: 'Camera',
		key: 'cameraEntityRef',
		type: 'camera',
		description: 'Camera to switch to.',
		'default': null
	}],
	transitions: []
};

SwitchCameraAction.prototype.ready = function (/*fsm*/) {
	this._camera = rendererRenderer_Rendererjs.mainCamera; // make this into get activeCamera
};

SwitchCameraAction.prototype.enter = function (fsm) {
	var world = fsm.getOwnerEntity()._world;
	var cameraEntity = world.entityManager.getEntityById(this.cameraEntityRef);
	if (cameraEntity && cameraEntity.cameraComponent) {
		entitiesSystemBus_SystemBusjsjs.emit('goo.setCurrentCamera', {
			camera: cameraEntity.cameraComponent.camera,
			entity: cameraEntity
		});
	}
};

SwitchCameraAction.prototype.cleanup = function (/*fsm*/) {
};

var exported_SwitchCameraAction = SwitchCameraAction;
export { exported_SwitchCameraAction as SwitchCameraAction };