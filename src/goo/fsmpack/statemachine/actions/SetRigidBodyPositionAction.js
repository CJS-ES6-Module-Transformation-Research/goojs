Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SetRigidBodyPositionAction /*id, settings*/;

var _Action = require("./Action");

var _Action2 = _interopRequireDefault(_Action);

var _Vector = require("./../../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function SetRigidBodyPositionAction() {
	_Action2.default.apply(this, arguments);
}

SetRigidBodyPositionAction.prototype = Object.create(_Action2.default.prototype);
SetRigidBodyPositionAction.prototype.constructor = SetRigidBodyPositionAction;

SetRigidBodyPositionAction.external = {
	key: 'Set Rigid Body Position',
	name: 'Set Rigid Body Position',
	type: 'physics',
	description: 'Set the position of the rigid body.',
	canTransition: false,
	parameters: [{
		name: 'Position',
		key: 'position',
		type: 'position',
		description: 'Absolute world position to set.',
		'default': [0, 0, 0]
	}],
	transitions: []
};

var tmpVector = new _Vector2.default();
SetRigidBodyPositionAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (!entity || !entity.rigidBodyComponent) {
		return;
	}
	tmpVector.setArray(this.position);
	entity.rigidBodyComponent.setPosition(tmpVector);
};
module.exports = exports.default;
