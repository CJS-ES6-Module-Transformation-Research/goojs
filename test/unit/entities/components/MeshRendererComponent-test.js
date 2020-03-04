import { World as Worldjs } from "../../../../src/goo/entities/World";
import { Entity as Entityjs } from "../../../../src/goo/entities/Entity";
import { ShaderLib as ShaderLibjs } from "../../../../src/goo/renderer/shaders/ShaderLib";
import { Material as Materialjs } from "../../../../src/goo/renderer/Material";
import { MeshRendererComponent as MeshRendererComponentjs } from "../../../../src/goo/entities/components/MeshRendererComponent";

describe('MeshRendererComponent', function () {
	var world;

	beforeEach(function () {
		world = new Worldjs();
		world.registerComponent(MeshRendererComponentjs);
	});

	describe('.applyOnEntity', function () {
		it('sets a MeshRendererComponent when trying to add a Material', function () {
			var entity = new Entityjs(world);
			var material = new Materialjs(ShaderLibjs.simpleColored, '');
			entity.set(material);

			expect(entity.meshRendererComponent).toBeTruthy();
			expect(entity.meshRendererComponent.materials).toEqual([material]);
		});

		it('adds a material to an entity which already has a MeshRendererComponent', function () {
			var entity = new Entityjs(world);
			var meshRendererComponent = new MeshRendererComponentjs();
			entity.set(meshRendererComponent);

			var material = new Materialjs(ShaderLibjs.simpleColored, '');
			entity.set(material);

			expect(entity.meshRendererComponent).toBe(meshRendererComponent);
			expect(entity.meshRendererComponent.materials).toEqual([material]);
		});
	});

	describe('on-entity api', function () {
		var meshRendererComponent, entity;

		beforeEach(function () {
			meshRendererComponent = new MeshRendererComponentjs(ShaderLibjs.simpleLit);
			entity = new Entityjs().set(meshRendererComponent);
		});

		it('changes the diffuse color when given 3 numbers', function () {
			entity.setDiffuse(0.11, 0.22, 0.33);

			var diffuse = meshRendererComponent.materials[0].uniforms.materialDiffuse;
			expect(diffuse[0]).toBeCloseTo(0.11);
			expect(diffuse[1]).toBeCloseTo(0.22);
			expect(diffuse[2]).toBeCloseTo(0.33);
			expect(diffuse[3]).toBeCloseTo(1);
		});

		it('changes the diffuse color when given 4 numbers', function () {
			entity.setDiffuse(0.55, 0.66, 0.77, 0.88);

			var diffuse = meshRendererComponent.materials[0].uniforms.materialDiffuse;
			expect(diffuse[0]).toBeCloseTo(0.55);
			expect(diffuse[1]).toBeCloseTo(0.66);
			expect(diffuse[2]).toBeCloseTo(0.77);
			expect(diffuse[3]).toBeCloseTo(0.88);
		});

		it('changes the diffuse color when given a 3 element array', function () {
			entity.setDiffuse([0.11, 0.22, 0.33]);

			var diffuse = meshRendererComponent.materials[0].uniforms.materialDiffuse;
			expect(diffuse[0]).toBeCloseTo(0.11);
			expect(diffuse[1]).toBeCloseTo(0.22);
			expect(diffuse[2]).toBeCloseTo(0.33);
			expect(diffuse[3]).toBeCloseTo(1);
		});

		it('changes the diffuse color when given a 4 element array', function () {
			entity.setDiffuse([0.55, 0.66, 0.77, 0.88]);

			var diffuse = meshRendererComponent.materials[0].uniforms.materialDiffuse;
			expect(diffuse[0]).toBeCloseTo(0.55);
			expect(diffuse[1]).toBeCloseTo(0.66);
			expect(diffuse[2]).toBeCloseTo(0.77);
			expect(diffuse[3]).toBeCloseTo(0.88);
		});

		it('changes the diffuse color when given a { r, g, b } object', function () {
			entity.setDiffuse({ r: 0.11, g: 0.22, b: 0.33 });

			var diffuse = meshRendererComponent.materials[0].uniforms.materialDiffuse;
			expect(diffuse[0]).toBeCloseTo(0.11);
			expect(diffuse[1]).toBeCloseTo(0.22);
			expect(diffuse[2]).toBeCloseTo(0.33);
			expect(diffuse[3]).toBeCloseTo(1);
		});

		it('changes the diffuse color when given a { r, g, b, a } object', function () {
			entity.setDiffuse({ r: 0.11, g: 0.22, b: 0.33, a: 0.44 });

			var diffuse = meshRendererComponent.materials[0].uniforms.materialDiffuse;
			expect(diffuse[0]).toBeCloseTo(0.11);
			expect(diffuse[1]).toBeCloseTo(0.22);
			expect(diffuse[2]).toBeCloseTo(0.33);
			expect(diffuse[3]).toBeCloseTo(0.44);
		});

		it('gets the diffuse color', function () {
			meshRendererComponent.materials[0].uniforms.materialDiffuse = [1, 2, 3, 4];
			expect(entity.getDiffuse()).toBe(meshRendererComponent.materials[0].uniforms.materialDiffuse);
		});
	});

	describe('constructor', function () {
		it('creates a MeshRendererComponent from nothing', function () {
			var meshRendererComponent = new MeshRendererComponentjs();
			expect(meshRendererComponent.materials).toEqual([]);
		});

		it('creates a MeshRendererComponent from a material', function () {
			var material = new Materialjs();
			var meshRendererComponent = new MeshRendererComponentjs(material);
			expect(meshRendererComponent.materials).toEqual([material]);
		});

		it('creates a MeshRendererComponent from an array of materials', function () {
			var materials = [new Materialjs('asd'), new Materialjs('dsa')];
			var meshRendererComponent = new MeshRendererComponentjs(materials);
			expect(meshRendererComponent.materials).toEqual(materials);
		});
	});
});