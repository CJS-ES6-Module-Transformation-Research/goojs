Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = TweenRotationAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _Quaternion = require("../../../math/Quaternion");

var _Quaternion2 = _interopRequireDefault(_Quaternion);

var _Matrix = require("../../../math/Matrix3");

var _Matrix2 = _interopRequireDefault(_Matrix);

var _MathUtils = require("../../../math/MathUtils");

var _MathUtils2 = _interopRequireDefault(_MathUtils);

var _Easing = require("../../../util/Easing");

var _Easing2 = _interopRequireDefault(_Easing);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function TweenRotationAction() {
	_Action2.default.apply(this, arguments);

	this.quatFrom = new _Quaternion2.default();
	this.quatTo = new _Quaternion2.default();
	this.quatFinal = new _Quaternion2.default();
	this.completed = false;
}

TweenRotationAction.prototype = Object.create(_Action2.default.prototype);
TweenRotationAction.prototype.constructor = TweenRotationAction;

TweenRotationAction.external = {
	key: 'Tween Rotation',
	name: 'Tween Rotate',
	type: 'animation',
	description: 'Transition to the set rotation, in angles.',
	canTransition: true,
	parameters: [{
		name: 'Rotation',
		key: 'to',
		type: 'rotation',
		description: 'Rotation.',
		'default': [0, 0, 0]
	}, {
		name: 'Relative',
		key: 'relative',
		type: 'boolean',
		description: 'If true add, otherwise set.',
		'default': true
	}, {
		name: 'Time (ms)',
		key: 'time',
		type: 'float',
		description: 'Time it takes for this movement to complete.',
		'default': 1000
	}, {
		name: 'Easing type',
		key: 'easing1',
		type: 'string',
		control: 'dropdown',
		description: 'Easing type.',
		'default': 'Linear',
		options: ['Linear', 'Quadratic', 'Exponential', 'Circular', 'Elastic', 'Back', 'Bounce']
	}, {
		name: 'Direction',
		key: 'easing2',
		type: 'string',
		control: 'dropdown',
		description: 'Easing direction.',
		'default': 'In',
		options: ['In', 'Out', 'InOut']
	}],
	transitions: [{
		key: 'complete',
		description: 'State to transition to when the rotation completes.'
	}]
};

TweenRotationAction.getTransitionLabel = function (transitionKey /*, actionConfig*/) {
	return transitionKey === 'complete' ? 'On Tween Rotation Complete' : undefined;
};

TweenRotationAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var transformComponent = entity.transformComponent.sync();

	this.startTime = fsm.getTime();

	this.quatFrom.fromRotationMatrix(transformComponent.transform.rotation);
	this.quatTo.fromRotationMatrix(new _Matrix2.default().fromAngles(this.to[0] * _MathUtils2.default.DEG_TO_RAD, this.to[1] * _MathUtils2.default.DEG_TO_RAD, this.to[2] * _MathUtils2.default.DEG_TO_RAD));
	if (this.relative) {
		this.quatTo.mul(this.quatFrom);
	}
	this.completed = false;
};

TweenRotationAction.prototype.update = function (fsm) {
	if (this.completed) {
		return;
	}
	var entity = fsm.getOwnerEntity();
	var transform = entity.transformComponent.sync().transform;

	var t = Math.min((fsm.getTime() - this.startTime) * 1000 / this.time, 1);
	var fT = _Easing2.default[this.easing1][this.easing2](t);
	_Quaternion2.default.slerp(this.quatFrom, this.quatTo, fT, this.quatFinal);

	this.quatFinal.toRotationMatrix(transform.rotation);
	entity.transformComponent.setUpdated();

	if (t >= 1) {
		fsm.send(this.transitions.complete);
		this.completed = true;
	}
};
module.exports = exports.default;
