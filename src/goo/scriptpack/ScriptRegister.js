import Scripts from "../scripts/Scripts";
import scriptsOrbitCamControlScript_moduleDefault from "../scripts/OrbitCamControlScript";
import OrbitNPanControlScript_moduleDefault from "./OrbitNPanControlScript";
import FlyControlScript_moduleDefault from "./FlyControlScript";
import AxisAlignedCamControlScript_moduleDefault from "./AxisAlignedCamControlScript";
import PanCamScript_moduleDefault from "./PanCamScript";
import MouseLookControlScript_moduleDefault from "./MouseLookControlScript";
import WasdControlScript_moduleDefault from "./WasdControlScript";
import ButtonScript_moduleDefault from "./ButtonScript";
import PickAndRotateScript_moduleDefault from "./PickAndRotateScript";
import LensFlareScript_moduleDefault from "./LensFlareScript";
export { Scripts };

export var scripts = {
	OrbitCamControlScript: scriptsOrbitCamControlScript_moduleDefault,
	OrbitNPanControlScript: OrbitNPanControlScript_moduleDefault,
	FlyControlScript: FlyControlScript_moduleDefault,
	AxisAlignedCamControlScript: AxisAlignedCamControlScript_moduleDefault,
	PanCamScript: PanCamScript_moduleDefault,
	MouseLookControlScript: MouseLookControlScript_moduleDefault,
	WasdControlScript: WasdControlScript_moduleDefault,
	ButtonScript: ButtonScript_moduleDefault,
	PickAndRotateScript: PickAndRotateScript_moduleDefault,
	LensFlareScript: LensFlareScript_moduleDefault
};

for (var key in scripts) {
	Scripts.register(scripts[key]);
}
