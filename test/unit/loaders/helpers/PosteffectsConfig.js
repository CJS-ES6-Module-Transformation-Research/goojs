import { ObjectUtils as ObjectUtil_ObjectUtilsjs } from "../../../../src/goo/util/ObjectUtil";

var PosteffectsConfigjs = {
	posteffects: function () {
		var config = this.gooObject('posteffects', 'Dummy');
		ObjectUtil_ObjectUtilsjs.extend(config, {
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

var PosteffectsConfigjs_posteffects = function() {
    var config = this.gooObject("posteffects", "Dummy");
    ObjectUtil_ObjectUtilsjs.extend(config, {
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

export { PosteffectsConfigjs_posteffects as posteffects };
