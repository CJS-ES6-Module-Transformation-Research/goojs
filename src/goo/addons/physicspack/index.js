import { BoxCollider as BoxColliderjs } from "./colliders/BoxCollider";
import { Collider as Colliderjs } from "./colliders/Collider";
import { CylinderCollider as CylinderColliderjs } from "./colliders/CylinderCollider";
import { MeshCollider as MeshColliderjs } from "./colliders/MeshCollider";
import { PlaneCollider as PlaneColliderjs } from "./colliders/PlaneCollider";
import { SphereCollider as SphereColliderjs } from "./colliders/SphereCollider";
import { AbstractColliderComponent as AbstractColliderComponentjs } from "./components/AbstractColliderComponent";
import { AbstractRigidBodyComponent as AbstractRigidBodyComponentjs } from "./components/AbstractRigidBodyComponent";
import { ColliderComponent as ColliderComponentjs } from "./components/ColliderComponent";
import { RigidBodyComponent as RigidBodyComponentjs } from "./components/RigidBodyComponent";
import { ColliderComponentHandler as ColliderComponentHandlerjs } from "./handlers/ColliderComponentHandler";
import { RigidBodyComponentHandler as RigidBodyComponentHandlerjs } from "./handlers/RigidBodyComponentHandler";
import { BallJoint as BallJointjs } from "./joints/BallJoint";
import { HingeJoint as HingeJointjs } from "./joints/HingeJoint";
import { PhysicsJoint } from "./joints/PhysicsJoint";
import { PhysicsMaterial } from "./PhysicsMaterial";
import { RaycastResult } from "./RaycastResult";
import { PhysicsBoxDebugShape as PhysicsBoxDebugShapejs } from "./shapes/PhysicsBoxDebugShape";
import { PhysicsCylinderDebugShape as PhysicsCylinderDebugShapejs } from "./shapes/PhysicsCylinderDebugShape";
import { PhysicsPlaneDebugShape as PhysicsPlaneDebugShapejs } from "./shapes/PhysicsPlaneDebugShape";
import { PhysicsSphereDebugShape as PhysicsSphereDebugShapejs } from "./shapes/PhysicsSphereDebugShape";
import { AbstractPhysicsSystem as AbstractPhysicsSystemjs } from "./systems/AbstractPhysicsSystem";
import { ColliderSystem as ColliderSystemjs } from "./systems/ColliderSystem";
import { PhysicsDebugRenderSystem as PhysicsDebugRenderSystemjs } from "./systems/PhysicsDebugRenderSystem";
import { PhysicsSystem as PhysicsSystemjs } from "./systems/PhysicsSystem";
import { Pool } from "./util/Pool";
module.exports = {
	BoxCollider: BoxColliderjs,
	Collider: Colliderjs,
	CylinderCollider: CylinderColliderjs,
	MeshCollider: MeshColliderjs,
	PlaneCollider: PlaneColliderjs,
	SphereCollider: SphereColliderjs,
	AbstractColliderComponent: AbstractColliderComponentjs,
	AbstractRigidBodyComponent: AbstractRigidBodyComponentjs,
	ColliderComponent: ColliderComponentjs,
	RigidBodyComponent: RigidBodyComponentjs,
	ColliderComponentHandler: ColliderComponentHandlerjs,
	RigidBodyComponentHandler: RigidBodyComponentHandlerjs,
	BallJoint: BallJointjs,
	HingeJoint: HingeJointjs,
	PhysicsJoint: PhysicsJoint_PhysicsJointjs,
	PhysicsMaterial: PhysicsMaterial_PhysicsMaterialjs,
	RaycastResult: RaycastResult_RaycastResultjs,
	PhysicsBoxDebugShape: PhysicsBoxDebugShapejs,
	PhysicsCylinderDebugShape: PhysicsCylinderDebugShapejs,
	PhysicsPlaneDebugShape: PhysicsPlaneDebugShapejs,
	PhysicsSphereDebugShape: PhysicsSphereDebugShapejs,
	AbstractPhysicsSystem: AbstractPhysicsSystemjs,
	ColliderSystem: ColliderSystemjs,
	PhysicsDebugRenderSystem: PhysicsDebugRenderSystemjs,
	PhysicsSystem: PhysicsSystemjs,
	Pool: Pool_Pooljs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}