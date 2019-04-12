Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = RemoveAction /*id, settings*/;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function RemoveAction() {
	_Action2.default.apply(this, arguments);
}

RemoveAction.prototype = Object.create(_Action2.default.prototype);
RemoveAction.prototype.constructor = RemoveAction;

RemoveAction.external = {
	key: 'Remove',
	name: 'Remove',
	type: 'display',
	description: 'Removes the entity from the world.',
	parameters: [{
		name: 'Recursive',
		key: 'recursive',
		type: 'boolean',
		description: 'Remove children too.',
		'default': false
	}],
	transitions: []
};

RemoveAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	entity.removeFromWorld(this.recursive);
};
module.exports = exports.default;
