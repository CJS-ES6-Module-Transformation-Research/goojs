Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = LookAtAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _Vector = require("../../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function LookAtAction() {
	_Action2.default.apply(this, arguments);
}

LookAtAction.prototype = Object.create(_Action2.default.prototype);
LookAtAction.prototype.constructor = LookAtAction;

LookAtAction.external = {
	key: 'Look At',
	name: 'Look At',
	type: 'animation',
	description: 'Reorients an entity so that it\'s facing a specific point.',
	parameters: [{
		name: 'Look at',
		key: 'lookAt',
		type: 'position',
		description: 'Position to look at.',
		'default': [0, 0, 0]
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': true
	}],
	transitions: []
};

LookAtAction.prototype.doLookAt = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var transformComponent = entity.transformComponent;

	transformComponent.transform.lookAt(new _Vector2.default(this.lookAt), _Vector2.default.UNIT_Y);
	transformComponent.setUpdated();
};

LookAtAction.prototype.enter = function (fsm) {
	if (!this.everyFrame) {
		this.doLookAt(fsm);
	}
};

LookAtAction.prototype.update = function (fsm) {
	if (this.everyFrame) {
		this.doLookAt(fsm);
	}
};
module.exports = exports.default;
