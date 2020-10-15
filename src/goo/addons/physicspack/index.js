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
	BoxCollider: _BoxCollider.BoxCollider,
	Collider: _Collider.Collider,
	CylinderCollider: _CylinderCollider.CylinderCollider,
	MeshCollider: _MeshCollider.MeshCollider,
	PlaneCollider: _PlaneCollider.PlaneCollider,
	SphereCollider: _SphereCollider.SphereCollider,
	AbstractColliderComponent: _AbstractColliderComponent.AbstractColliderComponent,
	AbstractRigidBodyComponent: _AbstractRigidBodyComponent.AbstractRigidBodyComponent,
	ColliderComponent: _ColliderComponent.ColliderComponent,
	RigidBodyComponent: _RigidBodyComponent.RigidBodyComponent,
	ColliderComponentHandler: _ColliderComponentHandler.ColliderComponentHandler,
	RigidBodyComponentHandler: _RigidBodyComponentHandler.RigidBodyComponentHandler,
	BallJoint: _BallJoint.BallJoint,
	HingeJoint: _HingeJoint.HingeJoint,
	PhysicsJoint: _PhysicsJoint.PhysicsJoint,
	PhysicsMaterial: _PhysicsMaterial.PhysicsMaterial,
	RaycastResult: _RaycastResult.RaycastResult,
	PhysicsBoxDebugShape: _PhysicsBoxDebugShape.PhysicsBoxDebugShape,
	PhysicsCylinderDebugShape: _PhysicsCylinderDebugShape.PhysicsCylinderDebugShape,
	PhysicsPlaneDebugShape: _PhysicsPlaneDebugShape.PhysicsPlaneDebugShape,
	PhysicsSphereDebugShape: _PhysicsSphereDebugShape.PhysicsSphereDebugShape,
	AbstractPhysicsSystem: _AbstractPhysicsSystem.AbstractPhysicsSystem,
	ColliderSystem: _ColliderSystem.ColliderSystem,
	PhysicsDebugRenderSystem: _PhysicsDebugRenderSystem.PhysicsDebugRenderSystem,
	PhysicsSystem: _PhysicsSystem.PhysicsSystem,
	Pool: _Pool.Pool
};

if (typeof window !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}