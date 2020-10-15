var SetRigidBodyRotationAction_SetRigidBodyRotationAction = SetRigidBodyRotationAction;
import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { Matrix3 as mathMatrix3_Matrix3js } from "../../../math/Matrix3";
import { Quaternion as mathQuaternion_Quaternionjs } from "../../../math/Quaternion";
import { MathUtils as mathMathUtils_MathUtilsjs } from "../../../math/MathUtils";

function SetRigidBodyRotationAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);
}

SetRigidBodyRotationAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
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
	var matrix = new mathMatrix3_Matrix3js();
	var matrix2 = new mathMatrix3_Matrix3js();
	var quaternion = new mathQuaternion_Quaternionjs();
	var quaternion2 = new mathQuaternion_Quaternionjs();
	var DEG_TO_RAD = mathMathUtils_MathUtilsjs.DEG_TO_RAD;
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

export { SetRigidBodyRotationAction_SetRigidBodyRotationAction as SetRigidBodyRotationAction };