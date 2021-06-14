var mod_AddLightAction = AddLightAction;
import { Action as Action_Action } from "../../../fsmpack/statemachine/actions/Action";
import { LightComponent as LightComponent_LightComponent } from "../../../entities/components/LightComponent";
import { PointLight as PointLight_PointLight } from "../../../renderer/light/PointLight";
import { DirectionalLight as DirectionalLight_DirectionalLight } from "../../../renderer/light/DirectionalLight";
import { SpotLight as SpotLight_SpotLight } from "../../../renderer/light/SpotLight";

function AddLightAction(/*id, settings*/) {
	Action_Action.apply(this, arguments);
}

AddLightAction.prototype = Object.create(Action_Action.prototype);
AddLightAction.prototype.constructor = AddLightAction;

AddLightAction.external = {
	key: 'Add Light',
	name: 'Add Light',
	description: 'Adds a point light to the entity.',
	type: 'light',
	parameters: [{
		name: 'Color',
		key: 'color',
		type: 'vec3',
		control: 'color',
		description: 'Color of the light.',
		'default': [1, 1, 1]
	}, {
		name: 'Light type',
		key: 'type',
		type: 'string',
		control: 'dropdown',
		description: 'Light type.',
		'default': 'Point',
		options: ['Point', 'Directional', 'Spot']
	}, {
		name: 'Range',
		key: 'range',
		type: 'float',
		control: 'slider',
		min: 0,
		max: 1000,
		description: 'Range of the light.',
		'default': 200
	}, {
		name: 'Cone Angle',
		key: 'angle',
		type: 'float',
		control: 'slider',
		min: 1,
		max: 170,
		description: 'Cone angle (applies only to spot lights).',
		'default': 30
	}, {
		name: 'Penumbra',
		key: 'penumbra',
		type: 'float',
		control: 'slider',
		min: 0,
		max: 170,
		description: 'Penumbra (applies only to spot lights).',
		'default': 30
	}],
	transitions: []
};

AddLightAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	if (entity.lightComponent) {
		this._untouched = true;
		return;
	}

	var light;
	if (this.type === 'Directional') {
		light = new DirectionalLight_DirectionalLight();
	} else if (this.type === 'Spot') {
		light = new SpotLight_SpotLight();
		light.range = +this.range;
		light.angle = +this.angle;
		light.penumbra = +this.penumbra;
	} else {
		light = new PointLight_PointLight();
		light.range = +this.range;
	}

	light.color.setDirect(this.color[0], this.color[1], this.color[2]);

	entity.setComponent(new LightComponent_LightComponent(light));
};

AddLightAction.prototype.cleanup = function (fsm) {
	if (this._untouched) { return; }

	var entity = fsm.getOwnerEntity();
	if (entity) {
		entity.clearComponent('LightComponent');
	}
};

export { mod_AddLightAction as AddLightAction };