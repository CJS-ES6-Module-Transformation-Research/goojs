Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ParticleData;

var _Vector = require("../../math/Vector3");

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Container for particle data in the ParticleSystemComponent.
 * @class
 * @constructor
 * @param {ParticleSystemComponent} particleComponent
 */
function ParticleData(particleComponent) {

	/**
  * The owner component
  * @type {number}
  */
	this.component = particleComponent;

	/**
  * @type {number}
  */
	this.index = 0;

	/**
  * @type {number}
  */
	this.lifeTime = 1;

	/**
  * @type {number}
  */
	this.emitTime = 0;

	/**
  * @type {number}
  */
	this.active = 1;

	/**
  * @type {Vector3}
  */
	this.startPosition = new _Vector2.default();

	/**
  * @type {Vector3}
  */
	this.startDirection = new _Vector2.default();

	/**
  * @type {number}
  */
	this.startAngle = 0;

	/**
  * @type {number}
  */
	this.startSize = 1;

	/**
  * @type {number}
  */
	this.sortValue = 0;

	/**
  * @type {number}
  */
	this.emitRandom = 0;

	/**
  * @type {number}
  */
	this.loopAfter = 0;
}

var dirDelta = new _Vector2.default();
var gravityDelta = new _Vector2.default();
var localVelocityDelta = new _Vector2.default();
var worldVelocityDelta = new _Vector2.default();

/**
 * Get the world position of the particle
 * @param {Vector3} store
 */
ParticleData.prototype.getWorldPosition = function (store) {
	if (!this.active) {
		return store;
	}

	var component = this.component;

	// pos + dir * t + 0.5 * t * t * g
	var age = component.time - this.emitTime;

	if (component.loop) {
		age %= this.loopAfter;
	}

	dirDelta.copy(this.startDirection).scale(age);
	gravityDelta.copy(component.localSpace ? component._localGravity : component.gravity).scale(age * age * 0.5);
	store.copy(this.startPosition).add(dirDelta).add(gravityDelta);

	// Add velocity over lifetime
	if (component.localVelocityOverLifetime) {
		var unitAge = age / this.loopAfter;
		component.localVelocityOverLifetime.getVec3IntegralValueAt(unitAge, this.emitRandom, localVelocityDelta);
		localVelocityDelta.applyPost(component._localToWorldRotation);
		store.add(localVelocityDelta);
	}

	if (component.worldVelocityOverLifetime) {
		var unitAge = age / this.loopAfter;
		component.worldVelocityOverLifetime.getVec3IntegralValueAt(unitAge, this.emitRandom, worldVelocityDelta);
		worldVelocityDelta.applyPost(component._worldToLocalRotation);
		store.add(worldVelocityDelta);
	}

	if (component.localSpace) {
		// Transform to world space
		var worldTransform = component.entity.transformComponent.sync().worldTransform;
		store.applyPost(worldTransform.rotation);
		store.add(worldTransform.translation);
	}

	return store;
};
module.exports = exports.default;
