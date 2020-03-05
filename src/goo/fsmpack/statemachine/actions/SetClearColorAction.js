import { Action as Actionjs } from "../../../fsmpack/statemachine/actions/Action";

function SetClearColorAction/*id, settings*/() {
	Actionjs.apply(this, arguments);
}

SetClearColorAction.prototype = Object.create(Actionjs.prototype);
SetClearColorAction.prototype.constructor = SetClearColorAction;

SetClearColorAction.external = {
	key: 'Set Clear Color',
	name: 'Background Color',
	description: 'Sets the clear color.',
	parameters: [{
		name: 'Color',
		key: 'color',
		type: 'vec4',
		control: 'color',
		description: 'Color.',
		'default': [1, 1, 1, 1]
	}],
	transitions: []
};

SetClearColorAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var color = this.color;
	entity._world.gooRunner.renderer.setClearColor(color[0], color[1], color[2], color[3]);
};

var exported_SetClearColorAction = SetClearColorAction;
export { exported_SetClearColorAction as SetClearColorAction };