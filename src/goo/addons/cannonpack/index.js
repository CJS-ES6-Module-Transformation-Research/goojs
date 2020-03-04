import { CannonBoxColliderComponent as CannonBoxColliderComponentjs } from "./CannonBoxColliderComponent";
import { CannonCylinderColliderComponent as CannonCylinderColliderComponentjs } from "./CannonCylinderColliderComponent";
import { CannonDistanceJointComponent as CannonDistanceJointComponentjs } from "./CannonDistanceJointComponent";
import { CannonPlaneColliderComponent as CannonPlaneColliderComponentjs } from "./CannonPlaneColliderComponent";
import { CannonRigidbodyComponent as CannonRigidbodyComponentjs } from "./CannonRigidbodyComponent";
import { CannonSphereColliderComponent as CannonSphereColliderComponentjs } from "./CannonSphereColliderComponent";
import { CannonSystem as CannonSystemjs } from "./CannonSystem";
import { CannonTerrainColliderComponent as CannonTerrainColliderComponentjs } from "./CannonTerrainColliderComponent";
module.exports = {
	CannonBoxColliderComponent: CannonBoxColliderComponentjs,
	CannonCylinderColliderComponent: CannonCylinderColliderComponentjs,
	CannonDistanceJointComponent: CannonDistanceJointComponentjs,
	CannonPlaneColliderComponent: CannonPlaneColliderComponentjs,
	CannonRigidbodyComponent: CannonRigidbodyComponentjs,
	CannonSphereColliderComponent: CannonSphereColliderComponentjs,
	CannonSystem: CannonSystemjs,
	CannonTerrainColliderComponent: CannonTerrainColliderComponentjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}