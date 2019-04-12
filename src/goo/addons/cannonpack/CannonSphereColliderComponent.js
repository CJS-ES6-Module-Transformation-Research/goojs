Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CannonSphereColliderComponent;

var _Component = require("../../entities/components/Component");

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* global CANNON */

/**
 * Sphere collider for the {@link CannonSystem}.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Cannon/Cannon-vtest.html Working example
 * @param {Object} [settings]
 * @param {number} [settings.radius=0.5]
 */
function CannonSphereColliderComponent(settings) {
  _Component2.default.apply(this, arguments);

  settings = settings || {};
  this.type = 'CannonSphereColliderComponent';
  this.radius = settings.radius || 0.5;
  this.cannonShape = new CANNON.Sphere(this.radius);
}

CannonSphereColliderComponent.prototype = Object.create(_Component2.default.prototype);
CannonSphereColliderComponent.constructor = CannonSphereColliderComponent;
module.exports = exports.default;
