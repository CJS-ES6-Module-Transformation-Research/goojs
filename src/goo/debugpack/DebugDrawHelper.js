var CameraComponent;
var LightComponent;
var update;
var getRenderablesFor;
import { SkeletonPose as SkeletonPose_SkeletonPose } from "../animationpack/SkeletonPose";
import { DirectionalLight as DirectionalLight_DirectionalLight } from "../renderer/light/DirectionalLight";
import { SpotLight as SpotLight_SpotLight } from "../renderer/light/SpotLight";
import { LightDebug as LightDebug_LightDebug } from "./shapes/LightDebug";
import { CameraDebug as CameraDebug_CameraDebug } from "./shapes/CameraDebug";
import { MeshRendererDebug as MeshRendererDebug_MeshRendererDebug } from "./shapes/MeshRendererDebug";
import { SkeletonDebug as SkeletonDebug_SkeletonDebug } from "./shapes/SkeletonDebug";
import { Material as Material_Material } from "../renderer/Material";
import { ShaderLib as ShaderLib_ShaderLib } from "../renderer/shaders/ShaderLib";
import { Transform as Transform_Transform } from "../math/Transform";
import { Camera as Camera_Camera } from "../renderer/Camera";
import { Renderer as Renderer_Renderer } from "../renderer/Renderer";

var lightDebug = new LightDebug_LightDebug();
var cameraDebug = new CameraDebug_CameraDebug();
var meshRendererDebug = new MeshRendererDebug_MeshRendererDebug();
var skeletonDebug = new SkeletonDebug_SkeletonDebug();

getRenderablesFor = function (component, options) {
	var meshes, material;

	if (component.type === 'LightComponent') {
		meshes = lightDebug.getMesh(component.light, options);
		material = new Material_Material(ShaderLib_ShaderLib.simpleColored, 'DebugDrawLightMaterial');
	} else if (component.type === 'CameraComponent') {
		meshes = cameraDebug.getMesh(component.camera, options);
		material = new Material_Material(ShaderLib_ShaderLib.simpleLit, 'DebugDrawCameraMaterial');

		material.uniforms.materialAmbient = [0.4, 0.4, 0.4, 1];
		material.uniforms.materialDiffuse = [0.6, 0.6, 0.6, 1];
		material.uniforms.materialSpecular = [0.0, 0.0, 0.0, 1];
	} else if (component.type === 'MeshRendererComponent') {
		meshes = meshRendererDebug.getMesh();
		material = new Material_Material(ShaderLib_ShaderLib.simpleColored, 'DebugMeshRendererComponentMaterial');
	} else if (component instanceof SkeletonPose_SkeletonPose) {
		meshes = skeletonDebug.getMesh(component, options);
		var materials = [
			new Material_Material(ShaderLib_ShaderLib.uber, 'SkeletonDebugMaterial'),
			new Material_Material(ShaderLib_ShaderLib.uber, 'SkeletonDebugMaterial')
		];
		var renderables = [];
		var len = materials.length;
		while (len--) {
			var material = materials[len];
			material.depthState = {
				enabled: false,
				write: false
			};
			material.renderQueue = 3000;
			material.uniforms.materialDiffuse = [0, 0, 0, 1];
			material.uniforms.materialDiffuse[len] = 0.8;
			material.uniforms.materialAmbient = [0, 0, 0, 1];
			material.uniforms.materialAmbient[len] = 0.5;
			renderables[len] = {
				meshData: meshes[len],
				transform: new Transform_Transform(),
				materials: [material],
				currentPose: component
			};
		}
		return renderables;
	}

	return meshes.map(function (mesh) {
		return {
			meshData: mesh,
			transform: new Transform_Transform(),
			materials: [material]
		};
	});
};

update = function (renderables, component, camera, renderer) {
	// major refactoring needed here


	if (component.camera) {
		var camera = component.camera;

		if (renderer) {
			renderer.checkResize(camera, true);
		}

		if (component.camera.changedProperties) {
			if (renderables.length > 1 &&
				((camera.far / camera.near) !== renderables[1].farNear ||
					camera.fov !== renderables[1].fov ||
					camera.size !== renderables[1].size ||
					camera.aspect !== renderables[1].aspect ||
					camera.projectionMode !== renderables[1].projectionMode
				)) {
				renderables[1].meshData = CameraDebug_CameraDebug.buildFrustum(camera);
				renderables[1].farNear = camera.far / camera.near;
				renderables[1].fov = camera.fov;
				renderables[1].size = camera.size;
				renderables[1].aspect = camera.aspect;
				renderables[1].projectionMode = camera.projectionMode;
			}
			component.camera.changedProperties = false;
		}
	}

	// updating materials
	DebugDrawHelper[component.type].updateMaterial(renderables[0].materials[0], component);
	if (renderables[1]) { DebugDrawHelper[component.type].updateMaterial(renderables[1].materials[0], component); }
	// updating the transform on the second element which is assumed to need this
	if (renderables[1]) { DebugDrawHelper[component.type].updateTransform(renderables[1].transform, component); }

	// keeping scale the same on the first element which is assumed to always be the camera mesh/light 'bulb'
	var mainCamera = Renderer_Renderer.mainCamera;
	if (mainCamera) {
		var camPosition = mainCamera.translation;
		var scale = renderables[0].transform.translation.distance(camPosition) / 30;
		if (mainCamera.projectionMode === Camera_Camera.Parallel) {
			scale = (mainCamera._frustumTop - mainCamera._frustumBottom) / 20;
		}
		renderables[0].transform.scale.setDirect(scale, scale, scale);
		renderables[0].transform.update();

		// keeping scale for directional light mesh since scale is meaningless for it
		if (component.light && component.light instanceof DirectionalLight_DirectionalLight) {
			if (renderables[1]) { renderables[1].transform.scale.scale(scale); } // not enough scale!
			if (renderables[1]) { renderables[1].transform.update(); }
		}
	}
};

LightComponent = {};
CameraComponent = {};

LightComponent.updateMaterial = function (material, component) {
	var light = component.light;
	var color = material.uniforms.color = material.uniforms.color || [];
	color[0] = light.color.x;
	color[1] = light.color.y;
	color[2] = light.color.z;
};

LightComponent.updateTransform = function (transform, component) {
	var light = component.light;
	if (!(light instanceof DirectionalLight_DirectionalLight)) {
		var range = light.range;
		transform.scale.setDirect(range, range, range);
		if (light instanceof SpotLight_SpotLight) {
			var angle = light.angle * Math.PI / 180;
			var tan = Math.tan(angle / 2);
			transform.scale.mulDirect(tan, tan, 1);
		}
	}
	transform.update();
};

CameraComponent.updateMaterial = function (material/*, component*/) {
	material.uniforms.color = material.uniforms.color || [1, 1, 1];
};

CameraComponent.updateTransform = function (/*transform, component*/) {
	// var camera = component.camera;
	// var z = camera.far;
	// var y = z * Math.tan(camera.fov / 2 * Math.PI/180);
	// var x = y * camera.aspect;
	// transform.scale.setDirect(x, y, z);
	// transform.update();
};

export { getRenderablesFor, update };