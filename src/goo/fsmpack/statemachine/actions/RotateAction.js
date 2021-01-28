"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RotateAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _MathUtils = require("../../../math/MathUtils");

var mod_RotateAction = RotateAction;

function RotateAction() /*id, settings*/{
	_Action.Action.apply(this, arguments);
}

RotateAction.prototype = Object.create(_Action.Action.prototype);
RotateAction.prototype.constructor = RotateAction;

RotateAction.external = {
	key: 'Rotate',
	name: 'Rotate',
	type: 'animation',
	description: 'Rotates the entity with the set angles (in degrees).',
	parameters: [{
		name: 'Rotation',
		key: 'rotation',
		type: 'rotation',
		description: 'Rotatation.',
		'default': [0, 0, 0]
	}, {
		name: 'Relative',
		key: 'relative',
		type: 'boolean',
		description: 'If true add to current rotation.',
		'default': true
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': true
	}],
	transitions: []
};

var DEG_TO_RAD = _MathUtils.MathUtils.DEG_TO_RAD;

RotateAction.prototype.applyRotation = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var transform = entity.transformComponent.sync().transform;

	var rotationX = this.rotation[0];
	var rotationY = this.rotation[1];
	var rotationZ = this.rotation[2];

	if (this.relative) {
		var rotationMatrix = transform.rotation;
		if (this.everyFrame) {
			var tpf = fsm.getTpf();
			rotationMatrix.rotateX(rotationX * DEG_TO_RAD * tpf);
			rotationMatrix.rotateY(rotationY * DEG_TO_RAD * tpf);
			rotationMatrix.rotateZ(rotationZ * DEG_TO_RAD * tpf);
		} else {
			rotationMatrix.rotateX(rotationX * DEG_TO_RAD);
			rotationMatrix.rotateY(rotationY * DEG_TO_RAD);
			rotationMatrix.rotateZ(rotationZ * DEG_TO_RAD);
		}
	} else {
		if (this.everyFrame) {
			var tpf = fsm.getTpf();
			transform.setRotationXYZ(rotationX * DEG_TO_RAD * tpf, rotationY * DEG_TO_RAD * tpf, rotationZ * DEG_TO_RAD * tpf);
		} else {
			transform.setRotationXYZ(rotationX * DEG_TO_RAD, rotationY * DEG_TO_RAD, rotationZ * DEG_TO_RAD);
		}
	}

	entity.transformComponent.setUpdated();
};

RotateAction.prototype.enter = function (fsm) {
	if (!this.everyFrame) {
		this.applyRotation(fsm);
	}
};

RotateAction.prototype.update = function (fsm) {
	if (this.everyFrame) {
		this.applyRotation(fsm);
	}
};

exports.RotateAction = mod_RotateAction;