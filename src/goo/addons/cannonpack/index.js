"use strict";

var _CannonBoxColliderComponent = require("./CannonBoxColliderComponent");

var _CannonCylinderColliderComponent = require("./CannonCylinderColliderComponent");

var _CannonDistanceJointComponent = require("./CannonDistanceJointComponent");

var _CannonPlaneColliderComponent = require("./CannonPlaneColliderComponent");

var _CannonRigidbodyComponent = require("./CannonRigidbodyComponent");

var _CannonSphereColliderComponent = require("./CannonSphereColliderComponent");

var _CannonSystem = require("./CannonSystem");

var _CannonTerrainColliderComponent = require("./CannonTerrainColliderComponent");

var indexjs;
indexjs = {
	CannonBoxColliderComponent: _CannonBoxColliderComponent.CannonBoxColliderComponent,
	CannonCylinderColliderComponent: _CannonCylinderColliderComponent.CannonCylinderColliderComponent,
	CannonDistanceJointComponent: _CannonDistanceJointComponent.CannonDistanceJointComponent,
	CannonPlaneColliderComponent: _CannonPlaneColliderComponent.CannonPlaneColliderComponent,
	CannonRigidbodyComponent: _CannonRigidbodyComponent.CannonRigidbodyComponent,
	CannonSphereColliderComponent: _CannonSphereColliderComponent.CannonSphereColliderComponent,
	CannonSystem: _CannonSystem.CannonSystem,
	CannonTerrainColliderComponent: _CannonTerrainColliderComponent.CannonTerrainColliderComponent
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}