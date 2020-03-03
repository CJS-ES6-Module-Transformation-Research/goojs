import { ObjectUtils as ObjectUtil_ObjectUtilsjs } from "../../../../src/goo/util/ObjectUtil";

var MeshConfigjs = {
	mesh: function () {
		var config = this.gooObject('mesh', 'Dummy');
		var samples = 3;
		ObjectUtil_ObjectUtilsjs.extend(config, {
			binaryRef: this.binary(128),
			type: 'Mesh',
			indexLengths: [samples],
			indexModes: ['Triangles'],
			attributes: {
				POSITION: {
					value: [0, samples * 3, 'float32'],
					dimensions: 3
				},
				NORMAL: {
					value: [36, samples * 3, 'float32'],
					dimensions: 3
				},
				TEXCOORD0: {
					value: [72, samples * 2, 'float32'],
					dimensions: 2
				}
			},
			vertexCount: samples,
			indices: [96, samples, 'uint16']
		});
		return config;
	}
};

var MeshConfigjs_mesh = function() {
    var config = this.gooObject("mesh", "Dummy");
    var samples = 3;
    ObjectUtil_ObjectUtilsjs.extend(config, {
        binaryRef: this.binary(128),
        type: "Mesh",
        indexLengths: [samples],
        indexModes: ["Triangles"],

        attributes: {
            POSITION: {
                value: [0, samples * 3, "float32"],
                dimensions: 3
            },

            NORMAL: {
                value: [36, samples * 3, "float32"],
                dimensions: 3
            },

            TEXCOORD0: {
                value: [72, samples * 2, "float32"],
                dimensions: 2
            }
        },

        vertexCount: samples,
        indices: [96, samples, "uint16"]
    });
    return config;
};

export { MeshConfigjs_mesh as mesh };
