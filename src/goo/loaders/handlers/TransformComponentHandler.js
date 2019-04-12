Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = TransformComponentHandler;

var _ComponentHandler = require("../../loaders/handlers/ComponentHandler");

var _ComponentHandler2 = _interopRequireDefault(_ComponentHandler);

var _TransformComponent = require("../../entities/components/TransformComponent");

var _TransformComponent2 = _interopRequireDefault(_TransformComponent);

var _MathUtils = require("../../math/MathUtils");

var _MathUtils2 = _interopRequireDefault(_MathUtils);

var _ObjectUtils = require("../../util/ObjectUtils");

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _rsvp = require("../../util/rsvp");

var _rsvp2 = _interopRequireDefault(_rsvp);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * For handling loading of transform component
 * @extends ComponentHandler
 * @param {World} world The goo world
 * @param {Function} getConfig The config loader function. See {@see DynamicLoader._loadRef}.
 * @param {Function} updateObject The handler function. See {@see DynamicLoader.update}.
 * @hidden
 */
function TransformComponentHandler() {
	_ComponentHandler2.default.apply(this, arguments);
	this._type = 'TransformComponent';
}

TransformComponentHandler.prototype = Object.create(_ComponentHandler2.default.prototype);
TransformComponentHandler.prototype.constructor = TransformComponentHandler;
_ComponentHandler2.default._registerClass('transform', TransformComponentHandler);

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @private
 */
TransformComponentHandler.prototype._prepare = function (config) {
	return _ObjectUtils2.default.defaults(config, {
		translation: [0, 0, 0],
		rotation: [0, 0, 0],
		scale: [1, 1, 1]
	});
};

/**
 * Create transform component object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @returns {TransformComponent} the created component object
 * @private
 */
TransformComponentHandler.prototype._create = function () {
	return new _TransformComponent2.default();
};

/**
 * Remove engine component object. TransformComponents can't be removed, so we reset.
 * @param {Entity} entity The entity from which this component should be removed.
 * @private
 */
TransformComponentHandler.prototype._remove = function (entity) {
	var component = entity.transformComponent;
	// Reset
	component.transform.translation.setDirect(0, 0, 0);
	component.transform.setRotationXYZ(0, 0, 0);
	component.transform.scale.setDirect(1, 1, 1);

	// Detach all children
	for (var i = 0; i < component.children.length; i++) {
		var child = component.children[i];
		component.detachChild(child);
	}
	component.setUpdated();
};

/**
 * Update engine transform component object based on the config.
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
TransformComponentHandler.prototype.update = function (entity, config, options) {
	var that = this;

	function attachChild(component, ref) {
		return that.loadObject(ref, options).then(function (entity) {
			if (entity && entity.transformComponent) {
				component.attachChild(entity.transformComponent);
				var entityInWorld = that.world.entityManager.containsEntity(entity) || that.world._addedEntities.indexOf(entity) !== -1; //! AT: most probably not needed anymore
				// entities are added synchronously to the managers
				var parentInWorld = that.world.entityManager.containsEntity(component.entity) || that.world._addedEntities.indexOf(component.entity) > -1; //! AT: most probably not needed anymore
				// also, why the inconsistency: "!== -1" vs "> -1" ?

				if (!entityInWorld && parentInWorld) {
					entity.addToWorld();
				}
			} else {
				console.error('Failed to add child to transform component');
			}
			return component;
		});
	}

	return _ComponentHandler2.default.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) {
			// Component was removed
			return;
		}

		// Translation
		component.transform.translation.setDirect(config.translation[0], config.translation[1], config.translation[2]);
		// Rotation
		component.transform.setRotationXYZ(_MathUtils2.default.DEG_TO_RAD * config.rotation[0], _MathUtils2.default.DEG_TO_RAD * config.rotation[1], _MathUtils2.default.DEG_TO_RAD * config.rotation[2]);
		// Scale
		component.transform.scale.setDirect(config.scale[0], config.scale[1], config.scale[2]);

		var promises = [];
		if (config.children) {
			// Attach children
			// TODO: Watch out for circular dependencies
			// TODO: Use sort values
			var keys = Object.keys(config.children);
			for (var i = 0; i < keys.length; i++) {
				var childRef = config.children[keys[i]].entityRef;
				promises.push(attachChild(component, childRef));
			}
			for (var i = 0; i < component.children.length; i++) {
				var child = component.children[i];
				var id = child.entity.id;
				if (!config.children[id]) {
					component.detachChild(child);
				}
			}
		} else {
			// Detach all children
			for (var i = 0; i < component.children.length; i++) {
				var child = component.children[i];
				component.detachChild(child);
			}
		}

		// When all children are attached, return component
		return _rsvp2.default.all(promises).then(function () {
			component.setUpdated();
			return component;
		});
	});
};
module.exports = exports.default;
