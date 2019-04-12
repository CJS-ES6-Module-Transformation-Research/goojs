Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ApplyTorqueAction /*id, settings*/;

var _Action = require("./Action");

var _Action2 = _interopRequireDefault(_Action);

var _Vector = require("../../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

var _SystemBus = require("../../../entities/SystemBus");

var _SystemBus2 = _interopRequireDefault(_SystemBus);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function ApplyTorqueAction() {
	_Action2.default.apply(this, arguments);
}

ApplyTorqueAction.prototype = Object.create(_Action2.default.prototype);
ApplyTorqueAction.prototype.constructor = ApplyTorqueAction;

ApplyTorqueAction.external = {
	key: 'ApplyTorque',
	name: 'Apply torque on rigid body',
	type: 'physics',
	description: 'Apply a torque to the attached rigid body.',
	canTransition: false,
	parameters: [{
		name: 'Torque',
		key: 'torque',
		type: 'position',
		description: 'Torque to apply to the body.',
		'default': [0, 0, 0]
	}, {
		name: 'Space',
		key: 'space',
		type: 'string',
		control: 'dropdown',
		description: 'Whether to apply the torque in local or world space.',
		'default': 'World',
		options: ['World', 'Local']
	}],
	transitions: []
};

var torqueVector = new _Vector2.default();
ApplyTorqueAction.prototype.enter = function (fsm) {
	_SystemBus2.default.addListener('goo.physics.substep', this.substepListener = function () {
		var entity = fsm.getOwnerEntity();
		if (!entity || !entity.rigidBodyComponent) {
			return;
		}

		torqueVector.setArray(this.torque);
		if (this.space === 'World') {
			entity.rigidBodyComponent.applyTorque(torqueVector);
		} else {
			entity.rigidBodyComponent.applyTorqueLocal(torqueVector);
		}
	}.bind(this));
};

ApplyTorqueAction.prototype.exit = function () {
	_SystemBus2.default.removeListener('goo.physics.substep', this.substepListener);
};
module.exports = exports.default;
