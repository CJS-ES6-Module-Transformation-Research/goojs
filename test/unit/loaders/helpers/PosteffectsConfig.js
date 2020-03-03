Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.posteffects = undefined;

var _ObjectUtil = require('../../../../src/goo/util/ObjectUtil');

var PosteffectsConfigjs = {
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

var PosteffectsConfigjs_posteffects = function PosteffectsConfigjs_posteffects() {
	var config = this.gooObject("posteffects", "Dummy");
	_ObjectUtil.ObjectUtils.extend(config, {
		posteffects: {
			myBloomEffect: {
				name: "Bloom",
				type: "Bloom",
				sortValue: 1,
				id: "myBloomEffect",
				enabled: true,
				options: {}
			}
		}
	});
	return config;
};

exports.posteffects = PosteffectsConfigjs_posteffects;
