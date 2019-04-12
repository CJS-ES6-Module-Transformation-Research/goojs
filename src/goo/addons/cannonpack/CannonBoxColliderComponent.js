Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = CannonBoxColliderComponent;

var _Component = require("../../entities/components/Component");

var _Component2 = _interopRequireDefault(_Component);

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/* global CANNON */

/**
 * Physics box collider for Cannon.js. To be attached to an entity with a {@link CannonRigidbodyComponent}. Also see the {@link CannonSystem}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 * @param {Vector3} [settings.halfExtents] The half-extents of the box collider.
 * @extends Component
 */
function CannonBoxColliderComponent(settings) {
	_Component2.default.apply(this, arguments);

	this.type = 'CannonBoxColliderComponent';

	settings = settings || {};
	var e = this.halfExtents = settings.halfExtents || new _Vector2.default(0.5, 0.5, 0.5);

	// Create shape
	this.cannonShape = new CANNON.Box(new CANNON.Vec3(e.x, e.y, e.z));

	this.isTrigger = typeof settings.isTrigger !== 'undefined' ? settings.isTrigger : false;
}

CannonBoxColliderComponent.prototype = Object.create(_Component2.default.prototype);
CannonBoxColliderComponent.constructor = CannonBoxColliderComponent;
module.exports = exports.default;
