var mod_GizmoRenderSystem = GizmoRenderSystem;
import { System as System_System } from "../../entities/systems/System";
import { SystemBusjs as SystemBus } from "../../entities/SystemBus";
import { Material as Material_Material } from "../../renderer/Material";
import { ShaderFragment as ShaderFragment_ShaderFragment } from "../../renderer/shaders/ShaderFragment";
import { Matrix3 as Matrix3_Matrix3 } from "../../math/Matrix3";
import { Matrix4 as Matrix4_Matrix4 } from "../../math/Matrix4";
import { Vector2 as Vector2_Vector2 } from "../../math/Vector2";
import { MeshData as MeshData_MeshData } from "../../renderer/MeshData";
import { Shader as Shader_Shader } from "../../renderer/Shader";
import { Gizmo as Gizmo_Gizmo } from "../../util/gizmopack/Gizmo";
import { TranslationGizmo as TranslationGizmo_TranslationGizmo } from "../../util/gizmopack/TranslationGizmo";
import { GlobalTranslationGizmo as GlobalTranslationGizmo_GlobalTranslationGizmo } from "../../util/gizmopack/GlobalTranslationGizmo";
import { RotationGizmo as RotationGizmo_RotationGizmo } from "../../util/gizmopack/RotationGizmo";
import { GlobalRotationGizmo as GlobalRotationGizmo_GlobalRotationGizmo } from "../../util/gizmopack/GlobalRotationGizmo";
import { ScaleGizmo as ScaleGizmo_ScaleGizmo } from "../../util/gizmopack/ScaleGizmo";

/**
 * Renders transform gizmos<br>
 * @example-link http://code.gooengine.com/latest/visual-test/goo/util/TransformGizmos/TransformGizmos-vtest.html Working example
 * @property {boolean} doRender Only render if set to true
 * @extends System
 */
function GizmoRenderSystem(callbacks) {
	System_System.call(this, 'GizmoRenderSystem', null);

	this.renderables = [];
	this.camera = null;

	this.gizmos = [
		new TranslationGizmo_TranslationGizmo(),
		new GlobalTranslationGizmo_GlobalTranslationGizmo(),
		new RotationGizmo_RotationGizmo(),
		new GlobalRotationGizmo_GlobalRotationGizmo(),
		new ScaleGizmo_ScaleGizmo()
	];

	this.active = false;
	this.nextGizmo = null;
	this.setupCallbacks(callbacks);

	this.activeGizmo = null;
	this.viewportWidth = 0;
	this.viewportHeight = 0;
	this.domElement = null;

	this.pickingMaterial = Material_Material.createEmptyMaterial(customPickingShader, 'pickingMaterial');
	this.pickingMaterial.blendState = {
		blending: 'NoBlending',
		blendEquation: 'AddEquation',
		blendSrc: 'SrcAlphaFactor',
		blendDst: 'OneMinusSrcAlphaFactor'
	};

	this._devicePixelRatio = 1;

	this._mouseState = new Vector2_Vector2();
	this._oldMouseState = new Vector2_Vector2();

	this._dirty = false;

	this._mouseMove = function (evt) {
		if (!this.activeGizmo) { return; }

		var x = (evt.offsetX !== undefined) ? evt.offsetX : evt.layerX;
		var y = (evt.offsetY !== undefined) ? evt.offsetY : evt.layerY;

		this._mouseState.setDirect(
			x / (this.viewportWidth / this._devicePixelRatio),
			y / (this.viewportHeight / this._devicePixelRatio)
		);

		this._dirty = true;
	}.bind(this);

	SystemBus.addListener('goo.setCurrentCamera', function (newCam) {
		this.camera = newCam.camera;
	}.bind(this));
}

GizmoRenderSystem.prototype = Object.create(System_System.prototype);
GizmoRenderSystem.prototype.constructor = GizmoRenderSystem;

GizmoRenderSystem.prototype.activate = function (id, x, y) {
	this.active = true;
	var handle = Gizmo_Gizmo.getHandle(id);
	if (handle && this.activeGizmo) {
		this._oldMouseState.setDirect(
			x / (this.viewportWidth / this._devicePixelRatio),
			y / (this.viewportHeight / this._devicePixelRatio)
		);

		this.activeGizmo.activate({
			id: id,
			data: handle,
			x: x / (this.viewportWidth / this._devicePixelRatio),
			y: y / (this.viewportHeight / this._devicePixelRatio)
		});

		this.domElement.addEventListener('mousemove', this._mouseMove);
	}
};

