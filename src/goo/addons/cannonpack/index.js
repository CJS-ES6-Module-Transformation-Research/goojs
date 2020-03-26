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
	CannonBoxColliderComponent: _CannonBoxColliderComponent.CannonBoxColliderComponentjs,
	CannonCylinderColliderComponent: _CannonCylinderColliderComponent.CannonCylinderColliderComponentjs,
	CannonDistanceJointComponent: _CannonDistanceJointComponent.CannonDistanceJointComponentjs,
	CannonPlaneColliderComponent: _CannonPlaneColliderComponent.CannonPlaneColliderComponentjs,
	CannonRigidbodyComponent: _CannonRigidbodyComponent.CannonRigidbodyComponentjs,
	CannonSphereColliderComponent: _CannonSphereColliderComponent.CannonSphereColliderComponentjs,
	CannonSystem: _CannonSystem.CannonSystemjs,
	CannonTerrainColliderComponent: _CannonTerrainColliderComponent.CannonTerrainColliderComponentjs
};
if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
