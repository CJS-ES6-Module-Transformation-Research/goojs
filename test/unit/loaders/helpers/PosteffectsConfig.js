'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PosteffectsConfigjs = undefined;

var _ObjectUtil = require('../../../../src/goo/util/ObjectUtil');

var PosteffectsConfigjs_PosteffectsConfigjs = {
	posteffects: function posteffects() {
		var config = this.gooObject('posteffects', 'Dummy');
		(0, _ObjectUtil.ObjectUtils)(config, {
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
