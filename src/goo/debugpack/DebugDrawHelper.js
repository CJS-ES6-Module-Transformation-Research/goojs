import { SkeletonPose as animationpackSkeletonPose_SkeletonPosejs } from "../animationpack/SkeletonPose";
import { DirectionalLight as rendererlightDirectionalLight_DirectionalLightjs } from "../renderer/light/DirectionalLight";
import { SpotLight as rendererlightSpotLight_SpotLightjs } from "../renderer/light/SpotLight";
import { LightDebug as shapesLightDebug_LightDebugjs } from "./shapes/LightDebug";

import {
    CameraDebug as shapesCameraDebug_CameraDebugjs,
    buildFrustum as CameraDebugjs_buildFrustum,
} from "./shapes/CameraDebug";

import { MeshRendererDebug as shapesMeshRendererDebug_MeshRendererDebugjs } from "./shapes/MeshRendererDebug";
import { SkeletonDebug as shapesSkeletonDebug_SkeletonDebugjs } from "./shapes/SkeletonDebug";
import { Material as rendererMaterial_Materialjs } from "../renderer/Material";

import {
    uber as ShaderLibjs_uber,
    simpleColored as ShaderLibjs_simpleColored,
    simpleLit as ShaderLibjs_simpleLit,
} from "../renderer/shaders/ShaderLib";

import { Transform as mathTransform_Transformjs } from "../math/Transform";
import { Camera as rendererCamera_Camerajs } from "../renderer/Camera";
import { mainCamera as Rendererjs_mainCamera } from "../renderer/Renderer";

var lightDebug = new shapesLightDebug_LightDebugjs();
var cameraDebug = new shapesCameraDebug_CameraDebugjs();
var meshRendererDebug = new shapesMeshRendererDebug_MeshRendererDebugjs();
var skeletonDebug = new shapesSkeletonDebug_SkeletonDebugjs();

DebugDrawHelper.update = function (renderables, component, camera, renderer) {
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
				renderables[1].meshData = CameraDebugjs_buildFrustum(camera);
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
	var mainCamera = Rendererjs_mainCamera;
	if (mainCamera) {
		var camPosition = mainCamera.translation;
		var scale = renderables[0].transform.translation.distance(camPosition) / 30;
		if (mainCamera.projectionMode === rendererCamera_Camerajs.Parallel) {
			scale = (mainCamera._frustumTop - mainCamera._frustumBottom) / 20;
		}
		renderables[0].transform.scale.setDirect(scale, scale, scale);
		renderables[0].transform.update();

		// keeping scale for directional light mesh since scale is meaningless for it
		if (component.light && component.light instanceof rendererlightDirectionalLight_DirectionalLightjs) {
			if (renderables[1]) { renderables[1].transform.scale.scale(scale); } // not enough scale!
			if (renderables[1]) { renderables[1].transform.update(); }
		}
	}
};

DebugDrawHelper.LightComponent = {};
DebugDrawHelper.CameraComponent = {};

DebugDrawHelper.LightComponent.updateMaterial = function (material, component) {
	var light = component.light;
	var color = material.uniforms.color = material.uniforms.color || [];
	color[0] = light.color.x;
	color[1] = light.color.y;
	color[2] = light.color.z;
};

DebugDrawHelper.LightComponent.updateTransform = function (transform, component) {
	var light = component.light;
	if (!(light instanceof rendererlightDirectionalLight_DirectionalLightjs)) {
		var range = light.range;
		transform.scale.setDirect(range, range, range);
		if (light instanceof rendererlightSpotLight_SpotLightjs) {
			var angle = light.angle * Math.PI / 180;
			var tan = Math.tan(angle / 2);
			transform.scale.mulDirect(tan, tan, 1);
		}
	}
	transform.update();
};

DebugDrawHelper.CameraComponent.updateMaterial = function (material/*, component*/) {
	material.uniforms.color = material.uniforms.color || [1, 1, 1];
};

DebugDrawHelper.CameraComponent.updateTransform = function (/*transform, component*/) {
	// var camera = component.camera;
	// var z = camera.far;
	// var y = z * Math.tan(camera.fov / 2 * Math.PI/180);
	// var x = y * camera.aspect;
	// transform.scale.setDirect(x, y, z);
	// transform.update();
};

var DebugDrawHelper_getRenderablesFor = function(component, options) {
    var meshes, material;

    if (component.type === "LightComponent") {
        meshes = lightDebug.getMesh(component.light, options);
        material = new rendererMaterial_Materialjs(ShaderLibjs_simpleColored, "DebugDrawLightMaterial");
    } else if (component.type === "CameraComponent") {
        meshes = cameraDebug.getMesh(component.camera, options);
        material = new rendererMaterial_Materialjs(ShaderLibjs_simpleLit, "DebugDrawCameraMaterial");

        material.uniforms.materialAmbient = [0.4, 0.4, 0.4, 1];
        material.uniforms.materialDiffuse = [0.6, 0.6, 0.6, 1];
        material.uniforms.materialSpecular = [0.0, 0.0, 0.0, 1];
    } else if (component.type === "MeshRendererComponent") {
        meshes = meshRendererDebug.getMesh();
        material = new rendererMaterial_Materialjs(ShaderLibjs_simpleColored, "DebugMeshRendererComponentMaterial");
    } else if (component instanceof animationpackSkeletonPose_SkeletonPosejs) {
        meshes = skeletonDebug.getMesh(component, options);
        var materials = [
            new rendererMaterial_Materialjs(ShaderLibjs_uber, "SkeletonDebugMaterial"),
            new rendererMaterial_Materialjs(ShaderLibjs_uber, "SkeletonDebugMaterial")
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
                transform: new mathTransform_Transformjs(),
                materials: [material],
                currentPose: component
            };
        }
        return renderables;
    }

    return meshes.map(function(mesh) {
        return {
            meshData: mesh,
            transform: new mathTransform_Transformjs(),
            materials: [material]
        };
    });
};

export { DebugDrawHelper, DebugDrawHelper_getRenderablesFor as getRenderablesFor };