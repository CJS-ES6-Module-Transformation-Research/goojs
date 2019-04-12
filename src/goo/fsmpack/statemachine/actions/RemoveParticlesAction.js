Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = RemoveParticlesAction /*id, settings*/;

var _Action = require('../../../fsmpack/statemachine/actions/Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function RemoveParticlesAction() {
	_Action2.default.apply(this, arguments);
}

RemoveParticlesAction.prototype = Object.create(_Action2.default.prototype);
RemoveParticlesAction.prototype.constructor = RemoveParticlesAction;

RemoveParticlesAction.external = {
	key: 'Remove Particles',
	name: 'Remove Particles',
	type: 'fx',
	description: 'Removes any particle emitter attached to the entity.',
	parameters: [],
	transitions: []
};

RemoveParticlesAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	entity.children().each(function (child) {
		if (child.name.indexOf('_ParticleSystem') !== -1 && child.hasComponent('ParticleComponent')) {
			child.removeFromWorld();
		}
	});
};
module.exports = exports.default;
