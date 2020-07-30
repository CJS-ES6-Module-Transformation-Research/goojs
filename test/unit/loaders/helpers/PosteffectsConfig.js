import { ObjectUtils as srcgooutilObjectUtil_ObjectUtilsjs } from "../../../../src/goo/util/ObjectUtil";

PosteffectsConfigjs_PosteffectsConfigjs = {
	posteffects: function () {
		var config = this.gooObject('posteffects', 'Dummy');
		srcgooutilObjectUtil_ObjectUtilsjs.extend(config, {
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
var PosteffectsConfigjs_PosteffectsConfigjs;
export { PosteffectsConfigjs_PosteffectsConfigjs as PosteffectsConfigjs };
