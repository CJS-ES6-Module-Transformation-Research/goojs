Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = CannonPlaneColliderComponent;

var _Component = require("../../entities/components/Component");

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/* global CANNON */

/**
 * Plane collider. Attach to an entity with a {@link CannonRigidbodyComponent}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 */
function CannonPlaneColliderComponent(settings) {
	_Component2.default.apply(this, arguments);

	this.type = 'CannonPlaneColliderComponent';

	settings = settings || {};

	// Create shape
	this.cannonShape = new CANNON.Plane();
}

CannonPlaneColliderComponent.prototype = Object.create(_Component2.default.prototype);
CannonPlaneColliderComponent.constructor = CannonPlaneColliderComponent;
module.exports = exports.default;
