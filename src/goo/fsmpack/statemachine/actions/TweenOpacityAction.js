Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TweenOpacityAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Easing = require("../../../util/Easing");

var Easing = _interopRequireWildcard(_Easing);

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

var exported_TweenOpacityAction = TweenOpacityAction;

function TweenOpacityAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
	this.completed = false;
}

TweenOpacityAction.prototype = Object.create(_Action.Action.prototype);
TweenOpacityAction.prototype.constructor = TweenOpacityAction;

TweenOpacityAction.external = {
	key: 'Tween Opacity',
	name: 'Tween Material Opacity',
	type: 'texture',
	description: 'Tweens the opacity of a material.',
	parameters: [{
		name: 'Opacity',
		key: 'to',
		type: 'float',
		control: 'spinner',
		description: 'Opacity.',
		'default': 1
	}, {
		name: 'Time (ms)',
		key: 'time',
		type: 'float',
		control: 'spinner',
		description: 'Time it takes for the transition to complete.',
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
		description: 'State to transition to when the transition completes.'
	}]
};

TweenOpacityAction.getTransitionLabel = function (transitionKey /*, actionConfig*/) {
	return transitionKey === 'complete' ? 'On Tween Opacity Complete' : undefined;
};

TweenOpacityAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var meshRendererComponent = entity.meshRendererComponent;
	if (!meshRendererComponent) {
		return;
	}

	this.startTime = fsm.getTime();

	this.material = meshRendererComponent.materials[0];
	if (this.material.blendState.blending === 'NoBlending') {
		this.material.blendState.blending = 'TransparencyBlending';
	}
	if (this.material.renderQueue < 2000) {
		this.material.renderQueue = 2000;
	}
	if (this.material.uniforms.opacity === undefined) {
		this.material.uniforms.opacity = 1;
	}

	this.uniforms = this.material.uniforms;
	this.from = this.uniforms.opacity;
	this.completed = false;
};

TweenOpacityAction.prototype.update = function (fsm) {
	if (this.completed) {
		return;
	}
	var entity = fsm.getOwnerEntity();
	var meshRendererComponent = entity.meshRendererComponent;
	if (!meshRendererComponent) {
		return;
	}

	var t = Math.min((fsm.getTime() - this.startTime) * 1000 / this.time, 1);
	var fT = Easing[this.easing1][this.easing2](t);

	this.uniforms.opacity = MathUtils.lerp(fT, this.from, this.to);

	if (t >= 1) {
		fsm.send(this.transitions.complete);
		this.completed = true;
	}
};

exports.TweenOpacityAction = exported_TweenOpacityAction;
