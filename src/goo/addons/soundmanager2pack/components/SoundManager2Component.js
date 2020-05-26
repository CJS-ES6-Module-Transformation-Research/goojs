var SoundManager2Component_SoundManager2Component = SoundManager2Component;
import { Component as entitiescomponentsComponent_Componentjs } from "../../../entities/components/Component";
function SoundManager2Component(settings) {
	this.type = 'SoundManager2Component';

	this.settings = settings || {};

	// this.mass = settings.mass !== undefined ? settings.mass : 0;

	this.sounds = {};
}

SoundManager2Component.prototype = Object.create(entitiescomponentsComponent_Componentjs.prototype);

SoundManager2Component.prototype.addSound = function (soundName, settings) {
	this.sounds[soundName] = settings;
};

SoundManager2Component.prototype.playSound = function (soundName) {
	this.sounds[soundName].soundObject.play();
};

/**
 * @extends Component
 * @deprecated Deprecated since 0.10.x and scheduled for removal in 0.12.0
 */
export { SoundManager2Component_SoundManager2Component as SoundManager2Component };