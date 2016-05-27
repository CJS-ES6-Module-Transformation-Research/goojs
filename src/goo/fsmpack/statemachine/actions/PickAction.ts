import Action = require('./Action');
import {External, GetTransitionLabelFunc} from './IAction';
var SystemBus = require('../../../entities/SystemBus');

var labels = {
	pick: 'On pick entity'
};

class PickAction extends Action {
	ownerEntity: any;
	eventListener: (event: any) => void;
	goo: any;
	constructor(id: string, options: any){
		super(id, options);
	}

	static external: External = {
		key: 'Pick',
		name: 'Pick',
		type: 'controls',
		description: 'Listens for a picking event on the entity and performs a transition.',
		canTransition: true,
		parameters: [], // but not farther than some value
		transitions: [{
			key: 'pick',
			description: 'Pick'
		}]
	};

	static getTransitionLabel: GetTransitionLabelFunc = function (transitionKey , actionConfig){
		return labels[transitionKey];
	};

	enter (fsm) {
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
		SystemBus.addListener('goo.trigger.click', this.eventListener);
		SystemBus.addListener('goo.trigger.touchstart', this.eventListener);
	};

	exit () {
		document.removeEventListener('click', this.eventListener);
		document.removeEventListener('touchstart', this.eventListener);
		SystemBus.removeListener('goo.trigger.click', this.eventListener);
		SystemBus.removeListener('goo.trigger.touchstart', this.eventListener);
	};
}

export = PickAction;