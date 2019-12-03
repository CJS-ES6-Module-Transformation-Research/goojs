import * as Scripts from "../scripts/Scripts";
import { OrbitCamControlScript } from "../scripts/OrbitCamControlScript";
import * as OrbitNPanControlScript from "./OrbitNPanControlScript";
import * as FlyControlScript from "./FlyControlScript";
import * as AxisAlignedCamControlScript from "./AxisAlignedCamControlScript";
import * as PanCamScript from "./PanCamScript";
import * as MouseLookControlScript from "./MouseLookControlScript";
import * as WasdControlScript from "./WasdControlScript";
import * as ButtonScript from "./ButtonScript";
import * as PickAndRotateScript from "./PickAndRotateScript";
import * as LensFlareScript from "./LensFlareScript";

var scripts = {
	OrbitCamControlScript: OrbitCamControlScript,
	OrbitNPanControlScript: OrbitNPanControlScript,
	FlyControlScript: FlyControlScript,
	AxisAlignedCamControlScript: AxisAlignedCamControlScript,
	PanCamScript: PanCamScript,
	MouseLookControlScript: MouseLookControlScript,
	WasdControlScript: WasdControlScript,
	ButtonScript: ButtonScript,
	PickAndRotateScript: PickAndRotateScript,
	LensFlareScript: LensFlareScript
};

for (var key in scripts) {
	Scripts.register(scripts[key]);
}
