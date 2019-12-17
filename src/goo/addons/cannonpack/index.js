import { CannonBoxColliderComponent } from "./CannonBoxColliderComponent";
import { CannonCylinderColliderComponent } from "./CannonCylinderColliderComponent";
import { CannonDistanceJointComponent } from "./CannonDistanceJointComponent";
import { CannonPlaneColliderComponent } from "./CannonPlaneColliderComponent";
import { CannonRigidbodyComponent } from "./CannonRigidbodyComponent";
import { CannonSphereColliderComponent } from "./CannonSphereColliderComponent";
import { CannonSystem } from "./CannonSystem";
import { CannonTerrainColliderComponent } from "./CannonTerrainColliderComponent";
module.exports = {
	CannonBoxColliderComponent: CannonBoxColliderComponent,
	CannonCylinderColliderComponent: CannonCylinderColliderComponent,
	CannonDistanceJointComponent: CannonDistanceJointComponent,
	CannonPlaneColliderComponent: CannonPlaneColliderComponent,
	CannonRigidbodyComponent: CannonRigidbodyComponent,
	CannonSphereColliderComponent: CannonSphereColliderComponent,
	CannonSystem: CannonSystem,
	CannonTerrainColliderComponent: CannonTerrainColliderComponent
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}