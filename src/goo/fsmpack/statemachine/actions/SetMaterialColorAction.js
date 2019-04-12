Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = SetMaterialColorAction /*id, settings*/;

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function SetMaterialColorAction() {
	_Action2.default.apply(this, arguments);
}

SetMaterialColorAction.prototype = Object.create(_Action2.default.prototype);
SetMaterialColorAction.prototype.constructor = SetMaterialColorAction;

SetMaterialColorAction.external = {
	key: 'Set Material Color',
	name: 'Set Material Color',
	type: 'texture',
	description: 'Sets the color of a material.',
	parameters: [{
		name: 'Entity (optional)',
		key: 'entity',
		type: 'entity',
		description: 'Entity that has a material.'
	}, {
		name: 'Color type',
		key: 'type',
		type: 'string',
		control: 'dropdown',
		description: 'Color type.',
		'default': 'Diffuse',
		options: ['Diffuse', 'Emissive', 'Specular', 'Ambient']
	}, {
		name: 'Color',
		key: 'color',
		type: 'vec3',
		control: 'color',
		description: 'Color.',
		'default': [1, 1, 1]
	}],
	transitions: []
};

var MAPPING = {
	Diffuse: 'materialDiffuse',
	Emissive: 'materialEmissive',
	Specular: 'materialSpecular',
	Ambient: 'materialAmbient'
};

SetMaterialColorAction.prototype.enter = function (fsm) {
	var entity = this.entity && fsm.getEntityById(this.entity.entityRef) || fsm.getOwnerEntity();
	if (entity && entity.meshRendererComponent) {
		var material = entity.meshRendererComponent.materials[0];
		var typeName = MAPPING[this.type];
		material.uniforms[typeName] = material.uniforms[typeName] || [1, 1, 1, 1];
		var col = material.uniforms[typeName];
		col[0] = this.color[0];
		col[1] = this.color[1];
		col[2] = this.color[2];
	}
};
module.exports = exports.default;
