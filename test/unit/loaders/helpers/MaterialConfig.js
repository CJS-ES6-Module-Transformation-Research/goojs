'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fshader = exports.vshader = exports.shader = exports.textureSVG = exports.texture = exports.material = undefined;

var _ObjectUtil = require('../../../../src/goo/util/ObjectUtil');

var MaterialConfigjs = {
	material: function material() {
		var material = this.gooObject('material', 'Dummy');
		_ObjectUtil.ObjectUtils.extend(material, {
			uniforms: {
				materialAmbient: {
					value: [0, 0, 0, 1],
					enabled: true
				},
				materialDiffuse: {
					value: [1, 1, 1, 1],
					enabled: true
				}
			},
			texturesMapping: {},
			shaderRef: this.shader().id,
			blendState: {
				blending: 'NoBlending',
				blendEquation: 'AddEquation',
				blendSrc: 'SrcAlphaFactor',
				blendDst: 'OneMinusSrcAlhphaFactor'
			},
			cullState: {
				enabled: true,
				cullFace: 'Back',
				frontFace: 'CCW'
			},
			depthState: {
				enabled: true,
				write: true
			},
			renderQueue: -1
		});
		return material;
	},
	texture: function texture() {
		var texture = this.gooObject('texture', 'Dummy');
		_ObjectUtil.ObjectUtils.extend(texture, {
			magFilter: 'Bilinear',
			minFilter: 'Trilinear',
			offset: [0, 0],
			repeat: [1, 1],
			imageRef: (typeof window !== 'undefined' && window.__karma__ ? 'base/test/unit/loaders/res/' : '') + 'checker.png',
			wrapS: 'Repeat',
			wrapT: 'Repeat',
			anisotropy: 1,
			flipY: true
		});
		return texture;
	},
	textureSVG: function textureSVG() {
		var texture = this.gooObject('texture', 'Dummy');
		_ObjectUtil.ObjectUtils.extend(texture, {
			magFilter: 'Bilinear',
			minFilter: 'Trilinear',
			offset: [0, 0],
			repeat: [1, 1],
			svgData: "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect x='0' y='0' width='200' height='100' fill='blue' /></svg>",
			wrapS: 'Repeat',
			wrapT: 'Repeat',
			anisotropy: 1,
			flipY: true
		});
		return texture;
	},
	shader: function shader() {
		var shader = this.gooObject('shader', 'Dummy');
		_ObjectUtil.ObjectUtils.extend(shader, {
			attributes: {
				vertexPoisition: 'POSITION',
				vertexNormal: 'NORMAL',
				vertexUV0: 'TEXCOORD0'
			},
			uniforms: {
				viewMatrix: 'VIEW_MATRIX',
				projectionMatrix: 'PROJECTION_MATRIX',
				worldMatrix: 'WORLD_MATRIX',
				cameraPosition: 'CAMERA'
			},
			vshaderRef: this.vshader(),
			fshaderRef: this.fshader(),
			processors: ['uber']
		});
		return shader;
	},
	vshader: function vshader() {
		var ref = this.randomRef('vert');
		var code = "void main() { gl_Position = vec4(1.0); }";
		this.addToBundle(code, ref);
		return ref;
	},
	fshader: function fshader() {
		var ref = this.randomRef('frag');
		var code = "void main() { gl_FragColor = vec4(1.0); }";
		this.addToBundle(code, ref);
		return ref;
	}
};

var MaterialConfigjs_material = function MaterialConfigjs_material() {
	var material = this.gooObject("material", "Dummy");
	_ObjectUtil.ObjectUtils.extend(material, {
		uniforms: {
			materialAmbient: {
				value: [0, 0, 0, 1],
				enabled: true
			},

			materialDiffuse: {
				value: [1, 1, 1, 1],
				enabled: true
			}
		},

		texturesMapping: {},
		shaderRef: this.shader().id,

		blendState: {
			blending: "NoBlending",
			blendEquation: "AddEquation",
			blendSrc: "SrcAlphaFactor",
			blendDst: "OneMinusSrcAlhphaFactor"
		},

		cullState: {
			enabled: true,
			cullFace: "Back",
			frontFace: "CCW"
		},

		depthState: {
			enabled: true,
			write: true
		},

		renderQueue: -1
	});
	return material;
};

var MaterialConfigjs_texture = function MaterialConfigjs_texture() {
	var texture = this.gooObject("texture", "Dummy");
	_ObjectUtil.ObjectUtils.extend(texture, {
		magFilter: "Bilinear",
		minFilter: "Trilinear",
		offset: [0, 0],
		repeat: [1, 1],
		imageRef: (typeof window !== "undefined" && window.__karma__ ? "base/test/unit/loaders/res/" : "") + "checker.png",
		wrapS: "Repeat",
		wrapT: "Repeat",
		anisotropy: 1,
		flipY: true
	});
	return texture;
};

var MaterialConfigjs_textureSVG = function MaterialConfigjs_textureSVG() {
	var texture = this.gooObject("texture", "Dummy");
	_ObjectUtil.ObjectUtils.extend(texture, {
		magFilter: "Bilinear",
		minFilter: "Trilinear",
		offset: [0, 0],
		repeat: [1, 1],
		svgData: "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='100'><rect x='0' y='0' width='200' height='100' fill='blue' /></svg>",
		wrapS: "Repeat",
		wrapT: "Repeat",
		anisotropy: 1,
		flipY: true
	});
	return texture;
};

var MaterialConfigjs_shader = function MaterialConfigjs_shader() {
	var shader = this.gooObject("shader", "Dummy");
	_ObjectUtil.ObjectUtils.extend(shader, {
		attributes: {
			vertexPoisition: "POSITION",
			vertexNormal: "NORMAL",
			vertexUV0: "TEXCOORD0"
		},

		uniforms: {
			viewMatrix: "VIEW_MATRIX",
			projectionMatrix: "PROJECTION_MATRIX",
			worldMatrix: "WORLD_MATRIX",
			cameraPosition: "CAMERA"
		},

		vshaderRef: this.vshader(),
		fshaderRef: this.fshader(),
		processors: ["uber"]
	});
	return shader;
};

var MaterialConfigjs_vshader = function MaterialConfigjs_vshader() {
	var ref = this.randomRef("vert");
	var code = "void main() { gl_Position = vec4(1.0); }";
	this.addToBundle(code, ref);
	return ref;
};

var MaterialConfigjs_fshader = function MaterialConfigjs_fshader() {
	var ref = this.randomRef("frag");
	var code = "void main() { gl_FragColor = vec4(1.0); }";
	this.addToBundle(code, ref);
	return ref;
};

exports.material = MaterialConfigjs_material;
exports.texture = MaterialConfigjs_texture;
exports.textureSVG = MaterialConfigjs_textureSVG;
exports.shader = MaterialConfigjs_shader;
exports.vshader = MaterialConfigjs_vshader;
exports.fshader = MaterialConfigjs_fshader;
