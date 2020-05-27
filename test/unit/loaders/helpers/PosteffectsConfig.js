'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PosteffectsConfigjs = undefined;

var _ObjectUtil = require('../../../../src/goo/util/ObjectUtil');

var PosteffectsConfigjs_PosteffectsConfigjs;

exports.PosteffectsConfigjs = PosteffectsConfigjs_PosteffectsConfigjs = {
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
exports.PosteffectsConfigjs = PosteffectsConfigjs_PosteffectsConfigjs;