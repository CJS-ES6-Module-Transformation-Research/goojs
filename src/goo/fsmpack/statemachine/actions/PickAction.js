"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PickAction = undefined;

var _Action = require("../../../fsmpack/statemachine/actions/Action");

var _SystemBus = require("../../../entities/SystemBus");

function PickAction /*id, settings*/() {
	_Action.Action.apply(this, arguments);
}

PickAction.prototype = Object.create(_Action.Action.prototype);
PickAction.prototype.constructor = PickAction;

PickAction.external = {
	key: 'Pick',
	name: 'Pick',
	type: 'controls',
	description: 'Listens for a picking event on the entity and performs a transition.',
	canTransition: true,
	parameters: [], // but not farther than some value
	transitions: [{
		key: 'pick',
		name: 'Pick',
		description: 'State to transition to when entity is picked.'
	}]
};

var labels = {
	pick: 'On pick entity'
};

PickAction.getTransitionLabel = function (transitionKey /*, actionConfig*/) {
	return labels[transitionKey];
};

PickAction.prototype.enter = function (fsm) {
	this.ownerEntity = fsm.getOwnerEntity();
	this.goo = this.ownerEntity._world.gooRunner;

	var that = this;
	this.eventListener = function (event) {
		var pickedEntity = event.entity;
		if (!pickedEntity) {
			var x, y;
			var domTarget = that.goo.renderer.domElement;
			if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
				x = event.changedTouches[0].pageX - domTarget.getBoundingClientRect().left;
				y = event.changedTouches[0].pageY - domTarget.getBoundingClientRect().top;
			} else {
				var rect = domTarget.getBoundingClientRect();
				x = event.clientX - rect.left;
				y = event.clientY - rect.top;
			}
			var pickingStore = that.goo.pickSync(x, y);
			pickedEntity = that.goo.world.entityManager.getEntityByIndex(pickingStore.id);

			if (!pickedEntity) {
				return;
			}
		}

		pickedEntity.traverseUp(function (entity) {
			if (entity === that.ownerEntity) {
				fsm.send(that.transitions.pick);
				return false;
			}
		});
	};

	document.addEventListener('click', this.eventListener);
	document.addEventListener('touchstart', this.eventListener);
	_SystemBus.SystemBusjs.addListener('goo.trigger.click', this.eventListener);
	_SystemBus.SystemBusjs.addListener('goo.trigger.touchstart', this.eventListener);
};

PickAction.prototype.exit = function () {
	document.removeEventListener('click', this.eventListener);
	document.removeEventListener('touchstart', this.eventListener);
	_SystemBus.SystemBusjs.removeListener('goo.trigger.click', this.eventListener);
	_SystemBus.SystemBusjs.removeListener('goo.trigger.touchstart', this.eventListener);
};

var exported_PickAction = PickAction;
exports.PickAction = exported_PickAction;
