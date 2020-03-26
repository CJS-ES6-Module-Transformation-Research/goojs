"use strict";

var _ParticleSystemComponent = require("./components/ParticleSystemComponent");

var _ConstantCurve = require("./curves/ConstantCurve");

var _Curve = require("./curves/Curve");

var _LerpCurve = require("./curves/LerpCurve");

var _LinearCurve = require("./curves/LinearCurve");

var _PolyCurve = require("./curves/PolyCurve");

var _Vector3Curve = require("./curves/Vector3Curve");

var _Vector4Curve = require("./curves/Vector4Curve");

var _ParticleSystemComponentHandler = require("./handlers/ParticleSystemComponentHandler");

var _ParticleData = require("./ParticleData");

var _ParticleDebugRenderSystem = require("./systems/ParticleDebugRenderSystem");

var _ParticleSystemSystem = require("./systems/ParticleSystemSystem");

var indexjs;
indexjs = {
	ParticleSystemComponent: _ParticleSystemComponent.ParticleSystemComponentjs,
	ConstantCurve: _ConstantCurve.ConstantCurvejs,
	Curve: _Curve.Curvejs,
	LerpCurve: _LerpCurve.LerpCurvejs,
	LinearCurve: _LinearCurve.LinearCurvejs,
	PolyCurve: _PolyCurve.PolyCurvejs,
	Vector3Curve: _Vector3Curve.Vector3Curvejs,
	Vector4Curve: _Vector4Curve.Vector4Curvejs,
	ParticleSystemComponentHandler: _ParticleSystemComponentHandler.ParticleSystemComponentHandlerjs,
	ParticleData: _ParticleData.ParticleDatajs,
	ParticleDebugRenderSystem: _ParticleDebugRenderSystem.ParticleDebugRenderSystemjs,
	ParticleSystemSystem: _ParticleSystemSystem.ParticleSystemSystemjs
};

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
