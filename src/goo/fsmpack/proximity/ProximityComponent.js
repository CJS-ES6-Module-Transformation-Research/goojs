Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ProximityComponent;

var _Component = require('../../entities/components/Component');

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @private
 */
function ProximityComponent(tag) {
	_Component2.default.apply(this, arguments);

	this.type = 'ProximityComponent';

	Object.defineProperty(this, 'tag', {
		value: tag || 'red',
		writable: false
	});
}

ProximityComponent.prototype = Object.create(_Component2.default.prototype);
ProximityComponent.prototype.constructor = ProximityComponent;

ProximityComponent.prototype.attached = function (entity) {
	var world = entity._world;
	if (!world) {
		return;
	}

	var proximitySystem = world.getSystem('ProximitySystem');
	if (!proximitySystem) {
		return;
	}

	proximitySystem.add(entity, this.tag);
};

ProximityComponent.prototype.detached = function (entity) {
	var world = entity._world;
	if (!world) {
		return;
	}

	var proximitySystem = world.getSystem('ProximitySystem');
	if (!proximitySystem) {
		return;
	}

	proximitySystem.remove(entity, this.tag);
};
module.exports = exports.default;
