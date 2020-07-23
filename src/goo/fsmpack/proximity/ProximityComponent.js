'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ProximityComponent = undefined;

var _Component = require('../../entities/components/Component');

var ProximityComponent_ProximityComponent = ProximityComponent;

function ProximityComponent(tag) {
	_Component.Component.apply(this, arguments);

	this.type = 'ProximityComponent';

	Object.defineProperty(this, 'tag', {
		value: tag || 'red',
		writable: false
	});
}

ProximityComponent.prototype = Object.create(_Component.Component.prototype);
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

/**
 * @private
 */
exports.ProximityComponent = ProximityComponent_ProximityComponent;