Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = MoveAction /*id, settings*/;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _Action2 = _interopRequireDefault(_Action);

var _Vector = require("../../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function MoveAction() {
	_Action2.default.apply(this, arguments);
}

MoveAction.prototype = Object.create(_Action2.default.prototype);
MoveAction.prototype.constructor = MoveAction;

MoveAction.external = {
	key: 'Move',
	name: 'Move',
	type: 'animation',
	description: 'Moves the entity.',
	parameters: [{
		name: 'Translation',
		key: 'translation',
		type: 'position',
		description: 'Move.',
		'default': [0, 0, 0]
	}, {
		name: 'Oriented',
		key: 'oriented',
		type: 'boolean',
		description: 'If true translate with rotation.',
		'default': true
	}, {
		name: 'Relative',
		key: 'relative',
		type: 'boolean',
		description: 'If true add to current translation.',
		'default': true
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': true
	}],
	transitions: []
};

MoveAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var transform = entity.transformComponent.sync().transform;
	this.forward = _Vector2.default.fromArray(this.translation);
	var orientation = transform.rotation;
	this.forward.applyPost(orientation);

	if (!this.everyFrame) {
		this.applyMove(fsm);
	}
};

MoveAction.prototype.update = function (fsm) {
	if (this.everyFrame) {
		this.applyMove(fsm);
	}
};

MoveAction.prototype.applyMove = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var transform = entity.transformComponent.sync().transform;
	var translation = transform.translation;

	if (this.oriented) {
		if (this.relative) {
			var forward = _Vector2.default.fromArray(this.translation);
			var orientation = transform.rotation;
			forward.applyPost(orientation);

			if (this.everyFrame) {
				forward.scale(fsm.getTpf());
				translation.add(forward);
			} else {
				translation.add(forward);
			}
		} else {
			translation.set(this.forward);
		}
	} else {
		if (this.relative) {
			if (this.everyFrame) {
				var tpf = fsm.getTpf();
				translation.addDirect(this.translation[0] * tpf, this.translation[1] * tpf, this.translation[2] * tpf);
			} else {
				translation.addDirect(this.translation[0], this.translation[1], this.translation[2]);
			}
		} else {
			translation.setDirect(this.translation[0], this.translation[1], this.translation[2]);
		}
	}

	entity.transformComponent.setUpdated();
};
module.exports = exports.default;
