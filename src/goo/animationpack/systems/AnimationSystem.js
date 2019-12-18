Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AnimationSystem = undefined;

var _System = require("../../entities/systems/System");

var _World = require("../../entities/World");

function AnimationSystem() {
	_System.System.call(this, 'AnimationSystem', ['AnimationComponent']);
}

AnimationSystem.prototype = Object.create(_System.System.prototype);

AnimationSystem.prototype.process = function () {
	for (var i = 0; i < this._activeEntities.length; i++) {
		var entity = this._activeEntities[i];
		var animationComponent = entity.animationComponent;
		animationComponent.update(_World.World.time);
		animationComponent.apply(entity.transformComponent);
		animationComponent.postUpdate();
	}
};

AnimationSystem.prototype.pause = function () {
	this.passive = true;
	for (var i = 0; i < this._activeEntities.length; i++) {
		this._activeEntities[i].animationComponent.pause();
	}
};

AnimationSystem.prototype.resume = function () {
	this.passive = false;
	for (var i = 0; i < this._activeEntities.length; i++) {
		var entity = this._activeEntities[i];
		entity.animationComponent.resume();
	}
};

AnimationSystem.prototype.play = AnimationSystem.prototype.resume;

AnimationSystem.prototype.stop = function () {
	this.passive = true;
	for (var i = 0; i < this._activeEntities.length; i++) {
		var entity = this._activeEntities[i];
		entity.animationComponent.stop();
	}
};

var exported_AnimationSystem = AnimationSystem;

/**
 * Processes all entities with animation components, updating the animations
 * @extends System
 */
exports.AnimationSystem = exported_AnimationSystem;
