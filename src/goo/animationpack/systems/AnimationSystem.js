var mod_AnimationSystem = AnimationSystem;
import { System as System_System } from "../../entities/systems/System";
import { World as World_World } from "../../entities/World";

/**
 * Processes all entities with animation components, updating the animations
 * @extends System
 */
function AnimationSystem() {
	System_System.call(this, 'AnimationSystem', ['AnimationComponent']);
}

AnimationSystem.prototype = Object.create(System_System.prototype);

AnimationSystem.prototype.process = function () {
	for (var i = 0; i < this._activeEntities.length; i++) {
		var entity = this._activeEntities[i];
		var animationComponent = entity.animationComponent;
		animationComponent.update(World_World.time);
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

/**
 * Processes all entities with animation components, updating the animations
 * @extends System
 */
export { mod_AnimationSystem as AnimationSystem };