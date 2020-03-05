"use strict";

var _Material = require("../../../src/goo/renderer/Material");

var _ShaderLib = require("../../../src/goo/renderer/shaders/ShaderLib");

describe('Material', function () {
	describe('constructor', function () {
		it('constructs a material given no parameters', function () {
			var material = new _Material.Material();

			expect(material.name).toEqual('Default Material');
			expect(material.shader).toBeNull();
		});

		it('constructs a material given a name only', function () {
			var name = 'alabalaportocala';
			var material = new _Material.Material(name);

			expect(material.name).toEqual(name);
			expect(material.shader).toBeNull();
		});

		it('constructs a material given name shader definition only', function () {
			var material = new _Material.Material(_ShaderLib.ShaderLib.simpleLit);

			expect(material.name).toEqual('Default Material');
			expect(material.shader).not.toBeNull();
		});

		it('constructs a material given a name and a shader definition', function () {
			var name = 'alabalaportocala';
			var material = new _Material.Material(name, _ShaderLib.ShaderLib.simpleLit);

			expect(material.name).toEqual(name);
			expect(material.shader).not.toBeNull();
		});

		it('constructs a material given a shader definition and a name', function () {
			var name = 'alabalaportocala';
			var material = new _Material.Material(_ShaderLib.ShaderLib.simpleLit, name);

			expect(material.name).toEqual(name);
			expect(material.shader).not.toBeNull();
		});
	});
});
