Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SetRigidBodyRotationAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Matrix = require("../../../math/Matrix3");

var _Quaternion = require("../../../math/Quaternion");

var _MathUtils = require("../../../math/MathUtils");

var MathUtils = _interopRequireWildcard(_MathUtils);

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

function SetRigidBodyRotationAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

SetRigidBodyRotationAction.prototype = Object.create(_Action.Action.prototype);
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
	}, {
		name: 'Relative',
		key: 'relative',
		type: 'boolean',
		description: 'Relative to the current rotation or absolute.',
		'default': false
	}],
	transitions: []
};

SetRigidBodyRotationAction.prototype.setRotation = function () {
	var matrix = new _Matrix.Matrix3();
	var matrix2 = new _Matrix.Matrix3();
	var quaternion = new _Quaternion.Quaternion();
	var quaternion2 = new _Quaternion.Quaternion();
	var DEG_TO_RAD = MathUtils.DEG_TO_RAD;
	return function (fsm) {
		var entity = fsm.getOwnerEntity();
		if (entity && entity.rigidBodyComponent) {
			var rotation = this.rotation;
			matrix.fromAngles(rotation[0] * DEG_TO_RAD, rotation[1] * DEG_TO_RAD, rotation[2] * DEG_TO_RAD);

			if (this.relative) {
				entity.rigidBodyComponent.getQuaternion(quaternion2);
				matrix2.copyQuaternion(quaternion2);
				matrix.mul2(matrix2, matrix);
			}

			quaternion.fromRotationMatrix(matrix);
			entity.rigidBodyComponent.setQuaternion(quaternion);
		}
	};
}();

SetRigidBodyRotationAction.prototype.enter = function (fsm) {
	this.setRotation(fsm);
};

var exported_SetRigidBodyRotationAction = SetRigidBodyRotationAction;
exports.SetRigidBodyRotationAction = exported_SetRigidBodyRotationAction;
