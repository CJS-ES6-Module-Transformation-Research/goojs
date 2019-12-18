Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.NextFrameAction = undefined;

var _Action = require('./Action');

var exported_NextFrameAction = NextFrameAction;

function NextFrameAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

NextFrameAction.prototype = Object.create(_Action.Action.prototype);
NextFrameAction.prototype.constructor = NextFrameAction;

NextFrameAction.external = {
	key: 'transitionOnNextFrame',
	name: 'Transition on next frame',
	type: 'transitions',
	description: 'Transition to a selected state on the next frame.',
	canTransition: true,
	parameters: [],
	transitions: [{
		key: 'transition',
		name: 'On Next Frame',
		description: 'State to transition to on next frame.'
	}]
};

var labels = {
	transition: 'On Next Frame'
};

NextFrameAction.getTransitionLabel = function (transitionKey /*, actionConfig*/) {
	return labels[transitionKey];
};

NextFrameAction.prototype.update = function (fsm) {
	fsm.send(this.transitions.transition);
};

exports.NextFrameAction = exported_NextFrameAction;
