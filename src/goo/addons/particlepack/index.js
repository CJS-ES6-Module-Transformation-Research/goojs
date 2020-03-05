import {     ParticleSystemComponent as ParticleSystemComponent_ParticleSystemComponentjs, } from "./components/ParticleSystemComponent";
import { ConstantCurve as ConstantCurve_ConstantCurvejs } from "./curves/ConstantCurve";
import { Curve as Curve_Curvejs } from "./curves/Curve";
import { LerpCurve as LerpCurve_LerpCurvejs } from "./curves/LerpCurve";
import { LinearCurve as LinearCurve_LinearCurvejs } from "./curves/LinearCurve";
import { PolyCurve as PolyCurve_PolyCurvejs } from "./curves/PolyCurve";
import { Vector3Curve as Vector3Curve_Vector3Curvejs } from "./curves/Vector3Curve";
import { Vector4Curve as Vector4Curve_Vector4Curvejs } from "./curves/Vector4Curve";
import {     ParticleSystemComponentHandler as ParticleSystemComponentHandler_ParticleSystemComponentHandlerjs, } from "./handlers/ParticleSystemComponentHandler";
import { ParticleData as ParticleData_ParticleDatajs } from "./ParticleData";
import {     ParticleDebugRenderSystem as ParticleDebugRenderSystem_ParticleDebugRenderSystemjs, } from "./systems/ParticleDebugRenderSystem";
import { ParticleSystemSystem as ParticleSystemSystem_ParticleSystemSystemjs } from "./systems/ParticleSystemSystem";
module.exports = {
	ParticleSystemComponent: ParticleSystemComponent_ParticleSystemComponentjs,
	ConstantCurve: ConstantCurve_ConstantCurvejs,
	Curve: Curve_Curvejs,
	LerpCurve: LerpCurve_LerpCurvejs,
	LinearCurve: LinearCurve_LinearCurvejs,
	PolyCurve: PolyCurve_PolyCurvejs,
	Vector3Curve: Vector3Curve_Vector3Curvejs,
	Vector4Curve: Vector4Curve_Vector4Curvejs,
	ParticleSystemComponentHandler: ParticleSystemComponentHandler_ParticleSystemComponentHandlerjs,
	ParticleData: ParticleData_ParticleDatajs,
	ParticleDebugRenderSystem: ParticleDebugRenderSystem_ParticleDebugRenderSystemjs,
	ParticleSystemSystem: ParticleSystemSystem_ParticleSystemSystemjs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}