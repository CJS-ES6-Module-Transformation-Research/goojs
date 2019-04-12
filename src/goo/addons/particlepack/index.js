import componentsParticleSystemComponent_moduleDefault from "./components/ParticleSystemComponent";
import curvesConstantCurve_moduleDefault from "./curves/ConstantCurve";
import curvesCurve_moduleDefault from "./curves/Curve";
import curvesLerpCurve_moduleDefault from "./curves/LerpCurve";
import curvesLinearCurve_moduleDefault from "./curves/LinearCurve";
import curvesPolyCurve_moduleDefault from "./curves/PolyCurve";
import curvesVector3Curve_moduleDefault from "./curves/Vector3Curve";
import curvesVector4Curve_moduleDefault from "./curves/Vector4Curve";
import handlersParticleSystemComponentHandler_moduleDefault from "./handlers/ParticleSystemComponentHandler";
import ParticleData_moduleDefault from "./ParticleData";
import systemsParticleDebugRenderSystem_moduleDefault from "./systems/ParticleDebugRenderSystem";
import systemsParticleSystemSystem_moduleDefault from "./systems/ParticleSystemSystem";
export default {
	ParticleSystemComponent: componentsParticleSystemComponent_moduleDefault,
	ConstantCurve: curvesConstantCurve_moduleDefault,
	Curve: curvesCurve_moduleDefault,
	LerpCurve: curvesLerpCurve_moduleDefault,
	LinearCurve: curvesLinearCurve_moduleDefault,
	PolyCurve: curvesPolyCurve_moduleDefault,
	Vector3Curve: curvesVector3Curve_moduleDefault,
	Vector4Curve: curvesVector4Curve_moduleDefault,
	ParticleSystemComponentHandler: handlersParticleSystemComponentHandler_moduleDefault,
	ParticleData: ParticleData_moduleDefault,
	ParticleDebugRenderSystem: systemsParticleDebugRenderSystem_moduleDefault,
	ParticleSystemSystem: systemsParticleSystemSystem_moduleDefault
};;

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}