'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HideAction = undefined;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

function HideAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

HideAction.prototype = Object.create(_Action.Action.prototype);
HideAction.prototype.constructor = HideAction;

HideAction.external = {
	key: 'Hide',
	name: 'Hide',
	type: 'display',
	description: 'Hides an entity and its children.',
	parameters: [],
	transitions: []
};

HideAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	entity.hide();
};

var exported_HideAction = HideAction;
exports.HideAction = exported_HideAction;
