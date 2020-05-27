import { Material as srcgoorendererMaterial_Materialjs } from "../../../src/goo/renderer/Material";
import { ShaderLib as srcgoorenderershadersShaderLib_ShaderLibjs } from "../../../src/goo/renderer/shaders/ShaderLib";

describe('Material', function () {
	describe('constructor', function () {
		it('constructs a material given no parameters', function () {
			var material = new srcgoorendererMaterial_Materialjs();

			expect(material.name).toEqual('Default Material');
			expect(material.shader).toBeNull();
		});

		it('constructs a material given a name only', function () {
			var name = 'alabalaportocala';
			var material = new srcgoorendererMaterial_Materialjs(name);

			expect(material.name).toEqual(name);
			expect(material.shader).toBeNull();
		});

		it('constructs a material given name shader definition only', function () {
			var material = new srcgoorendererMaterial_Materialjs(srcgoorenderershadersShaderLib_ShaderLibjs.simpleLit);

			expect(material.name).toEqual('Default Material');
			expect(material.shader).not.toBeNull();
		});

		it('constructs a material given a name and a shader definition', function () {
			var name = 'alabalaportocala';
			var material = new srcgoorendererMaterial_Materialjs(name, srcgoorenderershadersShaderLib_ShaderLibjs.simpleLit);

			expect(material.name).toEqual(name);
			expect(material.shader).not.toBeNull();
		});

		it('constructs a material given a shader definition and a name', function () {
			var name = 'alabalaportocala';
			var material = new srcgoorendererMaterial_Materialjs(srcgoorenderershadersShaderLib_ShaderLibjs.simpleLit, name);

			expect(material.name).toEqual(name);
			expect(material.shader).not.toBeNull();
		});
	});
});