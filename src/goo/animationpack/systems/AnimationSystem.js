import { System as System_Systemjs } from "../../entities/systems/System";
import { World as World_Worldjs } from "../../entities/World";
function AnimationSystem() {
	System_Systemjs.call(this, 'AnimationSystem', ['AnimationComponent']);
}

AnimationSystem.prototype = Object.create(System_Systemjs.prototype);

AnimationSystem.prototype.process = function () {
	for (var i = 0; i < this._activeEntities.length; i++) {
		var entity = this._activeEntities[i];
		var animationComponent = entity.animationComponent;
		animationComponent.update(World_Worldjs.time);
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
export { exported_AnimationSystem as AnimationSystem };