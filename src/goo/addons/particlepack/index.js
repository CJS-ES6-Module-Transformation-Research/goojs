import { ParticleSystemComponent as ParticleSystemComponentjs } from "./components/ParticleSystemComponent";
import { ConstantCurve as ConstantCurvejs } from "./curves/ConstantCurve";
import { Curve } from "./curves/Curve";
import { LerpCurve as LerpCurvejs } from "./curves/LerpCurve";
import { LinearCurve as LinearCurvejs } from "./curves/LinearCurve";
import { PolyCurve as PolyCurvejs } from "./curves/PolyCurve";
import { Vector3Curve as Vector3Curvejs } from "./curves/Vector3Curve";
import { Vector4Curve as Vector4Curvejs } from "./curves/Vector4Curve";
import { ParticleSystemComponentHandler as ParticleSystemComponentHandlerjs } from "./handlers/ParticleSystemComponentHandler";
import { ParticleData } from "./ParticleData";
import { ParticleDebugRenderSystem as ParticleDebugRenderSystemjs } from "./systems/ParticleDebugRenderSystem";
import { ParticleSystemSystem as ParticleSystemSystemjs } from "./systems/ParticleSystemSystem";
module.exports = {
	ParticleSystemComponent: ParticleSystemComponentjs,
	ConstantCurve: ConstantCurvejs,
	Curve: Curve_Curvejs,
	LerpCurve: LerpCurvejs,
	LinearCurve: LinearCurvejs,
	PolyCurve: PolyCurvejs,
	Vector3Curve: Vector3Curvejs,
	Vector4Curve: Vector4Curvejs,
	ParticleSystemComponentHandler: ParticleSystemComponentHandlerjs,
	ParticleData: ParticleData_ParticleDatajs,
	ParticleDebugRenderSystem: ParticleDebugRenderSystemjs,
	ParticleSystemSystem: ParticleSystemSystemjs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}