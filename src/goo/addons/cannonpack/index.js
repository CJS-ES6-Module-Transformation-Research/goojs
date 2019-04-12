import CannonBoxColliderComponent_moduleDefault from "./CannonBoxColliderComponent";
import CannonCylinderColliderComponent_moduleDefault from "./CannonCylinderColliderComponent";
import CannonDistanceJointComponent_moduleDefault from "./CannonDistanceJointComponent";
import CannonPlaneColliderComponent_moduleDefault from "./CannonPlaneColliderComponent";
import CannonRigidbodyComponent_moduleDefault from "./CannonRigidbodyComponent";
import CannonSphereColliderComponent_moduleDefault from "./CannonSphereColliderComponent";
import CannonSystem_moduleDefault from "./CannonSystem";
import CannonTerrainColliderComponent_moduleDefault from "./CannonTerrainColliderComponent";
export default {
	CannonBoxColliderComponent: CannonBoxColliderComponent_moduleDefault,
	CannonCylinderColliderComponent: CannonCylinderColliderComponent_moduleDefault,
	CannonDistanceJointComponent: CannonDistanceJointComponent_moduleDefault,
	CannonPlaneColliderComponent: CannonPlaneColliderComponent_moduleDefault,
	CannonRigidbodyComponent: CannonRigidbodyComponent_moduleDefault,
	CannonSphereColliderComponent: CannonSphereColliderComponent_moduleDefault,
	CannonSystem: CannonSystem_moduleDefault,
	CannonTerrainColliderComponent: CannonTerrainColliderComponent_moduleDefault
};;
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}