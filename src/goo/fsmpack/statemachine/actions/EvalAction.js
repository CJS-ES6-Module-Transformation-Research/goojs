import { Action as fsmpackstatemachineactionsAction_Actionjs } from "../../../fsmpack/statemachine/actions/Action";

function EvalAction/*id, settings*/() {
	fsmpackstatemachineactionsAction_Actionjs.apply(this, arguments);

	this.expressionFunction = null;
}

EvalAction.prototype = Object.create(fsmpackstatemachineactionsAction_Actionjs.prototype);
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

var exported_EvalAction = EvalAction;
export { exported_EvalAction as EvalAction };