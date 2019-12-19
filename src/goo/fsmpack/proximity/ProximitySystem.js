Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ProximitySystem = undefined;

var _System = require("../../entities/systems/System");

var _SystemBus = require("../../entities/SystemBus");

var _StringUtils = require("../../util/StringUtils");

var StringUtils = _interopRequireWildcard(_StringUtils);

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj.default = obj;return newObj;
	}
}

function ProximitySystem() {
	_System.System.call(this, 'ProximitySystem', ['ProximityComponent']);

	this.collections = {
		Red: { name: 'Red', collection: [] },
		Blue: { name: 'Blue', collection: [] },
		Green: { name: 'Green', collection: [] },
		Yellow: { name: 'Yellow', collection: [] }
	};
}

ProximitySystem.prototype = Object.create(_System.System.prototype);

ProximitySystem.prototype._collides = function (first, second) {
	// really non-optimal
	for (var i = 0; i < first.collection.length; i++) {
		var firstElement = first.collection[i];
		for (var j = 0; j < second.collection.length; j++) {
			var secondElement = second.collection[j];

			if (firstElement.meshRendererComponent.worldBound.intersects(secondElement.meshRendererComponent.worldBound)) {
				_SystemBus.anonymus.send('collides.' + first.name + '.' + second.name);
			}
		}
	}
};

function formatTag(tag) {
	return StringUtils.capitalize(tag);
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

ProximitySystem.prototype.process = function () /*entities*/{
	/*
 this._collides(this.collections.red, this.collections.blue);
 this._collides(this.collections.red, this.collections.green);
 this._collides(this.collections.red, this.collections.yellow);
 
 this._collides(this.collections.blue, this.collections.green);
 this._collides(this.collections.blue, this.collections.yellow);
 
 this._collides(this.collections.green, this.collections.yellow);
 */
};

var exported_ProximitySystem = ProximitySystem;

/**
 * Processes all entities with a proximity component
 * @param {Renderer} renderer
 * @param {RenderSystem} renderSystem
 * @private
 * @extends System
 */
exports.ProximitySystem = exported_ProximitySystem;
