import { ObjectUtils as srcgooutilObjectUtil_ObjectUtilsjs } from "../../../../src/goo/util/ObjectUtil";

var PosteffectsConfigjs_PosteffectsConfigjs = {
	posteffects: function () {
		var config = this.gooObject('posteffects', 'Dummy');
		srcgooutilObjectUtil_ObjectUtilsjs(config, {
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

export { PosteffectsConfigjs_PosteffectsConfigjs as PosteffectsConfigjs };
