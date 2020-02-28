import { Capabilities as Capabilitiesjs } from "../../renderer/Capabilities";
import { Vector3 as Vector3js } from "../../math/Vector3";
import { FullscreenPass as FullscreenPassjs } from "../../renderer/pass/FullscreenPass";
import { Camera as Camerajs } from "../../renderer/Camera";
import { Material as Materialjs } from "../../renderer/Material";

import {
    convolution as ShaderLibjs_convolution,
    downsample as ShaderLibjs_downsample,
    lightDepth as ShaderLibjs_lightDepth,
} from "../../renderer/shaders/ShaderLib";

import { RenderTarget as RenderTargetjs } from "../../renderer/pass/RenderTarget";
import { Vector4 as Vector4js } from "../../math/Vector4";
import { PointLight as PointLightjs } from "../../renderer/light/PointLight";
import { SpotLight as SpotLightjs } from "../../renderer/light/SpotLight";
function ShadowHandler() {
	this.depthMaterial = new Materialjs(ShaderLibjs_lightDepth, 'depthMaterial');
	this.depthMaterial.cullState.cullFace = 'Back';
	this.depthMaterial.fullOverride = true;
	this.fullscreenPass = new FullscreenPassjs();
	this.downsample = Materialjs.createShader(ShaderLibjs_downsample, 'downsample');

	var sigma = 2;
	this.blurfilter = Materialjs.createShader(ShaderLibjs_convolution, 'blurfilter');
	var kernelSize = 2 * Math.ceil(sigma * 3.0) + 1;
	this.blurfilter.defines = {
		KERNEL_SIZE_FLOAT: kernelSize.toFixed(1),
		KERNEL_SIZE_INT: kernelSize.toFixed(0)
	};
	this.blurfilter.uniforms.cKernel = ShaderLibjs_convolution.buildKernel(sigma);

	this.oldClearColor = new Vector4js(0, 0, 0, 0);
	this.shadowClearColor = new Vector4js(1, 1, 1, 1);

	this.renderList = [];
	this.shadowList = [];

	this.first = true;
}

var tmpVec = new Vector3js();

ShadowHandler.prototype._createShadowData = function (shadowSettings, renderer) {
	var shadowX = shadowSettings.resolution[0];
	var shadowY = shadowSettings.resolution[1];

	var linearFloat = !!Capabilitiesjs_TextureFloatLinear;

	if (shadowSettings.shadowData.shadowTarget) {
		renderer._deallocateRenderTarget(shadowSettings.shadowData.shadowTarget);
	}

	if (shadowSettings.shadowType === 'VSM') {
		var floatType = Capabilitiesjs_TextureHalfFloat ? 'HalfFloat' : 'Float';
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
		shadowSettings.shadowData.shadowTargetDown = new RenderTargetjs(shadowX / 2, shadowY / 2, type);
		if (shadowSettings.shadowData.shadowBlurred) {
			renderer._deallocateRenderTarget(shadowSettings.shadowData.shadowBlurred);
		}
		shadowSettings.shadowData.shadowBlurred = new RenderTargetjs(shadowX / 2, shadowY / 2, type);

		shadowSettings.shadowData.shadowTarget = new RenderTargetjs(shadowX, shadowY, {
			type: floatType,
			magFilter: 'NearestNeighbor',
			minFilter: 'NearestNeighborNoMipMaps'
		});
	} else {
		shadowSettings.shadowData.shadowTarget = new RenderTargetjs(shadowX, shadowY, {
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
				shadowSettings.shadowData.lightCamera = new Camerajs(55, 1, 1, 1000);
			}

			var record = shadowSettings.shadowRecord;
			var lightCamera = shadowSettings.shadowData.lightCamera;

			// Update transformation
			lightCamera.translation.copy(light.translation);
			if (light.direction) {
				tmpVec.set(light.translation).add(light.direction);
				lightCamera.lookAt(tmpVec, shadowSettings.upVector);
			} else {
				lightCamera.lookAt(Vector3js_ZERO, shadowSettings.upVector);
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

				if (light instanceof SpotLightjs) {
					lightCamera.setFrustumPerspective(light.angle, shadowSettings.resolution[0] / shadowSettings.resolution[1], shadowSettings.near, shadowSettings.far);
				} else if (light instanceof PointLightjs) {
					lightCamera.setFrustumPerspective(90, shadowSettings.resolution[0] / shadowSettings.resolution[1], shadowSettings.near, shadowSettings.far);
				} else {
					var radius = shadowSettings.size;
					lightCamera.setFrustum(shadowSettings.near, shadowSettings.far, -radius, radius, radius, -radius);
					lightCamera.projectionMode = Camerajs_Parallel;
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

var exported_ShadowHandler = ShadowHandler;

/**
 * Handles shadow techniques
 */
export { exported_ShadowHandler as ShadowHandler };