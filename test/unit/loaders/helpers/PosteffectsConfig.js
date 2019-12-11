import { _ } from "../../../../src/goo/util/ObjectUtil";

let anonymus = {
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

var exported_posteffects = function() {
    var config = this.gooObject("posteffects", "Dummy");
    _.extend(config, {
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
