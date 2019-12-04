import { Action } from "../../../fsmpack/statemachine/actions/Action";
import { Matrix3 } from "../../../math/Matrix3";
import { Quaternion } from "../../../math/Quaternion";
import * as MathUtils from "../../../math/MathUtils";
var exported_SetRigidBodyRotationAction = SetRigidBodyRotationAction;

function SetRigidBodyRotationAction/*id, settings*/() {
	Action.apply(this, arguments);
}

SetRigidBodyRotationAction.prototype = Object.create(Action.prototype);
SetRigidBodyRotationAction.prototype.constructor = SetRigidBodyRotationAction;

SetRigidBodyRotationAction.external = {
	key: 'setRigidBodyRotation',
	name: 'Set Rigid Body Rotation',
	type: 'physics',
	canTransition: false,
	parameters: [{
		name: 'Rotation',
		key: 'rotation',
		type: 'vec3',
		description: 'Absolute rotation to set.',
		'default': [0, 0, 0]
	},{
		name: 'Relative',
		key: 'relative',
		type: 'boolean',
		description: 'Relative to the current rotation or absolute.',
		'default': false
	}],
	transitions: []
};

SetRigidBodyRotationAction.prototype.setRotation = (function () {
	var matrix = new Matrix3();
	var matrix2 = new Matrix3();
	var quaternion = new Quaternion();
	var quaternion2 = new Quaternion();
	var DEG_TO_RAD = MathUtils.DEG_TO_RAD;
	return function (fsm) {
		var entity = fsm.getOwnerEntity();
		if (entity && entity.rigidBodyComponent) {
			var rotation = this.rotation;
			matrix.fromAngles(
				rotation[0] * DEG_TO_RAD,
				rotation[1] * DEG_TO_RAD,
				rotation[2] * DEG_TO_RAD
			);

			if (this.relative) {
				entity.rigidBodyComponent.getQuaternion(quaternion2);
				matrix2.copyQuaternion(quaternion2);
				matrix.mul2(matrix2, matrix);
			}

			quaternion.fromRotationMatrix(matrix);
			entity.rigidBodyComponent.setQuaternion(quaternion);
		}
	};
})();

SetRigidBodyRotationAction.prototype.enter = function (fsm) {
	this.setRotation(fsm);
};

export { exported_SetRigidBodyRotationAction as SetRigidBodyRotationAction };