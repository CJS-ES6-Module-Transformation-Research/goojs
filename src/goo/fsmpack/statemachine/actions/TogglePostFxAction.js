'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TogglePostFxAction = undefined;

var _Action = require('./Action');

var TogglePostFxAction_TogglePostFxAction = TogglePostFxAction;

function TogglePostFxAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

TogglePostFxAction.prototype = Object.create(_Action.Action.prototype);
TogglePostFxAction.prototype.constructor = TogglePostFxAction;

TogglePostFxAction.external = {
	key: 'Toggle Post FX',
	name: 'Toggle Post FX',
	type: 'fx',
	description: 'Enabled/disables post fx globally.',
	parameters: [{
		name: 'Set Post FX state',
		key: 'enabled',
		type: 'boolean',
		description: 'Set Post FX on/off.',
		'default': true
	}],
	transitions: []
};

TogglePostFxAction.prototype.enter = function (fsm) {
	var renderSystem = fsm.getWorld().gooRunner.renderSystem;
	if (renderSystem) {
		renderSystem.enableComposers(this.enabled);
	}
};

exports.TogglePostFxAction = TogglePostFxAction_TogglePostFxAction;