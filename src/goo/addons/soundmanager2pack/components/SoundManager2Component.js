var mod_SoundManager2Component = SoundManager2Component;
import { Component as Component_Component } from "../../../entities/components/Component";

/**
 * @extends Component
 * @deprecated Deprecated since 0.10.x and scheduled for removal in 0.12.0
 */
function SoundManager2Component(settings) {
	this.type = 'SoundManager2Component';

	this.settings = settings || {};

	// this.mass = settings.mass !== undefined ? settings.mass : 0;

	this.sounds = {};
}

SoundManager2Component.prototype = Object.create(Component_Component.prototype);

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
export { mod_SoundManager2Component as SoundManager2Component };