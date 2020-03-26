"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Configs = undefined;

var _EntityConfig = require("./helpers/EntityConfig");

var _AnimationConfig = require("./helpers/AnimationConfig");

var _MaterialConfig = require("./helpers/MaterialConfig");

var _MeshConfig = require("./helpers/MeshConfig");

var _SceneConfig = require("./helpers/SceneConfig");

var _PosteffectsConfig = require("./helpers/PosteffectsConfig");

var bundle = {};
var Configs = {
	randomRef: function randomRef(type) {
		var hash = 'aaaabbbbaaaabbbbaaaabbbbaaaabbbb'.replace(/[ab]/g, function (a) {
			return (Math.random() * 16 % 16 | 0).toString(16);
		});
		return hash + '.' + (type || '');
	},
	gooObject: function gooObject(type, name) {
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
	addToBundle: function addToBundle(config, ref) {
		ref = ref || config.id;
		if (ref) {
			bundle[ref] = config;
		}
	},
	binary: function binary(size) {
		var arr = new Float32Array(size);
		for (var i = 0; i < size; i++) {
			arr[i] = i / size;
		}
		var ref = Configs.randomRef('bin');
		Configs.addToBundle(arr.buffer, ref);
		return ref;
	},
	get: function get() {
		return bundle;
	}
};

var exported_Configs = Configs;

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

attach(Configs, _EntityConfig.EntityConfigjs);
attach(Configs, _AnimationConfig.AnimationConfigjs);
attach(Configs, _MaterialConfig.MaterialConfigjs);
attach(Configs, _MeshConfig.MeshConfigjs);
attach(Configs, _SceneConfig.SceneConfigjs);
attach(Configs, _PosteffectsConfig.PosteffectsConfigjs);
exports.Configs = exported_Configs;
