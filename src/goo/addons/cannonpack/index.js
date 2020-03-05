import {     CannonBoxColliderComponent as CannonBoxColliderComponent_CannonBoxColliderComponentjs, } from "./CannonBoxColliderComponent";
import {     CannonCylinderColliderComponent as CannonCylinderColliderComponent_CannonCylinderColliderComponentjs, } from "./CannonCylinderColliderComponent";
import {     CannonDistanceJointComponent as CannonDistanceJointComponent_CannonDistanceJointComponentjs, } from "./CannonDistanceJointComponent";
import {     CannonPlaneColliderComponent as CannonPlaneColliderComponent_CannonPlaneColliderComponentjs, } from "./CannonPlaneColliderComponent";
import {     CannonRigidbodyComponent as CannonRigidbodyComponent_CannonRigidbodyComponentjs, } from "./CannonRigidbodyComponent";
import {     CannonSphereColliderComponent as CannonSphereColliderComponent_CannonSphereColliderComponentjs, } from "./CannonSphereColliderComponent";
import { CannonSystem as CannonSystem_CannonSystemjs } from "./CannonSystem";
import {     CannonTerrainColliderComponent as CannonTerrainColliderComponent_CannonTerrainColliderComponentjs, } from "./CannonTerrainColliderComponent";
module.exports = {
	CannonBoxColliderComponent: CannonBoxColliderComponent_CannonBoxColliderComponentjs,
	CannonCylinderColliderComponent: CannonCylinderColliderComponent_CannonCylinderColliderComponentjs,
	CannonDistanceJointComponent: CannonDistanceJointComponent_CannonDistanceJointComponentjs,
	CannonPlaneColliderComponent: CannonPlaneColliderComponent_CannonPlaneColliderComponentjs,
	CannonRigidbodyComponent: CannonRigidbodyComponent_CannonRigidbodyComponentjs,
	CannonSphereColliderComponent: CannonSphereColliderComponent_CannonSphereColliderComponentjs,
	CannonSystem: CannonSystem_CannonSystemjs,
	CannonTerrainColliderComponent: CannonTerrainColliderComponent_CannonTerrainColliderComponentjs
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}