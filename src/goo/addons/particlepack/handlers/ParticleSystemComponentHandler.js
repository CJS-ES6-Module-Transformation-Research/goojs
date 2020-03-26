import { ComponentHandler as loadershandlersComponentHandler_ComponentHandlerjs } from "../../../loaders/handlers/ComponentHandler";
import {     ParticleSystemComponent as addonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs, } from "../../../addons/particlepack/components/ParticleSystemComponent";
import { LinearCurve as addonsparticlepackcurvesLinearCurve_LinearCurvejs } from "../../../addons/particlepack/curves/LinearCurve";
import { ConstantCurve as addonsparticlepackcurvesConstantCurve_ConstantCurvejs } from "../../../addons/particlepack/curves/ConstantCurve";
import { PolyCurve as addonsparticlepackcurvesPolyCurve_PolyCurvejs } from "../../../addons/particlepack/curves/PolyCurve";
import { Vector3Curve as addonsparticlepackcurvesVector3Curve_Vector3Curvejs } from "../../../addons/particlepack/curves/Vector3Curve";
import { Vector4Curve as addonsparticlepackcurvesVector4Curve_Vector4Curvejs } from "../../../addons/particlepack/curves/Vector4Curve";
import { LerpCurve as addonsparticlepackcurvesLerpCurve_LerpCurvejs } from "../../../addons/particlepack/curves/LerpCurve";
import { rsvpjs as utilrsvp_rsvpjsjs } from "../../../util/rsvp";
import { ObjectUtils as utilObjectUtils_ObjectUtilsjs } from "../../../util/ObjectUtils";
import { Vector3 as mathVector3_Vector3js } from "../../../math/Vector3";
import { MathUtils as mathMathUtils_MathUtilsjs } from "../../../math/MathUtils";
import { ParticleSystemUtils as utilParticleSystemUtils_ParticleSystemUtilsjs } from "../../../util/ParticleSystemUtils";
function ParticleSystemComponentHandler() {
	loadershandlersComponentHandler_ComponentHandlerjs.apply(this, arguments);
	this._cachedPresetTextures = {};
	this._type = 'ParticleSystemComponent';
}

ParticleSystemComponentHandler.prototype = Object.create(loadershandlersComponentHandler_ComponentHandlerjs.prototype);
ParticleSystemComponentHandler.prototype.constructor = ParticleSystemComponentHandler;
loadershandlersComponentHandler_ComponentHandlerjs._registerClass('particleSystem', ParticleSystemComponentHandler);

function constantCurve(value) {
	return [{
		type: 'constant',
		offset: 0,
		value: value
	}];
}

function linearCurve(k, m) {
	return [{
		type: 'linear',
		offset: 0,
		k: k,
		m: m
	}];
}

/**
 * Prepare component. Set defaults on config here.
 * @param {Object} config
 * @returns {Object}
 * @private
 */
ParticleSystemComponentHandler.prototype._prepare = function (config) {
	return utilObjectUtils_ObjectUtilsjs.defaults(config, {
		gravity: [0, 0, 0],
		seed: -1,
		shapeType: 'cone',
		sphereRadius: 1,
		sphereEmitFromShell: false,
		randomDirection: false,
		coneEmitFrom: 'base',
		boxExtents: [1, 1, 1],
		coneRadius: 1,
		coneAngle: 10,
		coneLength: 1,
		startColor: [constantCurve(1), constantCurve(1), constantCurve(1), constantCurve(1)],
		colorOverLifetime: [constantCurve(1), constantCurve(1), constantCurve(1), constantCurve(1)],
		duration: 5,
		localSpace: true,
		startSpeed: constantCurve(5),
		localVelocityOverLifetime: [constantCurve(0), constantCurve(0), constantCurve(0)],
		worldVelocityOverLifetime: [constantCurve(0), constantCurve(0), constantCurve(0)],
		maxParticles: 100,
		emissionRate: constantCurve(10),
		startLifetime: constantCurve(5),
		renderQueue: 3010,
		discardThreshold: 0,
		loop: false,
		preWarm: true,
		blending: 'NoBlending',
		depthWrite: true,
		depthTest: true,
		textureTilesX: 1,
		textureTilesY: 1,
		textureAnimationCycles: 1,
		textureFrameOverLifetime: linearCurve(1, 0),
		startSize: constantCurve(1),
		sortMode: 'none',
		billboard: true,
		sizeOverLifetime: constantCurve(1),
		startAngle: constantCurve(0),
		rotationSpeedOverLifetime: constantCurve(0),
		texturePreset: 'Custom',
		textureRef: null
	});
};

/**
 * @returns {Component} the created component object
 * @private
 */
ParticleSystemComponentHandler.prototype._create = function () {
	return new addonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs();
};

/**
 * @param {Entity} entity
 * @private
 */
ParticleSystemComponentHandler.prototype._remove = function (entity) {
	entity.clearComponent('ParticleSystemComponent');
};

function createCurve(configs, multiplier) {
	multiplier = multiplier !== undefined ? multiplier : 1;

	var curve = new addonsparticlepackcurvesPolyCurve_PolyCurvejs();

	for (var i = 0; i < configs.length; i++) {
		var config = configs[i];
		switch (config.type) {
		case 'linear':
			curve.addSegment(new addonsparticlepackcurvesLinearCurve_LinearCurvejs({
				timeOffset: config.offset,
				k: config.k * multiplier,
				m: config.m * multiplier
			}));
			break;
		case 'constant':
			curve.addSegment(new addonsparticlepackcurvesConstantCurve_ConstantCurvejs({
				timeOffset: config.offset,
				value: config.value * multiplier
			}));
			break;
		case 'lerp':
			curve.addSegment(new addonsparticlepackcurvesLerpCurve_LerpCurvejs({
				timeOffset: config.offset,
				curveA: createCurve(config.curveA, multiplier),
				curveB: createCurve(config.curveB, multiplier)
			}));
			break;
		}
	}

	return curve;
}

