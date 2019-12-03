import { ParticleSystemComponent } from "./components/ParticleSystemComponent";
import { ConstantCurve } from "./curves/ConstantCurve";
import { Curve } from "./curves/Curve";
import { LerpCurve } from "./curves/LerpCurve";
import { LinearCurve } from "./curves/LinearCurve";
import { PolyCurve } from "./curves/PolyCurve";
import { Vector3Curve } from "./curves/Vector3Curve";
import { Vector4Curve } from "./curves/Vector4Curve";
import { ParticleSystemComponentHandler } from "./handlers/ParticleSystemComponentHandler";
import { ParticleData } from "./ParticleData";
import { ParticleDebugRenderSystem } from "./systems/ParticleDebugRenderSystem";
import { ParticleSystemSystem } from "./systems/ParticleSystemSystem";
module.exports = {
	ParticleSystemComponent: ParticleSystemComponent,
	ConstantCurve: ConstantCurve,
	Curve: Curve,
	LerpCurve: LerpCurve,
	LinearCurve: LinearCurve,
	PolyCurve: PolyCurve,
	Vector3Curve: Vector3Curve,
	Vector4Curve: Vector4Curve,
	ParticleSystemComponentHandler: ParticleSystemComponentHandler,
	ParticleData: ParticleData,
	ParticleDebugRenderSystem: ParticleDebugRenderSystem,
	ParticleSystemSystem: ParticleSystemSystem
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}