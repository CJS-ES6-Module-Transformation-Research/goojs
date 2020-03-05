import { Action as Actionjs } from "../../../fsmpack/statemachine/actions/Action";
import { ProximityComponent as ProximityComponentjs } from "../../../fsmpack/proximity/ProximityComponent";

function TagAction/*id, settings*/() {
	Actionjs.apply(this, arguments);
}

TagAction.prototype = Object.create(Actionjs.prototype);
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
			entity.setComponent(new ProximityComponentjs(this.tag));
		}
	} else {
		entity.setComponent(new ProximityComponentjs(this.tag));
	}
};

TagAction.prototype.cleanup = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity) {
		entity.clearComponent('ProximityComponent');
	}
};

var exported_TagAction = TagAction;
export { exported_TagAction as TagAction };