import { Action as Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { Matrix3 as Matrix3js } from "../../../math/Matrix3";
import { Quaternion as Quaternionjs } from "../../../math/Quaternion";
import { MathUtils as MathUtilsjs } from "../../../math/MathUtils";

function SetRigidBodyRotationAction/*id, settings*/() {
	Actionjs.apply(this, arguments);
}

SetRigidBodyRotationAction.prototype = Object.create(Actionjs.prototype);
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
	var matrix = new Matrix3js();
	var matrix2 = new Matrix3js();
	var quaternion = new Quaternionjs();
	var quaternion2 = new Quaternionjs();
	var DEG_TO_RAD = MathUtilsjs.DEG_TO_RAD;
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

var exported_SetRigidBodyRotationAction = SetRigidBodyRotationAction;
export { exported_SetRigidBodyRotationAction as SetRigidBodyRotationAction };