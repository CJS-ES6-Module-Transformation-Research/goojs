var ShadowHandler_ShadowHandler = ShadowHandler;
import { Capabilities as rendererCapabilities_Capabilitiesjs } from "../../renderer/Capabilities";
import { Vector3 as mathVector3_Vector3js } from "../../math/Vector3";
import { FullscreenPass as rendererpassFullscreenPass_FullscreenPassjs } from "../../renderer/pass/FullscreenPass";
import { Camera as rendererCamera_Camerajs } from "../../renderer/Camera";
import { Material as rendererMaterial_Materialjs } from "../../renderer/Material";
import { ShaderLib as renderershadersShaderLib_ShaderLibjs } from "../../renderer/shaders/ShaderLib";
import { RenderTarget as rendererpassRenderTarget_RenderTargetjs } from "../../renderer/pass/RenderTarget";
import { Vector4 as mathVector4_Vector4js } from "../../math/Vector4";
import { PointLight as rendererlightPointLight_PointLightjs } from "../../renderer/light/PointLight";
import { SpotLight as rendererlightSpotLight_SpotLightjs } from "../../renderer/light/SpotLight";
function ShadowHandler() {
	this.depthMaterial = new rendererMaterial_Materialjs(renderershadersShaderLib_ShaderLibjs.lightDepth, 'depthMaterial');
	this.depthMaterial.cullState.cullFace = 'Back';
	this.depthMaterial.fullOverride = true;
	this.fullscreenPass = new rendererpassFullscreenPass_FullscreenPassjs();
	this.downsample = rendererMaterial_Materialjs.createShader(renderershadersShaderLib_ShaderLibjs.downsample, 'downsample');

	var sigma = 2;
	this.blurfilter = rendererMaterial_Materialjs.createShader(renderershadersShaderLib_ShaderLibjs.convolution, 'blurfilter');
	var kernelSize = 2 * Math.ceil(sigma * 3.0) + 1;
	this.blurfilter.defines = {
		KERNEL_SIZE_FLOAT: kernelSize.toFixed(1),
		KERNEL_SIZE_INT: kernelSize.toFixed(0)
	};
	this.blurfilter.uniforms.cKernel = renderershadersShaderLib_ShaderLibjs.convolution.buildKernel(sigma);

	this.oldClearColor = new mathVector4_Vector4js(0, 0, 0, 0);
	this.shadowClearColor = new mathVector4_Vector4js(1, 1, 1, 1);

	this.renderList = [];
	this.shadowList = [];

	this.first = true;
}

var tmpVec = new mathVector3_Vector3js();

ShadowHandler.prototype._createShadowData = function (shadowSettings, renderer) {
	var shadowX = shadowSettings.resolution[0];
	var shadowY = shadowSettings.resolution[1];

	var linearFloat = !!rendererCapabilities_Capabilitiesjs.TextureFloatLinear;

	if (shadowSettings.shadowData.shadowTarget) {
		renderer._deallocateRenderTarget(shadowSettings.shadowData.shadowTarget);
	}

	if (shadowSettings.shadowType === 'VSM') {
		var floatType = rendererCapabilities_Capabilitiesjs.TextureHalfFloat ? 'HalfFloat' : 'Float';
		var type = {
			type: floatType
		};
		if (!linearFloat) {
			type.magFilter = 'NearestNeighbor';
			type.minFilter = 'NearestNeighborNoMipMaps';
		}
		if (shadowSettings.shadowData.shadowTargetDown) {
			renderer._deallocateRenderTarget(shadowSettings.shadowData.shadowTargetDown);
		}
		shadowSettings.shadowData.shadowTargetDown = new rendererpassRenderTarget_RenderTargetjs(shadowX / 2, shadowY / 2, type);
		if (shadowSettings.shadowData.shadowBlurred) {
			renderer._deallocateRenderTarget(shadowSettings.shadowData.shadowBlurred);
		}
		shadowSettings.shadowData.shadowBlurred = new rendererpassRenderTarget_RenderTargetjs(shadowX / 2, shadowY / 2, type);

		shadowSettings.shadowData.shadowTarget = new rendererpassRenderTarget_RenderTargetjs(shadowX, shadowY, {
			type: floatType,
			magFilter: 'NearestNeighbor',
			minFilter: 'NearestNeighborNoMipMaps'
		});
	} else {
		shadowSettings.shadowData.shadowTarget = new rendererpassRenderTarget_RenderTargetjs(shadowX, shadowY, {
			magFilter: 'NearestNeighbor',
			minFilter: 'NearestNeighborNoMipMaps'
		});
	}

	shadowSettings.shadowData.shadowResult = null;

	shadowSettings.shadowRecord.resolution = shadowSettings.shadowRecord.resolution || [];
	shadowSettings.shadowRecord.resolution[0] = shadowX;
	shadowSettings.shadowRecord.shadowType = shadowSettings.shadowType;
};

