import { ObjectUtils as _ } from "../../../../src/goo/util/ObjectUtil";

mod_PosteffectsConfigjs = {
	posteffects: function () {
		var config = this.gooObject('posteffects', 'Dummy');
		_.extend(config, {
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
export { mod_PosteffectsConfigjs as PosteffectsConfigjs };
