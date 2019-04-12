Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SetRigidBodyAngularVelocityAction /*id, settings*/;

var _Action = require("./Action");

var _Action2 = _interopRequireDefault(_Action);

var _Vector = require("./../../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function SetRigidBodyAngularVelocityAction() {
	_Action2.default.apply(this, arguments);
}

SetRigidBodyAngularVelocityAction.prototype = Object.create(_Action2.default.prototype);
SetRigidBodyAngularVelocityAction.prototype.constructor = SetRigidBodyAngularVelocityAction;

SetRigidBodyAngularVelocityAction.external = {
	key: 'Set Rigid Body Angular Velocity',
	name: 'Set Rigid Body Angular Velocity',
	type: 'physics',
	description: 'Set the angular velocity of the rigid body component.',
	canTransition: false,
	parameters: [{
		name: 'Angular velocity',
		key: 'velocity',
		type: 'position',
		description: 'Angular velocity to set.',
		'default': [0, 0, 0]
	}],
	transitions: []
};

var tmpVector = new _Vector2.default();
SetRigidBodyAngularVelocityAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.rigidBodyComponent) {
		return;
	}
	tmpVector.setArray(this.velocity);
	entity.rigidBodyComponent.setAngularVelocity(tmpVector);
};
module.exports = exports.default;
