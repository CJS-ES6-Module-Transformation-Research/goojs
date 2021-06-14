'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EvalAction = undefined;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

var mod_EvalAction = EvalAction;

function EvalAction() /*id, settings*/{
	_Action.Action.apply(this, arguments);

	this.expressionFunction = null;
}

EvalAction.prototype = Object.create(_Action.Action.prototype);
EvalAction.prototype.constructor = EvalAction;

EvalAction.external = {
	key: 'Eval',
	name: 'Eval',
	description: 'Evaluates a JS expression.',
	parameters: [{
		name: 'expression',
		key: 'expression',
		type: 'string',
		description: 'JavaScript expression to evaluate.',
		'default': ''
	}],
	transitions: []
};

EvalAction.prototype.enter = function () {
	this.expressionFunction = new Function('goo', this.expression);
};

EvalAction.prototype.update = function (fsm) {
	if (this.expressionFunction) {
		try {
			this.expressionFunction(fsm.getEvalProxy());
		} catch (e) {
			console.warn('Eval code error: ' + e.message);
		}
	}
};

exports.EvalAction = mod_EvalAction;