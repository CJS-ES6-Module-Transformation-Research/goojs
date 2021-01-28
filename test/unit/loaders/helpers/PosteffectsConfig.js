'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PosteffectsConfigjs = undefined;

var _ObjectUtil = require('../../../../src/goo/util/ObjectUtil');

exports.PosteffectsConfigjs = mod_PosteffectsConfigjs = {
	posteffects: function posteffects() {
		var config = this.gooObject('posteffects', 'Dummy');
		_ObjectUtil.ObjectUtils.extend(config, {
			posteffects: {
				myBloomEffect: {
					name: 'Bloom',
					type: 'Bloom',
					sortValue: 1,
					id: 'myBloomEffect',
					enabled: true,
					options: {}
				}
			}
		});
		return config;
	}
};
var mod_PosteffectsConfigjs;
exports.PosteffectsConfigjs = mod_PosteffectsConfigjs;