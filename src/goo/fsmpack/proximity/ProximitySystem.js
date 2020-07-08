var ProximitySystem_ProximitySystem = ProximitySystem;
import { System as entitiessystemsSystem_Systemjs } from "../../entities/systems/System";
import { SystemBusjs as entitiesSystemBus_SystemBusjsjs } from "../../entities/SystemBus";
import { capitalize as StringUtilsjs_capitalize } from "../../util/StringUtils";
function ProximitySystem() {
	entitiessystemsSystem_Systemjs.call(this, 'ProximitySystem', ['ProximityComponent']);

	this.collections = {
		Red: { name: 'Red', collection: [] },
		Blue: { name: 'Blue', collection: [] },
		Green: { name: 'Green', collection: [] },
		Yellow: { name: 'Yellow', collection: [] }
	};
}

ProximitySystem.prototype = Object.create(entitiessystemsSystem_Systemjs.prototype);

ProximitySystem.prototype._collides = function (first, second) {
	// really non-optimal
	for (var i = 0; i < first.collection.length; i++) {
		var firstElement = first.collection[i];
		for (var j = 0; j < second.collection.length; j++) {
			var secondElement = second.collection[j];

			if (firstElement.meshRendererComponent.worldBound.intersects(secondElement.meshRendererComponent.worldBound)) {
				entitiesSystemBus_SystemBusjsjs.send('collides.' + first.name + '.' + second.name);
			}
		}
	}
};

function formatTag(tag) {
	return StringUtilsjs_capitalize(tag);
}

ProximitySystem.prototype.getFor = function (tag) {
	tag = formatTag(tag);
	if (this.collections[tag]) {
		return this.collections[tag].collection;
	} else {
		return [];
	}
};

ProximitySystem.prototype.add = function (entity, tag) {
	tag = formatTag(tag);
	if (!this.collections[tag]) {
		this.collections[tag] = { name: tag, collection: [] };
	}
	this.collections[tag].collection.push(entity);
};

ProximitySystem.prototype.remove = function (entity, tag) {
	tag = formatTag(tag);
	var collection = this.collections[tag].collection;
	var index = collection.indexOf(entity);
	collection.splice(index, 1);
};

ProximitySystem.prototype.process = function (/*entities*/) {
	/*
	this._collides(this.collections.red, this.collections.blue);
	this._collides(this.collections.red, this.collections.green);
	this._collides(this.collections.red, this.collections.yellow);

	this._collides(this.collections.blue, this.collections.green);
	this._collides(this.collections.blue, this.collections.yellow);

	this._collides(this.collections.green, this.collections.yellow);
	*/
};

/**
 * Processes all entities with a proximity component
 * @param {Renderer} renderer
 * @param {RenderSystem} renderSystem
 * @private
 * @extends System
 */
export { ProximitySystem_ProximitySystem as ProximitySystem };