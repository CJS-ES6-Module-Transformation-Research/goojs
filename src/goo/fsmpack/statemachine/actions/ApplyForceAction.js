Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ApplyForceAction /*id, settings*/;

var _Action = require("./Action");

var _Action2 = _interopRequireDefault(_Action);

var _Vector = require("../../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

var _SystemBus = require("../../../entities/SystemBus");

var _SystemBus2 = _interopRequireDefault(_SystemBus);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function ApplyForceAction() {
	_Action2.default.apply(this, arguments);
}

ApplyForceAction.prototype = Object.create(_Action2.default.prototype);
ApplyForceAction.prototype.constructor = ApplyForceAction;

ApplyForceAction.external = {
	key: 'ApplyForce',
	name: 'Apply force on rigid body',
	type: 'physics',
	description: 'Apply a force to the attached rigid body.',
	canTransition: false,
	parameters: [{
		name: 'Force',
		key: 'force',
		type: 'position',
		description: 'Force to apply to the body.',
		'default': [0, 0, 0]
	}, {
		name: 'Apply point',
		key: 'point',
		type: 'position',
		description: 'Where on the body to apply the force, relative to the center of mass.',
		'default': [0, 0, 0]
	}, {
		name: 'Space',
		key: 'space',
		type: 'string',
		control: 'dropdown',
		description: 'The space where the force and apply point are defined.',
		'default': 'World',
		options: ['World', 'Local']
	}],
	transitions: []
};

var forceVector = new _Vector2.default();
var applyPoint = new _Vector2.default();
ApplyForceAction.prototype.enter = function (fsm) {
	_SystemBus2.default.addListener('goo.physics.substep', this.substepListener = function () {
		var entity = fsm.getOwnerEntity();
		if (!entity || !entity.rigidBodyComponent) {
			return;
		}

		forceVector.setArray(this.force);
		applyPoint.setArray(this.point);
		if (this.space === 'World') {
			entity.rigidBodyComponent.applyForce(forceVector, applyPoint);
		} else {
			entity.rigidBodyComponent.applyForceLocal(forceVector, applyPoint);
		}
	}.bind(this));
};

ApplyForceAction.prototype.exit = function () {
	_SystemBus2.default.removeListener('goo.physics.substep', this.substepListener);
};
module.exports = exports.default;
