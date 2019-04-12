Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = DollyZoomAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _Vector = require("../../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

var _MathUtils = require("../../../math/MathUtils");

var _MathUtils2 = _interopRequireDefault(_MathUtils);

var _Easing = require("../../../util/Easing");

var _Easing2 = _interopRequireDefault(_Easing);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function DollyZoomAction() {
	_Action2.default.apply(this, arguments);

	this.from = new _Vector2.default();
	this.to = new _Vector2.default();
	this.completed = false;
}

DollyZoomAction.prototype = Object.create(_Action2.default.prototype);
DollyZoomAction.prototype.constructor = DollyZoomAction;

DollyZoomAction.external = {
	key: 'Dolly Zoom',
	name: 'Dolly Zoom',
	type: 'camera',
	description: 'Performs dolly zoom.',
	parameters: [{
		name: 'Forward',
		key: 'forward',
		type: 'float',
		description: 'Number of units to move towards the focus point. Enter negative values to move away.',
		'default': 100
	}, {
		name: 'Focus point',
		key: 'lookAt',
		type: 'position',
		description: 'Point to focus on while transitioning.',
		'default': [0, 0, 0]
	}, {
		name: 'Time (ms)',
		key: 'time',
		type: 'float',
		description: 'Time.',
		'default': 10000
	}, {
		name: 'Easing type',
		key: 'easing1',
		type: 'string',
		control: 'dropdown',
		description: 'Easing.',
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
		description: 'State to transition to when the transition completes.'
	}]
};

DollyZoomAction.getTransitionLabel = function () /*transitionKey, actionConfig*/{
	return 'On Dolly Zoom Complete';
};

DollyZoomAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	this.completed = false;

	if (entity.cameraComponent && entity.cameraComponent.camera) {
		var transformComponent = entity.transformComponent;
		var translation = transformComponent.transform.translation;
		var camera = entity.cameraComponent.camera;

		this.fromDistance = new _Vector2.default(this.lookAt).distance(camera.translation);
		this.toDistance = this.fromDistance - this.forward;

		this.eyeTargetScale = Math.tan(camera.fov * (Math.PI / 180) / 2) * this.fromDistance;

		var initialTranslation = new _Vector2.default().copy(translation);
		var toVec = _Vector2.default.fromArray(this.lookAt).sub(initialTranslation).normalize().scale(this.forward).add(initialTranslation);

		this.from.set(initialTranslation.x, initialTranslation.y, initialTranslation.z);
		this.to.setDirect(toVec.x, toVec.y, toVec.z);

		this.startTime = fsm.getTime();
	} else {
		this.eyeTargetScale = null;
	}
};

DollyZoomAction.prototype.update = function (fsm) {
	if (this.completed) {
		return;
	}

	if (this.eyeTargetScale) {
		var entity = fsm.getOwnerEntity();
		var transformComponent = entity.transformComponent;
		var camera = entity.cameraComponent.camera;

		var t = Math.min((fsm.getTime() - this.startTime) * 1000 / this.time, 1);
		var fT = _Easing2.default[this.easing1][this.easing2](t);

		transformComponent.transform.translation.set(this.from).lerp(this.to, fT);
		transformComponent.setUpdated();

		var d = _MathUtils2.default.lerp(fT, this.fromDistance, this.toDistance);
		var fov = 180 / Math.PI * 2 * Math.atan(this.eyeTargetScale / d);
		camera.setFrustumPerspective(fov);

		if (t >= 1) {
			fsm.send(this.transitions.complete);
			this.completed = true;
		}
	}
};
module.exports = exports.default;
