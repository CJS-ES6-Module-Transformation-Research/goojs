"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PlaySoundAction = undefined;

var _Action = require("./Action");

var _PromiseUtil = require("./../../../util/PromiseUtil");

function PlaySoundAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

PlaySoundAction.prototype = Object.create(_Action.Action.prototype);
PlaySoundAction.prototype.constructor = PlaySoundAction;

PlaySoundAction.external = {
	key: 'Play Sound',
	name: 'Play Sound',
	type: 'sound',
	description: 'Plays a sound. NOTE: On iOS devices, you need to play the first sound inside a touchend event (for example using the MouseUpAction).',
	canTransition: true,
	parameters: [{
		name: 'Sound',
		key: 'sound',
		type: 'sound',
		description: 'Sound to play.'
	}],
	transitions: [{
		key: 'complete',
		description: 'State to transition to when the sound finishes playing.'
	}]
};

var labels = {
	complete: 'On Sound End'
};

PlaySoundAction.getTransitionLabel = function (transitionKey /*, actionConfig*/) {
	return labels[transitionKey];
};

PlaySoundAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();

	if (!entity.hasComponent('SoundComponent')) {
		return;
	}

	var sound = entity.soundComponent.getSoundById(this.sound);
	if (!sound) {
		return;
	}

	var endPromise;
	try {
		endPromise = sound.play();
	} catch (e) {
		console.warn('Could not play sound: ' + e);
		endPromise = _PromiseUtil.PromiseUtils.resolve();
	}

	endPromise.then(function () {
		fsm.send(this.transitions.complete);
	}.bind(this));
};

var exported_PlaySoundAction = PlaySoundAction;
exports.PlaySoundAction = exported_PlaySoundAction;
