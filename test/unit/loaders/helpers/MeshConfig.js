'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MeshConfigjs = undefined;

var _ObjectUtil = require('../../../../src/goo/util/ObjectUtil');

var MeshConfigjs_MeshConfigjs;

exports.MeshConfigjs = MeshConfigjs_MeshConfigjs = {
	mesh: function mesh() {
		var config = this.gooObject('mesh', 'Dummy');
		var samples = 3;
		_ObjectUtil.ObjectUtils.extend(config, {
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
exports.MeshConfigjs = MeshConfigjs_MeshConfigjs;