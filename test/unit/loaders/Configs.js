import * as EntityConfig from "./helpers/EntityConfig";
import * as AnimationConfig from "./helpers/AnimationConfig";
import * as MaterialConfig from "./helpers/MaterialConfig";
import * as MeshConfig from "./helpers/MeshConfig";
import * as SceneConfig from "./helpers/SceneConfig";
import * as PosteffectsConfig from "./helpers/PosteffectsConfig";

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

let exported_Configs = Configs;

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

attach(Configs, EntityConfigjs);
attach(Configs, AnimationConfigjs);
attach(Configs, MaterialConfigjs);
attach(Configs, MeshConfigjs);
attach(Configs, SceneConfigjs);
attach(Configs, PosteffectsConfigjs);
export { exported_Configs as Configs };