Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RemoveLightAction = undefined;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

var exported_RemoveLightAction = RemoveLightAction;

function RemoveLightAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

RemoveLightAction.prototype = Object.create(_Action.Action.prototype);
RemoveLightAction.prototype.constructor = RemoveLightAction;

RemoveLightAction.external = {
	key: 'Remove Light',
	name: 'Remove Light',
	type: 'light',
	description: 'Removes the light attached to the entity.',
	parameters: [],
	transitions: []
};

RemoveLightAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity.hasComponent('LightComponent')) {
		entity.clearComponent('LightComponent');
	}
};

exports.RemoveLightAction = exported_RemoveLightAction;
