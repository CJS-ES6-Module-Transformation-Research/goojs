import { Component as Componentjs } from "../../entities/components/Component";
function ProximityComponent(tag) {
	Componentjs.apply(this, arguments);

	this.type = 'ProximityComponent';

	Object.defineProperty(this, 'tag', {
		value: tag || 'red',
		writable: false
	});
}

ProximityComponent.prototype = Object.create(Componentjs.prototype);
ProximityComponent.prototype.constructor = ProximityComponent;

ProximityComponent.prototype.attached = function (entity) {
	var world = entity._world;
	if (!world) { return; }

	var proximitySystem = world.getSystem('ProximitySystem');
	if (!proximitySystem) { return; }

	proximitySystem.add(entity, this.tag);
};

ProximityComponent.prototype.detached = function (entity) {
	var world = entity._world;
	if (!world) { return; }

	var proximitySystem = world.getSystem('ProximitySystem');
	if (!proximitySystem) { return; }

	proximitySystem.remove(entity, this.tag);
};

var exported_ProximityComponent = ProximityComponent;

/**
 * @private
 */
export { exported_ProximityComponent as ProximityComponent };