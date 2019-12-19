Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ShowAction = undefined;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

function ShowAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

ShowAction.prototype = Object.create(_Action.Action.prototype);
ShowAction.prototype.constructor = ShowAction;

ShowAction.external = {
	key: 'Show',
	name: 'Show',
	type: 'display',
	description: 'Makes an entity visible.',
	parameters: [],
	transitions: []
};

ShowAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	entity.show();
};

var exported_ShowAction = ShowAction;
exports.ShowAction = exported_ShowAction;
