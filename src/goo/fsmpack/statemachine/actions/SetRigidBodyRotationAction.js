Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SetRigidBodyRotationAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _Matrix = require("../../../math/Matrix3");

var _Matrix2 = _interopRequireDefault(_Matrix);

var _Quaternion = require("../../../math/Quaternion");

var _Quaternion2 = _interopRequireDefault(_Quaternion);

var _MathUtils = require("../../../math/MathUtils");

var _MathUtils2 = _interopRequireDefault(_MathUtils);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function SetRigidBodyRotationAction() {
	_Action2.default.apply(this, arguments);
}

SetRigidBodyRotationAction.prototype = Object.create(_Action2.default.prototype);
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
	var matrix = new _Matrix2.default();
	var matrix2 = new _Matrix2.default();
	var quaternion = new _Quaternion2.default();
	var quaternion2 = new _Quaternion2.default();
	var DEG_TO_RAD = _MathUtils2.default.DEG_TO_RAD;
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
module.exports = exports.default;
