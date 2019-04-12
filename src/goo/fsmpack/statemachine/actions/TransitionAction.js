Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = TransitionAction /*id, settings*/;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function TransitionAction() {
	_Action2.default.apply(this, arguments);
}

TransitionAction.prototype = Object.create(_Action2.default.prototype);
TransitionAction.prototype.constructor = TransitionAction;

TransitionAction.external = {
	key: 'Transition',
	name: 'Transition',
	type: 'transitions',
	description: 'Transition to a selected state.',
	canTransition: true,
	parameters: [],
	transitions: [{
		key: 'transition',
		description: 'State to transition to.'
	}]
};

var labels = {
	transition: 'On Enter'
};

TransitionAction.getTransitionLabel = function (transitionKey /*, actionConfig*/) {
	return labels[transitionKey];
};

TransitionAction.prototype.enter = function (fsm) {
	fsm.send(this.transitions.transition);
};
module.exports = exports.default;
