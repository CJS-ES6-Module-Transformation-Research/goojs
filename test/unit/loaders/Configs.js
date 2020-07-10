import { EntityConfigjs as helpersEntityConfig_EntityConfigjsjs } from "./helpers/EntityConfig";
import { AnimationConfigjs as helpersAnimationConfig_AnimationConfigjsjs } from "./helpers/AnimationConfig";
import { MaterialConfigjs as helpersMaterialConfig_MaterialConfigjsjs } from "./helpers/MaterialConfig";
import { MeshConfigjs as helpersMeshConfig_MeshConfigjsjs } from "./helpers/MeshConfig";
import { SceneConfigjs as helpersSceneConfig_SceneConfigjsjs } from "./helpers/SceneConfig";
import { PosteffectsConfigjs as helpersPosteffectsConfig_PosteffectsConfigjsjs } from "./helpers/PosteffectsConfig";

var bundle = {};
var Configs = {
	randomRef: function (type) {
		var hash = 'aaaabbbbaaaabbbbaaaabbbbaaaabbbb'.replace(/[ab]/g, function(a) {
			return ((Math.random() * 16) % 16 | 0).toString(16);
		});
		return hash + '.' + (type || '');
	},
	gooObject: function (type, name) {
		var config = {
			id: Configs.randomRef(type),
			name: name,
			license: 'CC0',
			orignalLicense: 'CC0',

			created: '2014-01-11T13:29:12+00:00',
			modified: '2014-01-11T13:29:12+00:00',

			public: true,
			owner: 'rickard',
			readonly: false,
			description: 'Test object',
			deleted: false,

			dataModelVersion: 2
		};
		this.addToBundle(config);
		return config;
	},
	addToBundle: function (config, ref) {
		ref = ref || config.id;
		if (ref) {
			bundle[ref] = config;
		}
	},
	binary: function (size) {
		var arr = new Float32Array(size);
		for (var i = 0; i < size; i++) {
			arr[i] = i / size;
		}
		var ref = Configs.randomRef('bin');
		Configs.addToBundle(arr.buffer, ref);
		return ref;
	},
	get: function () {
		return bundle;
	}
};

function attach(attachee, attacher) {
	for (var key in attacher) {
		if (attacher[key] instanceof Function) {
			attachee[key] = attacher[key].bind(Configs);
		} else if (attacher[key] instanceof Object) {
			attachee[key] = attachee[key] || {};
			attach(attachee[key], attacher[key]);
		} else {
			attachee[key] = attacher[key];
		}
	}
}

attach(Configs, helpersEntityConfig_EntityConfigjsjs);
attach(Configs, helpersAnimationConfig_AnimationConfigjsjs);
attach(Configs, helpersMaterialConfig_MaterialConfigjsjs);
attach(Configs, helpersMeshConfig_MeshConfigjsjs);
attach(Configs, helpersSceneConfig_SceneConfigjsjs);
attach(Configs, helpersPosteffectsConfig_PosteffectsConfigjsjs);
var Configs_Configs;
// for (var i = 0; i < arguments.length; i++) {
// 	attach(Configs, arguments[i]);
// }

Configs_Configs = Configs;
export { Configs_Configs as Configs };