function createVec3Curve(vector) {
	return new addonsparticlepackcurvesVector3Curve_Vector3Curvejs({
		x: createCurve(vector[0]),
		y: createCurve(vector[1]),
		z: createCurve(vector[2])
	});
}

function createVec4Curve(vector) {
	return new addonsparticlepackcurvesVector4Curve_Vector4Curvejs({
		x: createCurve(vector[0]),
		y: createCurve(vector[1]),
		z: createCurve(vector[2]),
		w: createCurve(vector[3])
	});
}

/**
 * @param {Entity} entity The entity on which this component should be added.
 * @param {Object} config
 * @param {Object} options
 * @returns {RSVP.Promise} promise that resolves with the component when loading is done.
 */
ParticleSystemComponentHandler.prototype.update = function (entity, config, options) {
	var that = this;
	return loadershandlersComponentHandler_ComponentHandlerjs.prototype.update.call(this, entity, config, options).then(function (component) {
		if (!component) { return; }

		component.gravity.setArray(config.gravity);
		component.seed = config.seed;
		component.shapeType = config.shapeType;
		component.sphereRadius = config.sphereRadius;
		component.sphereEmitFromShell = config.sphereEmitFromShell;
		component.randomDirection = config.randomDirection;
		component.coneEmitFrom = config.coneEmitFrom;
		component.setBoxExtents(new mathVector3_Vector3js(config.boxExtents));
		component.coneRadius = config.coneRadius;
		component.coneAngle = config.coneAngle * mathMathUtils_MathUtilsjs.DEG_TO_RAD;
		component.coneLength = config.coneLength;
		component.startColor = createVec4Curve(config.startColor);
		component.colorOverLifetime = createVec4Curve(config.colorOverLifetime);
		component.duration = config.duration;
		component.localSpace = config.localSpace;
		component.startSpeed = createCurve(config.startSpeed);
		component.localVelocityOverLifetime = createVec3Curve(config.localVelocityOverLifetime);
		component.worldVelocityOverLifetime = createVec3Curve(config.worldVelocityOverLifetime);
		component.maxParticles = config.maxParticles;
		component.emissionRate = createCurve(config.emissionRate);
		component.startLifetime = createCurve(config.startLifetime);
		component.renderQueue = config.renderQueue;
		component.discardThreshold = config.discardThreshold;
		component.loop = config.loop;
		component.preWarm = config.preWarm;
		component.blending = config.blending;
		component.depthWrite = config.depthWrite;
		component.depthTest = config.depthTest;
		component.textureTilesX = config.textureTilesX;
		component.textureTilesY = config.textureTilesY;
		component.textureFrameOverLifetime = createCurve(config.textureFrameOverLifetime);
		component.textureAnimationCycles = config.textureAnimationCycles;
		component.startSize = createCurve(config.startSize);
		component.sortMode = {
			'none': addonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs.SORT_NONE,
			'camera_distance': addonsparticlepackcomponentsParticleSystemComponent_ParticleSystemComponentjs.SORT_CAMERA_DISTANCE
		}[config.sortMode];
		component.billboard = config.billboard;
		component.sizeOverLifetime = createCurve(config.sizeOverLifetime);
		component.startAngle = createCurve(config.startAngle, mathMathUtils_MathUtilsjs.DEG_TO_RAD);
		component.rotationSpeedOverLifetime = createCurve(config.rotationSpeedOverLifetime, mathMathUtils_MathUtilsjs.DEG_TO_RAD);
		component.autoPlay = config.autoPlay;

		if (!component.paused) {
			component.stop();
		}

		if (component.autoPlay) {
			component.play();
		}

		var promises = [];

		var cachedTextures = that._cachedPresetTextures;

		var textureRef = config.texture && config.texture.enabled && config.texture.textureRef;
		if (textureRef && config.texturePreset === 'Custom') {
			promises.push(that._load(textureRef, options).then(function (texture) {
				component.texture = texture;
				return component;
			}).then(null, function (err) {
				throw new Error('Error loading texture: ' + textureRef + ' - ' + err);
			}));
		} else if (config.texturePreset === 'Flare') {
			cachedTextures.Flare = cachedTextures.Flare || utilParticleSystemUtils_ParticleSystemUtilsjs.createFlareTexture(32);
			component.texture = cachedTextures.Flare;
		} else if (config.texturePreset === 'Splash') {
			cachedTextures.Splash = cachedTextures.Splash || utilParticleSystemUtils_ParticleSystemUtilsjs.createSplashTexture(32);
			component.texture = cachedTextures.Splash;
		} else if (config.texturePreset === 'Plankton') {
			cachedTextures.Plankton = cachedTextures.Plankton || utilParticleSystemUtils_ParticleSystemUtilsjs.createPlanktonTexture(32);
			component.texture = cachedTextures.Plankton;
		} else if (config.texturePreset === 'Snowflake') {
			cachedTextures.Snowflake = cachedTextures.Snowflake || utilParticleSystemUtils_ParticleSystemUtilsjs.createSnowflakeTexture(32);
			component.texture = cachedTextures.Snowflake;
		} else {
			component.texture = null;
		}

		if (promises.length) {
			return utilrsvp_rsvpjsjs.all(promises).then(function () {
				return component;
			});
		} else {
			return component;
		}
	});
};

var exported_ParticleSystemComponentHandler = ParticleSystemComponentHandler;

/**
 * @extends ComponentHandler
 * @hidden
 */
export { exported_ParticleSystemComponentHandler as ParticleSystemComponentHandler };