ShadowHandler.prototype.checkShadowRendering = function (renderer, partitioner, entities, lights) {
	if (this.first === true) {
		this.first = false;
		return;
	}
	for (var i = 0; i < lights.length; i++) {
		var light = lights[i];

		if (light.shadowCaster || light.lightCookie) {
			var shadowSettings = light.shadowSettings;

			if (!shadowSettings.shadowData) {
				shadowSettings.shadowData = {};
				shadowSettings.shadowRecord = {};
				shadowSettings.shadowData.lightCamera = new rendererCamera_Camerajs(55, 1, 1, 1000);
			}

			var record = shadowSettings.shadowRecord;
			var lightCamera = shadowSettings.shadowData.lightCamera;

			// Update transformation
			lightCamera.translation.copy(light.translation);
			if (light.direction) {
				tmpVec.set(light.translation).add(light.direction);
				lightCamera.lookAt(tmpVec, shadowSettings.upVector);
			} else {
				lightCamera.lookAt(mathVector3_Vector3js.ZERO, shadowSettings.upVector);
			}

			// Update settings
			if (!shadowSettings.shadowData.shadowTarget ||
				record.angle !== light.angle ||
				!record.resolution ||
				record.resolution[0] !== shadowSettings.resolution[0] ||
				record.resolution[1] !== shadowSettings.resolution[1] ||
				record.near !== shadowSettings.near ||
				record.far !== shadowSettings.far ||
				record.size !== shadowSettings.size
			) {
				if (!record.resolution ||
					record.resolution[0] !== shadowSettings.resolution[0] ||
					record.resolution[1] !== shadowSettings.resolution[1]) {
					this._createShadowData(shadowSettings, renderer);
				}

				if (light instanceof rendererlightSpotLight_SpotLightjs) {
					lightCamera.setFrustumPerspective(light.angle, shadowSettings.resolution[0] / shadowSettings.resolution[1], shadowSettings.near, shadowSettings.far);
				} else if (light instanceof rendererlightPointLight_PointLightjs) {
					lightCamera.setFrustumPerspective(90, shadowSettings.resolution[0] / shadowSettings.resolution[1], shadowSettings.near, shadowSettings.far);
				} else {
					var radius = shadowSettings.size;
					lightCamera.setFrustum(shadowSettings.near, shadowSettings.far, -radius, radius, radius, -radius);
					lightCamera.projectionMode = rendererCamera_Camerajs.Parallel;
				}

				lightCamera.update();

				record.resolution = record.resolution || [];
				record.resolution[0] = shadowSettings.resolution[0];
				record.resolution[1] = shadowSettings.resolution[1];
				record.angle = light.angle;
				record.near = shadowSettings.near;
				record.far = shadowSettings.far;
				record.size = shadowSettings.size;
			}

			if (shadowSettings.shadowType === 'VSM' && record.shadowType !== shadowSettings.shadowType) {
				this._createShadowData(shadowSettings, renderer);

				record.shadowType = shadowSettings.shadowType;
			}
			lightCamera.onFrameChange();

			var matrix = lightCamera.getViewProjectionMatrix().data;
			var vpm = shadowSettings.shadowData.vpm = shadowSettings.shadowData.vpm || [];
			for (var j = 0; j < 16; j++) {
				vpm[j] = matrix[j];
			}

			if (light.shadowCaster) {
				this.depthMaterial.shader.setDefine('SHADOW_TYPE', shadowSettings.shadowType === 'VSM' ? 2 : 0);
				this.depthMaterial.uniforms.cameraScale = 1.0 / (lightCamera.far - lightCamera.near);
				shadowSettings.shadowData.cameraScale = this.depthMaterial.uniforms.cameraScale;

				this.oldClearColor.copy(renderer.clearColor);
				renderer.setClearColor(this.shadowClearColor.r, this.shadowClearColor.g, this.shadowClearColor.b, this.shadowClearColor.a);

				this.shadowList.length = 0;
				for (var j = 0; j < entities.length; j++) {
					var entity = entities[j];
					if (entity.meshRendererComponent && entity.meshRendererComponent.castShadows && !entity.isSkybox) {
						this.shadowList.push(entity);
					}
				}
				partitioner.process(lightCamera, this.shadowList, this.renderList);
				renderer.render(this.renderList, lightCamera, [], shadowSettings.shadowData.shadowTarget, true, this.depthMaterial);

				switch (shadowSettings.shadowType) {
				case 'VSM':
					this.fullscreenPass.material.shader = this.downsample;
					this.fullscreenPass.render(renderer, shadowSettings.shadowData.shadowTargetDown, shadowSettings.shadowData.shadowTarget);

					this.fullscreenPass.material.shader = this.blurfilter;
					this.fullscreenPass.material.uniforms.uImageIncrement = [2 / shadowSettings.resolution[0], 0.0];
					this.fullscreenPass.render(renderer, shadowSettings.shadowData.shadowBlurred, shadowSettings.shadowData.shadowTargetDown);
					this.fullscreenPass.material.uniforms.uImageIncrement = [0.0, 2 / shadowSettings.resolution[1]];
					this.fullscreenPass.render(renderer, shadowSettings.shadowData.shadowTargetDown, shadowSettings.shadowData.shadowBlurred);

					shadowSettings.shadowData.shadowResult = shadowSettings.shadowData.shadowTargetDown;
					break;
				case 'PCF':
					shadowSettings.shadowData.shadowResult = shadowSettings.shadowData.shadowTarget;
					break;
				case 'Basic':
					shadowSettings.shadowData.shadowResult = shadowSettings.shadowData.shadowTarget;
					break;
				default:
					shadowSettings.shadowData.shadowResult = shadowSettings.shadowData.shadowTarget;
					break;
				}

				renderer.setClearColor(this.oldClearColor.r, this.oldClearColor.g, this.oldClearColor.b, this.oldClearColor.a);
			}
		}
	}
};

ShadowHandler.prototype.invalidateHandles = function (renderer) {
	this.fullscreenPass.invalidateHandles(renderer);
	renderer.invalidateMaterial(this.depthMaterial);
	renderer.invalidateShader(this.downsample);
	renderer.invalidateShader(this.blurfilter);
};

/**
 * Handles shadow techniques
 */
export { ShadowHandler_ShadowHandler as ShadowHandler };