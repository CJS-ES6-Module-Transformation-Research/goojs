"use strict";

var _BoxCollider = require("./colliders/BoxCollider");

var _Collider = require("./colliders/Collider");

var _CylinderCollider = require("./colliders/CylinderCollider");

var _MeshCollider = require("./colliders/MeshCollider");

var _PlaneCollider = require("./colliders/PlaneCollider");

var _SphereCollider = require("./colliders/SphereCollider");

var _AbstractColliderComponent = require("./components/AbstractColliderComponent");

var _AbstractRigidBodyComponent = require("./components/AbstractRigidBodyComponent");

var _ColliderComponent = require("./components/ColliderComponent");

var _RigidBodyComponent = require("./components/RigidBodyComponent");

var _ColliderComponentHandler = require("./handlers/ColliderComponentHandler");

var _RigidBodyComponentHandler = require("./handlers/RigidBodyComponentHandler");

var _BallJoint = require("./joints/BallJoint");

var _HingeJoint = require("./joints/HingeJoint");

var _PhysicsJoint = require("./joints/PhysicsJoint");

var _PhysicsMaterial = require("./PhysicsMaterial");

var _RaycastResult = require("./RaycastResult");

var _PhysicsBoxDebugShape = require("./shapes/PhysicsBoxDebugShape");

var _PhysicsCylinderDebugShape = require("./shapes/PhysicsCylinderDebugShape");

var _PhysicsPlaneDebugShape = require("./shapes/PhysicsPlaneDebugShape");

var _PhysicsSphereDebugShape = require("./shapes/PhysicsSphereDebugShape");

var _AbstractPhysicsSystem = require("./systems/AbstractPhysicsSystem");

var _ColliderSystem = require("./systems/ColliderSystem");

var _PhysicsDebugRenderSystem = require("./systems/PhysicsDebugRenderSystem");

var _PhysicsSystem = require("./systems/PhysicsSystem");

var _Pool = require("./util/Pool");

var indexjs;
indexjs = {
	BoxCollider: _BoxCollider.BoxColliderjs,
	Collider: _Collider.Colliderjs,
	CylinderCollider: _CylinderCollider.CylinderColliderjs,
	MeshCollider: _MeshCollider.MeshColliderjs,
	PlaneCollider: _PlaneCollider.PlaneColliderjs,
	SphereCollider: _SphereCollider.SphereColliderjs,
	AbstractColliderComponent: _AbstractColliderComponent.AbstractColliderComponentjs,
	AbstractRigidBodyComponent: _AbstractRigidBodyComponent.AbstractRigidBodyComponentjs,
	ColliderComponent: _ColliderComponent.ColliderComponentjs,
	RigidBodyComponent: _RigidBodyComponent.RigidBodyComponentjs,
	ColliderComponentHandler: _ColliderComponentHandler.ColliderComponentHandlerjs,
	RigidBodyComponentHandler: _RigidBodyComponentHandler.RigidBodyComponentHandlerjs,
	BallJoint: _BallJoint.BallJointjs,
	HingeJoint: _HingeJoint.HingeJointjs,
	PhysicsJoint: _PhysicsJoint.PhysicsJointjs,
	PhysicsMaterial: _PhysicsMaterial.PhysicsMaterialjs,
	RaycastResult: _RaycastResult.RaycastResultjs,
	PhysicsBoxDebugShape: _PhysicsBoxDebugShape.PhysicsBoxDebugShapejs,
	PhysicsCylinderDebugShape: _PhysicsCylinderDebugShape.PhysicsCylinderDebugShapejs,
	PhysicsPlaneDebugShape: _PhysicsPlaneDebugShape.PhysicsPlaneDebugShapejs,
	PhysicsSphereDebugShape: _PhysicsSphereDebugShape.PhysicsSphereDebugShapejs,
	AbstractPhysicsSystem: _AbstractPhysicsSystem.AbstractPhysicsSystemjs,
	ColliderSystem: _ColliderSystem.ColliderSystemjs,
	PhysicsDebugRenderSystem: _PhysicsDebugRenderSystem.PhysicsDebugRenderSystemjs,
	PhysicsSystem: _PhysicsSystem.PhysicsSystemjs,
	Pool: _Pool.Pooljs
};

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}
