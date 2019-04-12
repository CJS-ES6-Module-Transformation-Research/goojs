Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SetRigidBodyVelocityAction /*id, settings*/;

var _Action = require("./Action");

var _Action2 = _interopRequireDefault(_Action);

var _Vector = require("./../../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function SetRigidBodyVelocityAction() {
	_Action2.default.apply(this, arguments);
}

SetRigidBodyVelocityAction.prototype = Object.create(_Action2.default.prototype);
SetRigidBodyVelocityAction.prototype.constructor = SetRigidBodyVelocityAction;

SetRigidBodyVelocityAction.external = {
	key: 'Set Rigid Body Velocity',
	name: 'Set Rigid Body Velocity',
	type: 'physics',
	description: 'Set the linear velocity of the rigid body component.',
	canTransition: false,
	parameters: [{
		name: 'Velocity',
		key: 'velocity',
		type: 'position',
		description: 'Velocity to set.',
		'default': [0, 0, 0]
	}],
	transitions: []
};

var tmpVector = new _Vector2.default();
SetRigidBodyVelocityAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.rigidBodyComponent) {
		return;
	}
	tmpVector.setArray(this.velocity);
	entity.rigidBodyComponent.setVelocity(tmpVector);
};
module.exports = exports.default;
