Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TagAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _ProximityComponent = require("../../../fsmpack/proximity/ProximityComponent");

var exported_TagAction = TagAction;

function TagAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

TagAction.prototype = Object.create(_Action.Action.prototype);
TagAction.prototype.constructor = TagAction;

TagAction.external = {
	key: 'Tag',
	name: 'Tag',
	type: 'collision',
	description: 'Sets a tag on the entity. Use tags to be able to capture collision events with the \'Collides\' action.',
	parameters: [{
		name: 'Tag',
		key: 'tag',
		type: 'string',
		control: 'dropdown',
		description: 'Checks for collisions with other objects having this tag.',
		'default': 'red',
		options: ['red', 'blue', 'green', 'yellow']
	}],
	transitions: []
};

TagAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity.proximityComponent) {
		if (entity.proximityComponent.tag !== this.tag) {
			entity.clearComponent('ProximityComponent');
			entity.setComponent(new _ProximityComponent.ProximityComponent(this.tag));
		}
	} else {
		entity.setComponent(new _ProximityComponent.ProximityComponent(this.tag));
	}
};

TagAction.prototype.cleanup = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity) {
		entity.clearComponent('ProximityComponent');
	}
};

exports.TagAction = exported_TagAction;
