import {     CannonBoxColliderComponentjs as CannonBoxColliderComponent_CannonBoxColliderComponentjs, } from "./CannonBoxColliderComponent";
import {     CannonCylinderColliderComponentjs as CannonCylinderColliderComponent_CannonCylinderColliderComponentjs, } from "./CannonCylinderColliderComponent";
import {     CannonDistanceJointComponentjs as CannonDistanceJointComponent_CannonDistanceJointComponentjs, } from "./CannonDistanceJointComponent";
import {     CannonPlaneColliderComponentjs as CannonPlaneColliderComponent_CannonPlaneColliderComponentjs, } from "./CannonPlaneColliderComponent";
import {     CannonRigidbodyComponentjs as CannonRigidbodyComponent_CannonRigidbodyComponentjs, } from "./CannonRigidbodyComponent";
import {     CannonSphereColliderComponentjs as CannonSphereColliderComponent_CannonSphereColliderComponentjs, } from "./CannonSphereColliderComponent";
import { CannonSystemjs as CannonSystem_CannonSystemjs } from "./CannonSystem";
import {     CannonTerrainColliderComponentjs as CannonTerrainColliderComponent_CannonTerrainColliderComponentjs, } from "./CannonTerrainColliderComponent";
var indexjs;
indexjs = {
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