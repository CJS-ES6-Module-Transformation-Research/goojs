var RenderSystem_RenderSystem = RenderSystem;
import { System as entitiessystemsSystem_Systemjs } from "../../entities/systems/System";
import { SystemBusjs as entitiesSystemBus_SystemBusjsjs } from "../../entities/SystemBus";
import { SimplePartitioner as rendererSimplePartitioner_SimplePartitionerjs } from "../../renderer/SimplePartitioner";
import { Material as rendererMaterial_Materialjs } from "../../renderer/Material";

import {
    uber as ShaderLibjs_uber,
    simple as ShaderLibjs_simple,
    simpleColored as ShaderLibjs_simpleColored,
    simpleLit as ShaderLibjs_simpleLit,
    textured as ShaderLibjs_textured,
    showNormals as ShaderLibjs_showNormals,
} from "../../renderer/shaders/ShaderLib";

import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../../util/ObjectUtils";
function RenderSystem() {
	entitiessystemsSystem_Systemjs.call(this, 'RenderSystem', ['MeshRendererComponent', 'MeshDataComponent']);

	this.entities = [];
	this.renderList = [];
	this.postRenderables = [];
	this.partitioner = new rendererSimplePartitioner_SimplePartitionerjs();
	this.preRenderers = [];
	this.composers = [];
	this._composersActive = true;
	this.doRender = true;

	this._debugMaterials = {};
	this.overrideMaterials = [];
	this.partitioningCamera = null;

	this.camera = null;
	this.lights = [];
	this.currentTpf = 0.0;

	entitiesSystemBus_SystemBusjsjs.addListener('goo.setCurrentCamera', function (newCam) {
		this.camera = newCam.camera;
	}.bind(this));

	entitiesSystemBus_SystemBusjsjs.addListener('goo.setLights', function (lights) {
		this.lights = lights;
	}.bind(this));

	this.picking = {
		doPick: false,
		x: 0,
		y: 0,
		pickingStore: {},
		pickingCallback: function (id, depth) {
			console.log(id, depth);
		},
		skipUpdateBuffer: false
	};
}

RenderSystem.prototype = Object.create(entitiessystemsSystem_Systemjs.prototype);
RenderSystem.prototype.constructor = RenderSystem;

RenderSystem.prototype.pick = function (x, y, callback, skipUpdateBuffer) {
	this.picking.x = x;
	this.picking.y = y;
	this.picking.skipUpdateBuffer = skipUpdateBuffer === undefined ? false : skipUpdateBuffer;
	if (callback) {
		this.picking.pickingCallback = callback;
	}
	this.picking.doPick = true;
};

RenderSystem.prototype.inserted = function (entity) {
	if (this.partitioner) {
		this.partitioner.added(entity);
	}
};

RenderSystem.prototype.deleted = function (entity) {
	if (this.partitioner) {
		this.partitioner.removed(entity);
	}
};

RenderSystem.prototype.process = function (entities, tpf) {
	this.entities = entities;
	this.currentTpf = tpf;
};

RenderSystem.prototype.render = function (renderer) {
	if (!this.doRender) {
		return;
	}

	if (this.camera) {
		renderer.updateShadows(this.partitioner, this.entities, this.lights);

		for (var i = 0; i < this.preRenderers.length; i++) {
			var preRenderer = this.preRenderers[i];
			preRenderer.process(renderer, this.entities, this.partitioner, this.camera, this.lights);
		}

		if (this.partitioningCamera) {
			this.partitioner.process(this.partitioningCamera, this.entities, this.renderList);
		} else {
			this.partitioner.process(this.camera, this.entities, this.renderList);
		}

		if (this.composers.length > 0 && this._composersActive) {
			for (var i = 0; i < this.composers.length; i++) {
				var composer = this.composers[i];
				composer.render(renderer, this.currentTpf, this.camera, this.lights, null, true, this.overrideMaterials);
			}
		} else {
			renderer.render(this.renderList, this.camera, this.lights, null, true, this.overrideMaterials);
		}
	}
};

RenderSystem.prototype.renderToPick = function (renderer, skipUpdateBuffer) {
	renderer.renderToPick(this.renderList, this.camera, true, skipUpdateBuffer);
};

RenderSystem.prototype.enableComposers = function (activate) {
	this._composersActive = !!activate;
};

RenderSystem.prototype._createDebugMaterial = function (key) {
	if (key === '') {
		return;
	}
	var fshader;
	switch (key) {
		case 'wireframe':
		case 'color':
			fshader = utilObjectUtils_ObjectUtilsjs.deepClone(ShaderLibjs_simpleColored.fshader);
			break;
		case 'lit':
			fshader = utilObjectUtils_ObjectUtilsjs.deepClone(ShaderLibjs_simpleLit.fshader);
			break;
		case 'texture':
			fshader = utilObjectUtils_ObjectUtilsjs.deepClone(ShaderLibjs_textured.fshader);
			break;
		case 'normals':
			fshader = utilObjectUtils_ObjectUtilsjs.deepClone(ShaderLibjs_showNormals.fshader);
			break;
		case 'simple':
			fshader = utilObjectUtils_ObjectUtilsjs.deepClone(ShaderLibjs_simple.fshader);
			break;
	}
	var shaderDef = utilObjectUtils_ObjectUtilsjs.deepClone(ShaderLibjs_uber);
	shaderDef.fshader = fshader;
	if (key !== 'flat') {
		this._debugMaterials[key] = new rendererMaterial_Materialjs(shaderDef, key);
		if (key === 'wireframe') {
			this._debugMaterials[key].wireframe = true;
		}
		if (key === 'lit') {
			this._debugMaterials[key]._textureMaps = {
				EMISSIVE_MAP: null,
				DIFFUSE_MAP: null,
				SPECULAR_MAP: null,
				NORMAL_MAP: null,
				AO_MAP: null,
				LIGHT_MAP: null,
				TRANSPARENCY_MAP: null
			};
		}
	} else {
		this._debugMaterials[key] = rendererMaterial_Materialjs.createEmptyMaterial(null, key);
		this._debugMaterials[key].flat = true;
	}
};

RenderSystem.prototype.setDebugMaterial = function (key) {
	if (!key || key === '') {
		this.overrideMaterials = [];
		return;
	}
	var debugs = key.split('+');
	this.overrideMaterials = [];

	for (var i = 0; i < debugs.length; i++) {
		var key = debugs[i];
		if (!this._debugMaterials[key]) {
			this._createDebugMaterial(key);
		}
		if (key === '') {
			this.overrideMaterials.push(null);
		} else {
			this.overrideMaterials.push(this._debugMaterials[key]);
		}
	}
};

RenderSystem.prototype.invalidateHandles = function (renderer) {
	for (var i = 0; i < this.entities.length; i++) {
		var entity = this.entities[i];

		var materials = entity.meshRendererComponent.materials;
		for (var j = 0; j < materials.length; j++) {
			renderer.invalidateMaterial(materials[j]);
		}
		renderer.invalidateMeshData(entity.meshDataComponent.meshData);
	}

	for (var i = 0; i < this.composers.length; i++) {
		var composer = this.composers[i];
		renderer.invalidateComposer(composer);
	}

	renderer.rendererRecord = null; // might hold on to stuff
};

/**
 * Renders entities/renderables using a configurable partitioner for culling
 * @property {boolean} doRender Only render if set to true
 * @extends System
 */
export { RenderSystem_RenderSystem as RenderSystem };