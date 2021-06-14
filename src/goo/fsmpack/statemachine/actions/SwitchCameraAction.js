var mod_SwitchCameraAction = SwitchCameraAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";
import { SystemBusjs as SystemBus } from "../../../entities/SystemBus";
import { mainCamera as Rendererjs_mainCamera } from "../../../renderer/Renderer";

function SwitchCameraAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
	this._camera = null;
}

SwitchCameraAction.prototype = Object.create(Action_Action.prototype);
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
	this._camera = Rendererjs_mainCamera; // make this into get activeCamera
};

SwitchCameraAction.prototype.enter = function (fsm) {
	var world = fsm.getOwnerEntity()._world;
	var cameraEntity = world.entityManager.getEntityById(this.cameraEntityRef);
	if (cameraEntity && cameraEntity.cameraComponent) {
		SystemBus.emit('goo.setCurrentCamera', {
			camera: cameraEntity.cameraComponent.camera,
			entity: cameraEntity
		});
	}
};

SwitchCameraAction.prototype.cleanup = function (/*fsm*/) {
};

export { mod_SwitchCameraAction as SwitchCameraAction };