"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SoundManager2Component = undefined;

var _Component = require("../../../entities/components/Component");

function SoundManager2Component(settings) {
	this.type = 'SoundManager2Component';

	this.settings = settings || {};

	// this.mass = settings.mass !== undefined ? settings.mass : 0;

	this.sounds = {};
}

SoundManager2Component.prototype = Object.create(_Component.Component.prototype);

SoundManager2Component.prototype.addSound = function (soundName, settings) {
	this.sounds[soundName] = settings;
};

SoundManager2Component.prototype.playSound = function (soundName) {
	this.sounds[soundName].soundObject.play();
};

var exported_SoundManager2Component = SoundManager2Component;

/**
 * @extends Component
 * @deprecated Deprecated since 0.10.x and scheduled for removal in 0.12.0
 */
exports.SoundManager2Component = exported_SoundManager2Component;
