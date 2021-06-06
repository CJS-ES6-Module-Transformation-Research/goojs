import {     CannonBoxColliderComponent as CannonBoxColliderComponent_CannonBoxColliderComponent, } from "./CannonBoxColliderComponent";
import {     CannonCylinderColliderComponent as CannonCylinderColliderComponent_CannonCylinderColliderComponent, } from "./CannonCylinderColliderComponent";
import {     CannonDistanceJointComponent as CannonDistanceJointComponent_CannonDistanceJointComponent, } from "./CannonDistanceJointComponent";
import {     CannonPlaneColliderComponent as CannonPlaneColliderComponent_CannonPlaneColliderComponent, } from "./CannonPlaneColliderComponent";
import {     CannonRigidbodyComponent as CannonRigidbodyComponent_CannonRigidbodyComponent, } from "./CannonRigidbodyComponent";
import {     CannonSphereColliderComponent as CannonSphereColliderComponent_CannonSphereColliderComponent, } from "./CannonSphereColliderComponent";
import { CannonSystem as CannonSystem_CannonSystem } from "./CannonSystem";
import {     CannonTerrainColliderComponent as CannonTerrainColliderComponent_CannonTerrainColliderComponent, } from "./CannonTerrainColliderComponent";
mod_indexjs = {
	CannonBoxColliderComponent: CannonBoxColliderComponent_CannonBoxColliderComponent,
	CannonCylinderColliderComponent: CannonCylinderColliderComponent_CannonCylinderColliderComponent,
	CannonDistanceJointComponent: CannonDistanceJointComponent_CannonDistanceJointComponent,
	CannonPlaneColliderComponent: CannonPlaneColliderComponent_CannonPlaneColliderComponent,
	CannonRigidbodyComponent: CannonRigidbodyComponent_CannonRigidbodyComponent,
	CannonSphereColliderComponent: CannonSphereColliderComponent_CannonSphereColliderComponent,
	CannonSystem: CannonSystem_CannonSystem,
	CannonTerrainColliderComponent: CannonTerrainColliderComponent_CannonTerrainColliderComponent
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
var mod_indexjs;
export { mod_indexjs as indexjs };