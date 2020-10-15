"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SetRotationAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _FsmUtils = require("../../../fsmpack/statemachine/FsmUtils");

var SetRotationAction_SetRotationAction = SetRotationAction;

function SetRotationAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

SetRotationAction.prototype = Object.create(_Action.Action.prototype);
SetRotationAction.prototype.constructor = SetRotationAction;

SetRotationAction.prototype.configure = function (settings) {
	this.everyFrame = !!settings.everyFrame;
	this.entity = settings.entity || null;
	this.amountX = settings.amountX || 0;
	this.amountY = settings.amountY || 0;
	this.amountZ = settings.amountZ || 0;
};

SetRotationAction.external = {
	name: 'Set Rotation',
	key: 'Set Rotation',
	parameters: [{
		name: 'Entity',
		key: 'entity',
		type: 'entity',
		description: 'Entity to move.'
	}, {
		name: 'Amount X',
		key: 'amountX',
		type: 'float',
		description: 'Amount to rotate on the X axis.',
		'default': 0
	}, {
		name: 'Amount Y',
		key: 'amountY',
		type: 'float',
		description: 'Amount to rotate on the Y axis.',
		'default': 0
	}, {
		name: 'Amount Z',
		key: 'amountZ',
		type: 'float',
		description: 'Amount to rotate on the Z axis.',
		'default': 0
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': true
	}],
	transitions: []
};

SetRotationAction.prototype.setRotation = function (fsm) {
	if (this.entity !== null) {
		this.entity.transformComponent.transform.setRotationXYZ(_FsmUtils.FsmUtils.getValue(this.amountX, fsm), _FsmUtils.FsmUtils.getValue(this.amountY, fsm), _FsmUtils.FsmUtils.getValue(this.amountZ, fsm));
		this.entity.transformComponent.setUpdated();
	}
};

SetRotationAction.prototype.enter = function (fsm) {
	if (!this.everyFrame) {
		this.setRotation(fsm);
	}
};

SetRotationAction.prototype.update = function (fsm) {
	if (this.everyFrame) {
		this.setRotation(fsm);
	}
};

exports.SetRotationAction = SetRotationAction_SetRotationAction;