GizmoRenderSystem.prototype.deactivate = function () {
	this.activeGizmo.deactivate();

	this.active = false;
	this.domElement.removeEventListener('mousemove', this._mouseMove);
	if (this.nextGizmo !== null) {
		this.setActiveGizmo(this.nextGizmo);
		this.nextGizmo = null;
	}
};

GizmoRenderSystem.prototype.getGizmo = function (id) {
	return this.gizmos[id];
};

GizmoRenderSystem.prototype.show = function (entity) {
	this.entity = entity;
	if (this.activeGizmo) {
		if (this.entity) {
			this.showGizmo(this.activeGizmo);
		} else {
			this.hideGizmo(this.activeGizmo);
		}
	}
};

GizmoRenderSystem.prototype.showGizmo = function (gizmo) {
	gizmo.copyTransform(this.entity.transformComponent.sync().worldTransform);
	if (!gizmo.visible) {
		this.renderables = gizmo.renderables;
		gizmo.visible = true;
	}
};

GizmoRenderSystem.prototype.hideGizmo = function (gizmo) {
	if (gizmo.visible) {
		this.renderables = [];
		gizmo.visible = false;
	}
};

GizmoRenderSystem.prototype.setActiveGizmo = function (id) {
	if (this.active) {
		this.nextGizmo = id;
		return;
	}
	if (this.activeGizmo) {
		this.hideGizmo(this.activeGizmo);
	}
	this.activeGizmo = this.gizmos[id] || null;
	if (this.activeGizmo && this.entity) {
		this.showGizmo(this.activeGizmo);
	}
};

GizmoRenderSystem.prototype.setSnap = function (state) {
	if (!this.activeGizmo) { return; }

	this.activeGizmo.setSnap(state);
};

GizmoRenderSystem.prototype.setupCallbacks = function (callbacks) {
	if (callbacks && callbacks.length === 5) {
		this.gizmos[0].onChange = callbacks[0];
		this.gizmos[1].onChange = callbacks[1];
		this.gizmos[2].onChange = callbacks[2];
		this.gizmos[3].onChange = callbacks[3];
		this.gizmos[4].onChange = callbacks[4];
		return;
	}

	var inverseRotation = new Matrix3_Matrix3();
	var inverseTransformation = new Matrix4_Matrix4();


	var onTranslationChange = function (change) {
		if (!this.entity) { return; }

		var translation = this.entity.transformComponent.sync().transform.translation;
		translation.copy(change);

		if (this.entity.transformComponent.parent) {
			inverseTransformation.copy(this.entity.transformComponent.parent.sync().worldTransform.matrix);
			inverseTransformation.invert();
			translation.applyPostPoint(inverseTransformation);
		}

		this.entity.transformComponent.setUpdated();
	}.bind(this);

	this.gizmos[0].onChange = onTranslationChange;

	this.gizmos[1].onChange = onTranslationChange;


	var onRotationChange = function (change) {
		if (!this.entity) { return; }

		this.entity.transformComponent.sync().transform.rotation.copy(change);

		if (this.entity.transformComponent.parent) {
			inverseRotation.copy(this.entity.transformComponent.parent.sync().worldTransform.rotation);
			inverseRotation.invert();
			this.entity.transformComponent.transform.rotation.mul(inverseRotation);
		}

		this.entity.transformComponent.setUpdated();
	}.bind(this);

	// Set bound entities rotation
	this.gizmos[2].onChange = onRotationChange;

	this.gizmos[3].onChange = onRotationChange;


	// Set bound entities scale
	this.gizmos[4].onChange = function (change) {
		if (!this.entity) { return; }

		var scale = this.entity.transformComponent.sync().transform.scale;

		scale.copy(change);

		if (this.entity.transformComponent.parent) {
			scale.div(this.entity.transformComponent.parent.sync().worldTransform.scale);
		}

		this.entity.transformComponent.setUpdated();
	}.bind(this);
};

GizmoRenderSystem.prototype.inserted = function (/*entity*/) {};

GizmoRenderSystem.prototype.deleted = function (/*entity*/) {};

GizmoRenderSystem.prototype.process = function (/*entities, tpf*/) {
	if (!this.activeGizmo) { return; }

	if (this._dirty) {
		this.activeGizmo.process(this._mouseState, this._oldMouseState);
		this._oldMouseState.copy(this._mouseState);
		this._dirty = false;
	}

};

