import { Action } from "../../../fsmpack/statemachine/actions/Action";
var exported_EvalAction = EvalAction;

function EvalAction/*id, settings*/() {
	Action.apply(this, arguments);

	this.expressionFunction = null;
}

EvalAction.prototype = Object.create(Action.prototype);
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

export { exported_EvalAction as EvalAction };