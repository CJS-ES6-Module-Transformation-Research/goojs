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

module.exports = {
	ParticleSystemComponent: _ParticleSystemComponent.ParticleSystemComponent,
	ConstantCurve: _ConstantCurve.ConstantCurve,
	Curve: Curve_Curvejs,
	LerpCurve: _LerpCurve.LerpCurve,
	LinearCurve: _LinearCurve.LinearCurve,
	PolyCurve: _PolyCurve.PolyCurve,
	Vector3Curve: _Vector3Curve.Vector3Curve,
	Vector4Curve: _Vector4Curve.Vector4Curve,
	ParticleSystemComponentHandler: _ParticleSystemComponentHandler.ParticleSystemComponentHandler,
	ParticleData: _ParticleData.ParticleData,
	ParticleDebugRenderSystem: _ParticleDebugRenderSystem.ParticleDebugRenderSystem,
	ParticleSystemSystem: _ParticleSystemSystem.ParticleSystemSystem
};

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