GizmoRenderSystem.prototype.render = function (renderer) {
	if (this.activeGizmo) {
		this.activeGizmo.updateTransforms();
	}

	renderer.checkResize(this.camera);
	this._devicePixelRatio = renderer._useDevicePixelRatio && window.devicePixelRatio ? window.devicePixelRatio / renderer.svg.currentScale : 1;

	if (!this.domElement) {
		this.domElement = renderer.domElement;
	}
	this.viewportHeight = renderer.viewportHeight;
	this.viewportWidth = renderer.viewportWidth;

	if (this.camera) {
		renderer.render(this.renderables, this.camera, this.lights, null, { color: false, stencil: true, depth: true }, this.overrideMaterials);
	}
};

GizmoRenderSystem.prototype.invalidateHandles = function (renderer) {
	renderer.invalidateMaterial(this.pickingMaterial);

	this.gizmos.forEach(function (gizmo) {
		gizmo.renderables.forEach(function (renderable) {
			renderable.materials.forEach(function (material) {
				renderer.invalidateMaterial(material);
			});

			renderer.invalidateMeshData(renderable.meshData);
		});
	});
};

GizmoRenderSystem.prototype.renderToPick = function (renderer, skipUpdateBuffer) {
	for (var i = 0; i < this.renderables.length; i++) {
		var renderable = this.renderables[i];
		if (renderable.thickness !== undefined) {
			renderable.materials[0].uniforms.thickness = renderable.thickness;
		}
	}
	renderer.renderToPick(this.renderables, this.camera, { color: false, stencil: true, depth: true }, skipUpdateBuffer, undefined, undefined, undefined, this.pickingMaterial);
	for (var i = 0; i < this.renderables.length; i++) {
		var renderable = this.renderables[i];
		if (renderable.thickness) {
			renderable.materials[0].uniforms.thickness = 0;
		}
	}
};

var customPickingShader = {
	attributes: {
		vertexPosition: MeshData_MeshData.POSITION,
		vertexNormal: MeshData_MeshData.NORMAL
	},
	processors: [
		function (shader, shaderInfo) {
			var attributeMap = shaderInfo.meshData.attributeMap;

			shader.defines = shader.defines || {};

			for (var attribute in attributeMap) {
				shader.setDefine(attribute, true);
			}
		}
	],
	uniforms: {
		viewMatrix: Shader_Shader.VIEW_MATRIX,
		projectionMatrix: Shader_Shader.PROJECTION_MATRIX,
		worldMatrix: Shader_Shader.WORLD_MATRIX,
		cameraFar: Shader_Shader.FAR_PLANE,
		thickness: 0.0,
		id: function (shaderInfo) {
			return shaderInfo.renderable.id + 1;
		}
	},
	vshader: [
		'attribute vec3 vertexPosition;',
		'#ifdef NORMAL',
		'attribute vec3 vertexNormal;',
		'#endif',

		'uniform mat4 viewMatrix;',
		'uniform mat4 projectionMatrix;',
		'uniform mat4 worldMatrix;',
		'uniform float cameraFar;',
		'uniform float thickness;',

		'varying float depth;',

		'void main() {',
		'  #ifdef NORMAL',
		'  vec4 mvPosition = viewMatrix * worldMatrix * vec4( vertexPosition + vertexNormal * thickness, 1.0 );',
		'  #else',
		'  vec4 mvPosition = viewMatrix * worldMatrix * vec4( vertexPosition, 1.0 );',
		'  #endif',
		'  depth = length(mvPosition.xyz) / cameraFar;',
		'  gl_Position = projectionMatrix * mvPosition;',
		'}'
	].join('\n'),
	fshader: [
		'uniform float id;',

		'varying float depth;',

		ShaderFragment_ShaderFragment.methods.packDepth16,

		'void main() {',
		'  vec2 packedId = vec2(floor(id/255.0), mod(id, 255.0)) * vec2(1.0/255.0);',
		'  vec2 packedDepth = packDepth16(depth);',
		'  gl_FragColor = vec4(packedId, packedDepth);',
		'}'
	].join('\n')
};

/**
 * Renders transform gizmos<br>
 * @example-link http://code.gooengine.com/latest/visual-test/goo/util/TransformGizmos/TransformGizmos-vtest.html Working example
 * @property {boolean} doRender Only render if set to true
 * @extends System
 */
export { mod_GizmoRenderSystem as GizmoRenderSystem };