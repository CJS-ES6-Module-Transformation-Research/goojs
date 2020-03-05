import { BoxCollider as BoxCollider_BoxColliderjs } from "./colliders/BoxCollider";
import { Collider as Collider_Colliderjs } from "./colliders/Collider";
import { CylinderCollider as CylinderCollider_CylinderColliderjs } from "./colliders/CylinderCollider";
import { MeshCollider as MeshCollider_MeshColliderjs } from "./colliders/MeshCollider";
import { PlaneCollider as PlaneCollider_PlaneColliderjs } from "./colliders/PlaneCollider";
import { SphereCollider as SphereCollider_SphereColliderjs } from "./colliders/SphereCollider";
import {     AbstractColliderComponent as AbstractColliderComponent_AbstractColliderComponentjs, } from "./components/AbstractColliderComponent";
import {     AbstractRigidBodyComponent as AbstractRigidBodyComponent_AbstractRigidBodyComponentjs, } from "./components/AbstractRigidBodyComponent";
import { ColliderComponent as ColliderComponent_ColliderComponentjs } from "./components/ColliderComponent";
import { RigidBodyComponent as RigidBodyComponent_RigidBodyComponentjs } from "./components/RigidBodyComponent";
import {     ColliderComponentHandler as ColliderComponentHandler_ColliderComponentHandlerjs, } from "./handlers/ColliderComponentHandler";
import {     RigidBodyComponentHandler as RigidBodyComponentHandler_RigidBodyComponentHandlerjs, } from "./handlers/RigidBodyComponentHandler";
import { BallJoint as BallJoint_BallJointjs } from "./joints/BallJoint";
import { HingeJoint as HingeJoint_HingeJointjs } from "./joints/HingeJoint";
import { PhysicsJoint as PhysicsJoint_PhysicsJointjs } from "./joints/PhysicsJoint";
import { PhysicsMaterial as PhysicsMaterial_PhysicsMaterialjs } from "./PhysicsMaterial";
import { RaycastResult as RaycastResult_RaycastResultjs } from "./RaycastResult";
import { PhysicsBoxDebugShape as PhysicsBoxDebugShape_PhysicsBoxDebugShapejs } from "./shapes/PhysicsBoxDebugShape";
import {     PhysicsCylinderDebugShape as PhysicsCylinderDebugShape_PhysicsCylinderDebugShapejs, } from "./shapes/PhysicsCylinderDebugShape";
import { PhysicsPlaneDebugShape as PhysicsPlaneDebugShape_PhysicsPlaneDebugShapejs } from "./shapes/PhysicsPlaneDebugShape";
import {     PhysicsSphereDebugShape as PhysicsSphereDebugShape_PhysicsSphereDebugShapejs, } from "./shapes/PhysicsSphereDebugShape";
import { AbstractPhysicsSystem as AbstractPhysicsSystem_AbstractPhysicsSystemjs } from "./systems/AbstractPhysicsSystem";
import { ColliderSystem as ColliderSystem_ColliderSystemjs } from "./systems/ColliderSystem";
import {     PhysicsDebugRenderSystem as PhysicsDebugRenderSystem_PhysicsDebugRenderSystemjs, } from "./systems/PhysicsDebugRenderSystem";
import { PhysicsSystem as PhysicsSystem_PhysicsSystemjs } from "./systems/PhysicsSystem";
import { Pool as Pool_Pooljs } from "./util/Pool";
module.exports = {
	BoxCollider: BoxCollider_BoxColliderjs,
	Collider: Collider_Colliderjs,
	CylinderCollider: CylinderCollider_CylinderColliderjs,
	MeshCollider: MeshCollider_MeshColliderjs,
	PlaneCollider: PlaneCollider_PlaneColliderjs,
	SphereCollider: SphereCollider_SphereColliderjs,
	AbstractColliderComponent: AbstractColliderComponent_AbstractColliderComponentjs,
	AbstractRigidBodyComponent: AbstractRigidBodyComponent_AbstractRigidBodyComponentjs,
	ColliderComponent: ColliderComponent_ColliderComponentjs,
	RigidBodyComponent: RigidBodyComponent_RigidBodyComponentjs,
	ColliderComponentHandler: ColliderComponentHandler_ColliderComponentHandlerjs,
	RigidBodyComponentHandler: RigidBodyComponentHandler_RigidBodyComponentHandlerjs,
	BallJoint: BallJoint_BallJointjs,
	HingeJoint: HingeJoint_HingeJointjs,
	PhysicsJoint: PhysicsJoint_PhysicsJointjs,
	PhysicsMaterial: PhysicsMaterial_PhysicsMaterialjs,
	RaycastResult: RaycastResult_RaycastResultjs,
	PhysicsBoxDebugShape: PhysicsBoxDebugShape_PhysicsBoxDebugShapejs,
	PhysicsCylinderDebugShape: PhysicsCylinderDebugShape_PhysicsCylinderDebugShapejs,
	PhysicsPlaneDebugShape: PhysicsPlaneDebugShape_PhysicsPlaneDebugShapejs,
	PhysicsSphereDebugShape: PhysicsSphereDebugShape_PhysicsSphereDebugShapejs,
	AbstractPhysicsSystem: AbstractPhysicsSystem_AbstractPhysicsSystemjs,
	ColliderSystem: ColliderSystem_ColliderSystemjs,
	PhysicsDebugRenderSystem: PhysicsDebugRenderSystem_PhysicsDebugRenderSystemjs,
	PhysicsSystem: PhysicsSystem_PhysicsSystemjs,
	Pool: Pool_Pooljs
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}