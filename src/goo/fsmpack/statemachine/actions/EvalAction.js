var mod_EvalAction = EvalAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";

function EvalAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);

	this.expressionFunction = null;
}

EvalAction.prototype = Object.create(Action_Action.prototype);
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

export { mod_EvalAction as EvalAction };