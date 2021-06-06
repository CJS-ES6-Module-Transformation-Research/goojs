import {     ParticleSystemComponent as componentsParticleSystemComponent_ParticleSystemComponent, } from "./components/ParticleSystemComponent";
import { ConstantCurve as curvesConstantCurve_ConstantCurve } from "./curves/ConstantCurve";
import { Curve as curvesCurve_Curve } from "./curves/Curve";
import { LerpCurve as curvesLerpCurve_LerpCurve } from "./curves/LerpCurve";
import { LinearCurve as curvesLinearCurve_LinearCurve } from "./curves/LinearCurve";
import { PolyCurve as curvesPolyCurve_PolyCurve } from "./curves/PolyCurve";
import { Vector3Curve as curvesVector3Curve_Vector3Curve } from "./curves/Vector3Curve";
import { Vector4Curve as curvesVector4Curve_Vector4Curve } from "./curves/Vector4Curve";
import {     ParticleSystemComponentHandler as handlersParticleSystemComponentHandler_ParticleSystemComponentHandler, } from "./handlers/ParticleSystemComponentHandler";
import { ParticleData as ParticleData_ParticleData } from "./ParticleData";
import {     ParticleDebugRenderSystem as systemsParticleDebugRenderSystem_ParticleDebugRenderSystem, } from "./systems/ParticleDebugRenderSystem";
import { ParticleSystemSystem as systemsParticleSystemSystem_ParticleSystemSystem } from "./systems/ParticleSystemSystem";
mod_indexjs = {
	ParticleSystemComponent: componentsParticleSystemComponent_ParticleSystemComponent,
	ConstantCurve: curvesConstantCurve_ConstantCurve,
	Curve: curvesCurve_Curve,
	LerpCurve: curvesLerpCurve_LerpCurve,
	LinearCurve: curvesLinearCurve_LinearCurve,
	PolyCurve: curvesPolyCurve_PolyCurve,
	Vector3Curve: curvesVector3Curve_Vector3Curve,
	Vector4Curve: curvesVector4Curve_Vector4Curve,
	ParticleSystemComponentHandler: handlersParticleSystemComponentHandler_ParticleSystemComponentHandler,
	ParticleData: ParticleData_ParticleData,
	ParticleDebugRenderSystem: systemsParticleDebugRenderSystem_ParticleDebugRenderSystem,
	ParticleSystemSystem: systemsParticleSystemSystem_ParticleSystemSystem
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
var mod_indexjs;
export { mod_indexjs as indexjs };