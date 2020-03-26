import {     ParticleSystemComponentjs as componentsParticleSystemComponent_ParticleSystemComponentjs, } from "./components/ParticleSystemComponent";
import { ConstantCurvejs as curvesConstantCurve_ConstantCurvejs } from "./curves/ConstantCurve";
import { Curvejs as curvesCurve_Curvejs } from "./curves/Curve";
import { LerpCurvejs as curvesLerpCurve_LerpCurvejs } from "./curves/LerpCurve";
import { LinearCurvejs as curvesLinearCurve_LinearCurvejs } from "./curves/LinearCurve";
import { PolyCurvejs as curvesPolyCurve_PolyCurvejs } from "./curves/PolyCurve";
import { Vector3Curvejs as curvesVector3Curve_Vector3Curvejs } from "./curves/Vector3Curve";
import { Vector4Curvejs as curvesVector4Curve_Vector4Curvejs } from "./curves/Vector4Curve";
import {     ParticleSystemComponentHandlerjs as handlersParticleSystemComponentHandler_ParticleSystemComponentHandlerjs, } from "./handlers/ParticleSystemComponentHandler";
import { ParticleDatajs as ParticleData_ParticleDatajs } from "./ParticleData";
import {     ParticleDebugRenderSystemjs as systemsParticleDebugRenderSystem_ParticleDebugRenderSystemjs, } from "./systems/ParticleDebugRenderSystem";
import {     ParticleSystemSystemjs as systemsParticleSystemSystem_ParticleSystemSystemjs, } from "./systems/ParticleSystemSystem";
var indexjs;
indexjs = {
	ParticleSystemComponent: componentsParticleSystemComponent_ParticleSystemComponentjs,
	ConstantCurve: curvesConstantCurve_ConstantCurvejs,
	Curve: curvesCurve_Curvejs,
	LerpCurve: curvesLerpCurve_LerpCurvejs,
	LinearCurve: curvesLinearCurve_LinearCurvejs,
	PolyCurve: curvesPolyCurve_PolyCurvejs,
	Vector3Curve: curvesVector3Curve_Vector3Curvejs,
	Vector4Curve: curvesVector4Curve_Vector4Curvejs,
	ParticleSystemComponentHandler: handlersParticleSystemComponentHandler_ParticleSystemComponentHandlerjs,
	ParticleData: ParticleData_ParticleDatajs,
	ParticleDebugRenderSystem: systemsParticleDebugRenderSystem_ParticleDebugRenderSystemjs,
	ParticleSystemSystem: systemsParticleSystemSystem_ParticleSystemSystemjs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}